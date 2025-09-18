import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Alert,
  Platform,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../../utils/colors";
import TopHeader from "../../../components/TopHeader";
import CustomText from "../../../components/CustomText";
import { images } from "../../../assets/images";
import { font } from "../../../utils/font";
import { appStyles } from "../../../utils/AppStyles";
import PaymentCard from "../../../components/PaymentCard";
import * as Animatable from "react-native-animatable";
import LocalPaymentCard from "../Checkout/LocalPaymentCard";
import BankTransferCard from "../Checkout/BankTransferCard";
import CustomButton from "../../../components/CustomButton";
import {
  DISPATCH_PAYMENY_METHOD,
  PAYMENT_METHOD,
  StorageServices,
} from "../../../utils/StorageService";
import CustomToast from "../../../components/CustomToast";
import { ApiServices } from "../../../apis/ApiServices";
import { useSelector } from "react-redux";
import {
  getGuestToken,
  getGuestUserEmail,
  getToken,
} from "../../../redux/reducers/authReducer";
import { ChooseAddressLayout } from "../../../utils/Loyout/ChooseAddressLayout";
import { ChoosePaymentLayout } from "../../../utils/Loyout/ChoosePaymentLayout";

const ChoosePaymentScreen = ({ navigation, route }: any) => {
  const isBillingAddress = route?.params?.isBillingAddress;
  const isCheckout=route?.params?.isCheckout
  console.log("isBillingAddress", isBillingAddress);
  const [loading, setloading] = useState(true);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [selectedOnlinePayment, setSelectedOnlinePayment] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>({});
  const guestEmail = useSelector(getGuestUserEmail);
  const token = useSelector(getToken);
  const [paymentMethod, setPaymentMethods] = useState([]);

  const guestToken = useSelector(getGuestToken);

  console.log("paymentMethod", paymentMethod);
  const paymentMethods = [
    { title: "Cash on Delivery", type: "cash", id: 4, icon: images.cash },
    {
      title: "Bank Transfer",
      type: "bank",
      id: 3,
      icon: images.bank_transfer,
    },
    {
      title: "Credit or Debit Card",
      type: "card",
      id: 2,
      isNext: true,

      icon: images.card,
    },
    {
      title: "JazzCash",
      type: "JazzCash",
      label: "local",
      id: 2,

      icon: images.jazzcash,
    },
    {
      title: "Easypaisa",
      type: "easypaisa",
      label: "local",
      id: 7,
      icon: images.easypaisa,
    },
  ];

  const onlinePaymentMethods = [
    { title: "Card", label: "card", id: 1 },
    { title: "Bank Transfer", label: "bank", id: 3 },
    { title: "Jazzcash / Easypaisa", label: "local", id: 2 },
  ];
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getSelectedPaymentMethod();
      getPaymentMethod();
    });

    return unsubscribe; // Cleanup the listener
  }, []);
  console.log("selectedPaymentMethod", guestToken);

  const getPaymentMethod = () => {
    let param = {
      token: token != null ? token : guestToken,
      isGuest: token == null ? true : false,
      email: guestEmail,
    };
    ApiServices.GetPaymentMethod(
      param,
      async ({ isSuccess, response }: any) => {
        console.log("Payemntresponse", response);
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.success) {
            console.log("Payemnresult", result?.data);
            setPaymentMethods(result?.data?.paymentMethods);
            setloading(false);
          } else {
            setloading(false);
            setIsMessage(true);
            setMessage(result?.error);
          }
        } else {
          setloading(false);
          Alert.alert("", "Something went wrong");
        }
      }
    );
  };

  const getSelectedPaymentMethod = async () => {
    const dispatchPayment = await StorageServices.getItem(
      DISPATCH_PAYMENY_METHOD
    );
    if (dispatchPayment == null) {
      setSelectedPaymentMethod({
        title: "Cash on Delivery",
        type: "cash",
        id: 4,
        icon: images.cash,
      });
    } else {
      setSelectedPaymentMethod(dispatchPayment);
    }

    // setSelectedOnlinePayment(dispatchPayment);
    // setSelectedAddress(dispatchAddress);
  };
  const PaymentMetodContainer = ({
    icon,
    title,
    isNext,
    isCard,
    item,
    last_four_digits,
  }: any) => {
    console.log("ItemViza", item);
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          if (isNext) {
            if(Platform.OS=="android"){
              Alert.alert("Alert","This option will be available soon")
              

              return


            }
            navigation.navigate("AddPaymentMethod", {
              isBillingAddress: isBillingAddress,
              isCheckout:isCheckout
            });
          
          } else {
            setSelectedPaymentMethod(item);
            StorageServices.setItem(DISPATCH_PAYMENY_METHOD, item);
            navigation.goBack();
          }
        }}
        style={{ ...appStyles.rowjustify, gap: scale(7) }}
      >
        <View style={{ ...appStyles.row, gap: scale(10) }}>
          <Image
            source={icon || images.cash}
            resizeMode="contain"
            style={{
              width: scale(25),
              height: scale(25),
            }}
          />
          <View>
            <CustomText
              text={title}
              size={15}
              textTransform={"capitalize"}
              color={colors.dark_black}
              fontWeight="600"
              fontFam={font.WorkSans_Medium}
            />
            {isCard && (
              <Image
                source={images.visa}
                resizeMode="contain"
                style={{
                  width: scale(40),
                  height: scale(40),
                }}
              />
            )}
            {last_four_digits && (
              <View
                style={{
                  flexDirection: "row",
                  gap: scale(5),
                }}
              >
                <CustomText
                  text={`....`}
                  size={17}
                  color={colors.grey100}
                  // style={{paddingBottom:20 }}
                  fontWeight="500"
                  fontFam={font.WorkSans_Regular}
                />
                <CustomText
                  label={`${last_four_digits}`}
                  size={14}
                  style={{ paddingTop: verticalScale(4) }}
                  color={colors.grey100}
                  fontWeight="500"
                  fontFam={font.WorkSans_Regular}
                />
              </View>
            )}
          </View>
        </View>
        {isNext ? (
          <Image
            source={images.right_arrow}
            resizeMode="contain"
            style={{
              width: scale(18),
              height: scale(18),
            }}
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              setSelectedPaymentMethod(item);
            }}
            style={{
              ...styles.radioButtonConainer,

              borderWidth: 1.2,
              borderColor:
                selectedPaymentMethod?.id == item.id
                  ? colors.orange
                  : colors.dull_half_white,
            }}
          >
            {selectedPaymentMethod?.id == item.id && (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  setSelectedPaymentMethod(item);
                }}
                style={styles.radioButtonInner}
              ></TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <>
      <ScreenLayout>
        <View
          style={{
            paddingHorizontal: scale(20),
            paddingBottom: verticalScale(10),
            gap: verticalScale(20),
          }}
        >
          <TopHeader title="Select a payment method" />
          {loading ? (
            <View style={{ gap: verticalScale(20) }}>
              <ChoosePaymentLayout />
            </View>
          ) : (
            <View
              style={{
                gap: verticalScale(20),
              }}
            >
              {paymentMethods.map((item, index) => {
                return (
                  <PaymentMetodContainer
                    item={item}
                    key={index.toString()}
                    icon={item?.icon}
                    isCard={item?.isCard}
                    isNext={item?.isNext}
                    title={item?.title}
                  />
                );
              })}
              {paymentMethod.map((item: any, index) => {
                return (
                  <PaymentMetodContainer
                    item={item}
                    key={index.toString()}
                    icon={
                      item?.card_details?.card_network == "mastercard"
                        ? images?.master_card
                        : images?.visa_card
                    }
                    last_four_digits={item?.card_details?.last_four_digits}
                    title={item?.card_details?.card_network}
                  />
                );
              })}
            </View>
          )}
        </View>

        {/* <View
            style={{
              marginTop: verticalScale(5),
              gap: verticalScale(15),
              paddingHorizontal: scale(20),
            }}
          >
            <CustomText
              text={"Payment Method"}
              size={18}
              color={colors.black}
              fontWeight="600"
              fontFam={font.WorkSans_SemiBold}
            />
            {paymentMethods.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    setSelectedMethod(item);
                    setSelectedPaymentMethod(item.label);
                  }}
                  key={index.toString()}
                  style={{ ...appStyles.row, gap: scale(7) }}
                >
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      setSelectedMethod(item);
                      setSelectedPaymentMethod(item.label);
                    }}
                    style={{
                      ...styles.radioButtonConainer,
                      borderWidth: 1.2,
                      borderColor:
                        selectedPaymentMethod == item.label
                          ? colors.orange
                          : colors.dull_half_white,
                    }}
                  >
                    {selectedPaymentMethod == item.label && (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => setSelectedPaymentMethod(item.label)}
                        style={styles.radioButtonInner}
                      ></TouchableOpacity>
                    )}
                  </TouchableOpacity>

                  <CustomText
                    text={item.title}
                    size={12}
                    color={colors.dark_black}
                    fontWeight="500"
                    fontFam={font.WorkSans_Regular}
                  />
                </TouchableOpacity>
              );
            })}

            {selectedPaymentMethod == "online payment" && (
              <Animatable.View
                duration={1000}
                animation={"fadeIn"}
                delay={100}
                style={{ gap: verticalScale(10) }}
              >
                <CustomText
                  text={"Please choose an online payment method."}
                  size={14}
                  style={{ marginBottom: verticalScale(5) }}
                  fontFam={font.WorkSans_Regular}
                />
                {onlinePaymentMethods.map((item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        setSelectedMethod(item);

                        setSelectedOnlinePayment(item.label);
                      }}
                      key={index.toString()}
                      style={{ ...appStyles.row, gap: scale(7) }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                          setSelectedMethod(item);
                          setSelectedOnlinePayment(item.label);
                        }}
                        style={{
                          ...styles.radioButtonConainer,
                          borderWidth: 1.2,
                          borderColor:
                            selectedOnlinePayment == item.label
                              ? colors.orange
                              : colors.dull_half_white,
                        }}
                      >
                        {selectedOnlinePayment == item.label && (
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => setSelectedOnlinePayment(item.label)}
                            style={styles.radioButtonInner}
                          ></TouchableOpacity>
                        )}
                      </TouchableOpacity>

                      <CustomText
                        text={item.title}
                        size={12}
                        color={colors.dark_black}
                        fontWeight="500"
                        fontFam={font.WorkSans_Regular}
                      />
                    </TouchableOpacity>
                  );
                })}
              </Animatable.View>
            )}
          </View>

          {selectedPaymentMethod == "online payment" && (
            <View>
              {selectedOnlinePayment == "card" && (
                <FlatList
                  data={[1, 2, 3]}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ paddingLeft: scale(20) }}
                  contentContainerStyle={{
                    paddingRight: scale(40),
                    gap: scale(15),
                  }}
                  keyExtractor={(item: any, index: any) => index.toString()}
                  renderItem={({ item, index }: any) => {
                    return (
                      <Animatable.View
                        duration={1000}
                        animation={"fadeIn"}
                        delay={100}
                      >
                        <PaymentCard />
                      </Animatable.View>
                    );
                  }}
                />
              )}

              {selectedOnlinePayment == "bank" && (
                <Animatable.View
                  duration={1000}
                  animation={"fadeIn"}
                  delay={100}
                  style={{
                    paddingHorizontal: scale(20),
                    gap: verticalScale(15),
                  }}
                >
                  <CustomText
                    text={
                      "To make an online payment, please choose a convenient bank option from below. Click to copy Account No. / IBAN."
                    }
                    color={colors.grey}
                    style={{ marginRight: scale(10) }}
                    size={12}
                  />
                  <BankTransferCard />
                </Animatable.View>
              )}
              {selectedOnlinePayment == "local" && (
                <Animatable.View
                  duration={1000}
                  animation={"fadeIn"}
                  delay={100}
                  style={{
                    paddingHorizontal: scale(20),
                    gap: verticalScale(15),
                  }}
                >
                  <CustomText
                    text={"Enter your Jazzcash/easypaisa account below."}
                    color={colors.grey}
                    style={{
                      marginRight: scale(10),
                      marginBottom: verticalScale(15),
                    }}
                    size={12}
                  />
                  <LocalPaymentCard />
                </Animatable.View>
              )}
            </View>
          )}

          {selectedOnlinePayment == "card" && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate("PaymentInfoScreen", { disableSkip: true })
              }
              style={{
                ...appStyles.row,
                gap: scale(10),
                marginHorizontal: scale(20),
              }}
            >
              <CustomText
                text={"Add New Card"}
                size={14}
                color={colors.primary}
                fontWeight="600"
                fontFam={font.WorkSans_SemiBold}
              />
              <Image
                source={images.plus}
                resizeMode="contain"
                style={{
                  width: scale(15),
                  height: scale(15),
                }}
              />
            </TouchableOpacity>
          )} */}
      </ScreenLayout>
      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        color={colors.white}
      />
    </>
  );
};

export default ChoosePaymentScreen;

const styles = StyleSheet.create({
  radioButtonConainer: {
    width: scale(18),
    height: scale(18),
    borderRadius: 999,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInner: {
    width: scale(10),
    height: scale(10),
    borderRadius: 999,
    backgroundColor: colors.orange,
  },
  continueBtnContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: verticalScale(40),
    paddingHorizontal: scale(20),
  },
});
