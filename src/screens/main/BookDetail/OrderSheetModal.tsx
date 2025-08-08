import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { appStyles } from "../../../utils/AppStyles";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../../utils/colors";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import { images } from "../../../assets/images";
import CustomButton from "../../../components/CustomButton";
import CartContainer from "../Cart/CartContainer";
import { ApiServices } from "../../../apis/ApiServices";
import { sessionCheck } from "../../../utils/CommonHooks";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {
  BILLING_ADDRESS,
  Buy_NOW_EMAIL,
  DISPATCH_ADDRESS,
  DISPATCH_PAYMENY_METHOD,
  GUESTTOKEN,
  PAYMENT_METHOD,
  StorageServices,
} from "../../../utils/StorageService";
import { useSelector } from "react-redux";
import {
  getAuthData,
  getBuyNowEmail,
  getGuestToken,
  getUserData,
  setGuestToken,
} from "../../../redux/reducers/authReducer";

interface Props {
  onSubmit?: any;
  navigation?: any;
  onDispatch?: () => void;
  onPaywith?: () => void;
  onCancel?: () => void;
  data?: any;
  token?: any;
  dispatch?: any;
  setIsSuccessModal?: any;
  book_id?: any;
  isBuyNowLoading?: any;
  setIsBuyNowLoading?: any;
  setOrderId?: any;
}

const OrderSheetModal: React.FC<Props> = ({
  onSubmit,
  navigation,
  onPaywith,
  onDispatch,
  onCancel,
  data,
  token,
  dispatch,
  setIsSuccessModal,
  book_id,
  isBuyNowLoading,
  setIsBuyNowLoading,
  setOrderId,
}: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [userlatestAddress, setUserlatestAddress] = useState<any>();
  const [activePaymentMethod, setActivePaymentMethod] = useState<any>({});
  const guestToken = useSelector(getGuestToken);
  const [userBilliingAddress, setUserBillingAddress] = useState<any>();
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [isPlaceOrder, setIsPlceOrder] = useState(false);
  const user = useSelector(getAuthData);
  const guestUserToken = useSelector(getGuestToken);
  const [buyNowEmail, setBuyNowEmail] = useState("");
  console.log("buyNowEmail", buyNowEmail);
  const shippingAmount = 150;

  useEffect(() => {
    getUserAddresses();
    getActivePaymentMethod();
    // getpaymentMethod()
  }, []);

  const getActivePaymentMethod = async () => {
    const dispatchPayment = await StorageServices.getItem(
      DISPATCH_PAYMENY_METHOD
    );
    console.log("dispatchPayment", dispatchPayment);
    setActivePaymentMethod(
      dispatchPayment != null
        ? dispatchPayment
        : { title: "Cash on Delivery", label: "cash", id: 4, icon: images.cash }
    );
  };

  // const getpaymentMethod = async () => {
  //   const dispatchPayment = await StorageServices.getItem(
  //     DISPATCH_PAYMENY_METHOD
  //   );
  //   if (dispatchPayment == null) {
  //     setSelectedMethod({
  //       title: "Cash",
  //       type: "cash",
  //       id: 4,
  //       icon: images.cash,
  //     });
  //   } else {
  //     setSelectedMethod(dispatchPayment);
  //   }

  //   // setSelectedOnlinePayment(dispatchPayment);
  //   // setSelectedAddress(dispatchAddress);
  // };

  const getUserAddresses = () => {
    setLoading(true);
    ApiServices.GetAddress(
      token != null ? token : guestToken,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.data) {
            let data = result?.data?.addresses;
            const lastObject = data[data.length - 1];
            const dispatchAddress = await StorageServices.getItem(
              DISPATCH_ADDRESS
            );
            setUserlatestAddress(
              dispatchAddress != null ? dispatchAddress : lastObject
            );
            const billingAddress = await StorageServices.getItem(
              BILLING_ADDRESS
            );
            const email = await StorageServices.getItem(Buy_NOW_EMAIL);
            setBuyNowEmail(email != null ? email : "");
            setUserBillingAddress(
              billingAddress != null ? billingAddress : undefined
            );
            setLoading(false);
          } else {
            setLoading(false);

            if (!token) {
              // Alert.alert("", result?.error);

              return;
            }

            if (result?.error == "Invalid token") {
              sessionCheck(dispatch, navigation);

              return;
            }
          }
        } else {
          Alert.alert("", "Something went wrong");
          setLoading(false);
        }
      }
    );
  };

  const onPlaceOrder = () => {
    if (!userlatestAddress) {
      // setMessage("Please Select Delivery Address");
      Alert.alert("", "Please Select Delivery Address");

      // setIsMessage(true);
      return;
    }

    setIsBuyNowLoading(true);
    navigation.setOptions({
      gestureEnabled: false, // Disable swipe back when true
    });

    if (token == null && !guestUserToken) {
      ApiServices.GetGuestToken(async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.success) {

            if (!guestUserToken) {
              StorageServices.setItem(GUESTTOKEN, result?.data.token);
              dispatch(setGuestToken(result?.data.token));
            }
          } else {
            Alert.alert("", result?.error);

            // setMessage(result?.error);
            setIsMessage(true);
          }
        } else {
          setMessage("Something went wrong");
        }
      });
    }

    let data = {
      address_id: userlatestAddress.id,
      Book_Id: book_id,
      quantity: quantity,
      payment_option:
      activePaymentMethod?.payment_method == "card" ? 1 : activePaymentMethod?.id,
      email: token != null ? user?.email : buyNowEmail,
      customer: {
        email: token != null ? user?.email : buyNowEmail,
        name:token != null ? user?.first_name + " " + user?.last_name:userBilliingAddress?.id?userBilliingAddress?.Name:userlatestAddress?.Name,
        phone: userBilliingAddress?.id
          ? userBilliingAddress?.Phone
          : userlatestAddress?.Phone,
      },

      billingAddress: {
        address:  userBilliingAddress?.id
          ? userBilliingAddress?.Address
          : userlatestAddress?.Address,
        city:  userBilliingAddress?.id
          ? userBilliingAddress?.City
          : userlatestAddress?.City,
        province: userBilliingAddress?.id
          ? userBilliingAddress?.Province
          : userlatestAddress?.Province,
        country:userBilliingAddress?.id
          ? userBilliingAddress?.Country
          : userlatestAddress?.Country,
        zipCode: userBilliingAddress?.id
          ? userBilliingAddress?.PostCode
          : userlatestAddress?.PostCode,
      },
      token: activePaymentMethod?.id,
    };

    var raw = JSON.stringify(data);

    let params = {
      data: raw,
      token: token != null ? token : guestToken,
    };

    ApiServices.BuyNow(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.success) {
          const match = result?.data.redirectUrl.match(/orderId=(\d+)/);
          const orderId = match ? match[1] : null;
          let params = {
            token: token != null ? token : guestToken,
            id: orderId,
          };

          setOrderId(orderId);
          ApiServices.OrderConfirmation(
            params,
            async ({ isSuccess, response }: any) => {
              if (isSuccess) {
                let result = JSON.parse(response);
                console.log("Pleaseoeer",result)

                if (result?.success) {
                  navigation.setOptions({
                    gestureEnabled: true, // Disable swipe back when true
                  });
                  setIsBuyNowLoading(false);
                  setIsSuccessModal(true);
                } else {
                  Alert.alert("", result?.error);
                  setIsBuyNowLoading(false);
                }
              } else {
                // setMessage("Something went wrong");
                Alert.alert("Alert!", "Something went wrong");
                setIsBuyNowLoading(false);
              }
            }
          );
        } else {
          Alert.alert("", result?.error);
          setIsBuyNowLoading(false);
        }
      } else {
        Alert.alert("", "Something went wrong");
        setIsBuyNowLoading(false);
      }
    });
  };

  const Layout = () => {
    return (
      <SkeletonPlaceholder
        // speed={00}
        highlightColor="rgb(222, 226, 230)"
        backgroundColor="#e9ecef" // Set the main background color of the skeleton
      >
        <View style={{ gap: verticalScale(8) }}>
          {[1, 2].map((item, index) => {
            return (
              <View
                key={index.toString()}
                style={styles.detailContainer}
              ></View>
            );
          })}
        </View>
      </SkeletonPlaceholder>
    );
  };

  const calculateTotal = () => {
    const newSubtotal =
      Number(data?.Discount) > 0
        ? Math.floor(
            Number(data?.PAK_PRICE) -
              Number(data?.PAK_PRICE) * (Number(data?.Discount) / 100)
          )
        : Number(data?.PAK_PRICE || 0);

    return quantity * newSubtotal;
  };

  const DetailCard = ({
    title,
    onPress,
    des,
    fontWeight,
    fontFam,
    size,
    children,
    disabled,
    last_four_digits,
  }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        disabled={disabled}
        onPress={onPress}
        style={{
          ...appStyles.rowjustify,
          ...styles.detailContainer,
        }}
      >
        <CustomText text={title} size={12} color={colors.grey} />
        <View>

  <View style={{ ...appStyles.row, gap: scale(7) }}>
          <CustomText
            text={des}
            size={size || 12}
            fontWeight={fontWeight}
            fontFam={fontFam || font.WorkSans_Regular}
            color={colors.black}
          />
          {children}
          
        </View>

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
      
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: scale(20) }}>
      <View style={appStyles.rowjustify}>
        <CustomText
          text={"Buy Now"}
          color={colors.black}
          fontWeight="600"
          size={18}
          fontFam={font.WorkSans_SemiBold}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onCancel}
          disabled={isBuyNowLoading ? true : false}
          style={styles.box}
        >
          <Image
            style={{
              width: scale(17),
              height: scale(17),
              tintColor: colors.black,
            }}
            resizeMode="contain"
            source={images.close}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: verticalScale(20),
          gap: verticalScale(8),
          marginBottom: verticalScale(20),
        }}
      >
        <CartContainer
          setQuantity={setQuantity}
          quantity={quantity}
          data={data}
        />

        {loading ? (
          <Layout />
        ) : (
          <View
            style={{
              gap: verticalScale(8),
            }}
          >
            <DetailCard
              onPress={onDispatch}
              disabled={isBuyNowLoading}
              title={"Dispatch"}
              des={
                userlatestAddress?.Address
                  ? userlatestAddress?.Address
                  : "Add New Address"
              }
            >
              {!userlatestAddress?.Address && (
                <Image
                  source={images.plus}
                  resizeMode="contain"
                  style={{
                    width: scale(12),
                    height: scale(12),
                    tintColor: colors.black,
                  }}
                />
              )}
            </DetailCard>

            {/* <PaymentMetodContainer
                    item={selectedMethod}
                    icon={
                      selectedMethod?.card_details?.card_network == "mastercard"
                        ? images?.visa
                        : selectedMethod?.card_details?.card_network == "vize"
                        ? images.visa
                        : selectedMethod?.icon
                    }
                    last_four_digits={
                      selectedMethod?.card_details?.last_four_digits
                    }
                    title={
                      selectedMethod?.card_details?.card_network ||
                      selectedMethod?.title
                    }
                  /> */}

            {/* {last_four_digits && (
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
            )} */}

            <DetailCard
              onPress={onPaywith}
              last_four_digits={
                activePaymentMethod?.card_details?.last_four_digits
              }
              disabled={isBuyNowLoading}
              title={"Pay With"}
              // des={activePaymentMethod?.title}
              des={
                activePaymentMethod?.card_details?.card_network ||
                activePaymentMethod?.title
              }
          >

           
            </DetailCard>
          </View>
        )}
        <DetailCard
          title={"Total"}
          disabled={true}
          des={`PKR ${calculateTotal() + Number(shippingAmount)}*`}
          fontFam={font.WorkSans_SemiBold}
          fontWeight={"600"}
          size={14}
        />
      </View>
      <CustomButton
        isLoading={isBuyNowLoading}
        text="Place order"
        onPress={onPlaceOrder}
      />

      <View style={{ marginTop: verticalScale(7) }}>
        <CustomText
          text={"By selecting this, you agree to the Readings"}
          size={14}
        />
        <View style={{ ...appStyles.row, gap: scale(4) }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("TermsAndCondirtions")}
          >
            <CustomText
              color={colors.primary}
              textDecorationLine="underline"
              text={"Terms of service*"}
              size={14}
            />
          </TouchableOpacity>
          <CustomText text={"and"} size={14} />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("PrivacyPolicy")}
          >
            <CustomText
              color={colors.primary}
              textDecorationLine="underline"
              text={"privacy policy"}
              size={14}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    width: scale(30),
    height: scale(30),
    alignItems: "flex-end",
    justifyContent: "center",
  },
  detailContainer: {
    height: verticalScale(39),
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: scale(10),
    paddingHorizontal: scale(10),
  },
});

export default OrderSheetModal;
