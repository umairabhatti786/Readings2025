import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Alert,
  Pressable,
  Keyboard,
  Platform,
  UIManager,
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
  GUESTTOKEN,
  PAYMENT_METHOD,
  StorageServices,
} from "../../../utils/StorageService";
import CustomToast from "../../../components/CustomToast";
import {
  XPayProvider,
  PaymentElement,
} from "@xstak/xpay-element-react-native-stage";
import { URLS } from "../../../apis/Urls";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  getAuthAddress,
  getAuthBillingAddress,
  getAuthData,
  getAuthLatestAddress,
  getGuestToken,
  getGuestUserEmail,
  getToken,
  setGuestToken,
} from "../../../redux/reducers/authReducer";
import { ApiServices } from "../../../apis/ApiServices";
import CheckBox from "../../../components/CheckBox";
import CustomInput from "../../../components/CustomInput";

const AddPaymentMethod = ({ navigation, route }: any) => {
  const isBillingAddress = route?.params?.isBillingAddress;
  const isCheckout = route?.params?.isCheckout;
  const authLatestAddress: any = useSelector(getAuthLatestAddress);
  const authBillingAddress: any = useSelector(getAuthBillingAddress);
  const [isSaveCard, setIsSaveCard] = useState(true);

  const guestEmail: any = useSelector(getGuestUserEmail);

  const guestUserToken = useSelector(getGuestToken);
  const guestToken = useSelector(getGuestToken);

  // const authLatestAddress=useSelector(getAuthLatestAddress)
  console.log("isBillingAddress", authLatestAddress, authBillingAddress);

  if (Platform.OS === "ios") {
    const viewManager = UIManager.getViewManagerConfig("RNCWebView");
    console.log("RNCWebView config:", viewManager);
  }

  const [laoding, setlaoding] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [selectedOnlinePayment, setSelectedOnlinePayment] = useState("");
  const [selectedMethod, setSelectedMethod] = useState({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({});
  const authData = useSelector(getAuthData);
  const token = useSelector(getToken);
  const [enabled, setEnabled] = React.useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState<any>({});
  const dispatch = useDispatch();
  const billingAddress = useSelector(getAuthBillingAddress);
  const latestAddress = useSelector(getAuthLatestAddress);
  const [cardHolderName, setCardHolderName] = useState("");
  const [showFields, setShowFields] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getActivePaymentMethod();
      GetGuestToken();
    });

    return unsubscribe; // Cleanup the listener
  }, []);

  console.log("showFields", showFields);

  const buttonEnable = () => {
    if (enabled && cardHolderName.length > 0) {
      return false;
    }
    return true;
  };
  console.log("laoding", laoding);
  const GetGuestToken = () => {
    if (token == null && !guestUserToken) {
      ApiServices.GetGuestToken(async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.success) {
            console.log("responseresult", result);

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
  };

  const getActivePaymentMethod = async () => {
    const dispatchPayment = await StorageServices.getItem(PAYMENT_METHOD);
    console.log("dispatchPayment", dispatchPayment);
    setActivePaymentMethod(
      dispatchPayment != null
        ? dispatchPayment
        : { title: "Cash on Delivery", label: "cash", id: 4 }
    );
  };
  const getpaymentMethod = async () => {
    const dispatchPayment = await StorageServices.getItem(PAYMENT_METHOD);
    // setSelectedMethod(selectedAddress);
    if (dispatchPayment == null) {
      setSelectedMethod({ title: "Card", label: "card", id: 1 });
      setSelectedPaymentMethod("online payment");
      setSelectedOnlinePayment("card");
    } else {
      setSelectedPaymentMethod(
        dispatchPayment?.id == 4 ? "cash" : "online payment"
      );
      setSelectedMethod(dispatchPayment);
      setSelectedOnlinePayment(dispatchPayment?.label);
    }

    // setSelectedOnlinePayment(dispatchPayment);
    // setSelectedAddress(dispatchAddress);
  };

  const onAddPaymentMethod = async () => {
    setlaoding(true);
    setEnabled(true);
    navigation.setOptions({
      gestureEnabled: false, // Disable swipe back when true
    });
    const raw = JSON.stringify({
      paymentMethod: "card",
      customer: {
        email: token != null ? authData?.email : guestEmail,
        name: cardHolderName,

        // name:token != null? `${authData?.first_name} ${authData?.last_name}`:isBillingAddress?`${authBillingAddress?.Name}`:`${authLatestAddress?.Name}`,
      },
    });
    let param = {
      raw: raw,
      token: token != null ? token : guestToken,
    };
    ApiServices.CreatePaymentIntent(
      param,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let intentResult = JSON.parse(response);
          console.log("PaymentIntent", intentResult);
          setEnabled(true);

          let customer = {
            name: cardHolderName,
          };

          if (intentResult?.clientSecret) {
            try {
              const { message, error, card } =
                await PaymentElement.confirmPayment(
                  intentResult?.clientSecret,
                  customer
                );
              setEnabled(true);
              console.log("ResultCard", card);

              const refundRaw = JSON.stringify({
                paymentIntentId: intentResult?.paymentIntentId,
              });

              let param = {
                raw: refundRaw,
                token: token != null ? token : guestToken,
              };

              ApiServices.RefundXPayPayment(
                param,
                async ({ isSuccess, response }: any) => {
                  console.log("jcbdcbdkc", response);

                  if (isSuccess) {
                    setEnabled(true);

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
                            setEnabled(true);

                            let card = {
                              ...result?.data?.paymentMethods[0],
                              isSaveCard: isSaveCard,
                            };
                            StorageServices.setItem(
                              DISPATCH_PAYMENY_METHOD,
                              card
                            );
                            navigation.setOptions({
                              gestureEnabled: true, // Disable swipe back when true
                            });
                            navigation.navigate("CheckoutScreen");
                            setMessage("Payment method add successfully");
                            setIsMessage(true);
                            if (isCheckout) {
                              navigation.navigate("CheckoutScreen");
                            } else {
                              navigation.goBack();
                            }
                            setlaoding(false);
                            setEnabled(false);
                            // console.log("Payemnresult", result?.data);
                            // setPaymentMethods(result?.data?.paymentMethods);
                            // setloading(false);
                          } else {
                            // setloading(false);
                            // setIsMessage(true);
                            // setMessage(result?.error);
                          }
                        } else {
                          // setloading(false);
                          // Alert.alert("", "Something went wrong");
                        }
                      }
                    );

                    // setTimeout(() => {
                    // }, 400);
                  } else {
                    setlaoding(false);
                    setMessage("Something went wrong");
                    setIsMessage(true);

                    console.log("Response", response);
                  }
                }
              );

              console.log("PaymentElement Response", message);
            } catch (err) {
              console.error("❌ Payment failed or no message received:", err);
            }

            console.log("MessageResponse", message);
          } else {
            setlaoding(false);
            // setMessage(result?.error);
            setIsMessage(true);
            // Alert.alert("", result?.errors);
          }
        } else {
          setlaoding(false);
          setMessage("Something went wrong");
          setIsMessage(true);

          console.log("Response", response);
        }
      }
    );

    // try {
    //   const clientSecret = await axios.get(
    //     `${URLS.BASE_URL2}/api/payments/create-payment-intent`,
    //   );
    //   console.log("data",clientSecret?.data.clientSecret)
    //   const {message} = await PaymentElement.confirmPayment(
    //     clientSecret.data.clientSecret,
    //     data,
    //   );
    //   console.log("message",message)
    //   Alert.alert('Payment Sucsess', message);
    // //   setLoading(false);
    // //  setIsPlceOrder(false);

    // } catch (error: any) {
    //   console.log("errorMessge",error);
    //   Alert.alert('Payment Failed', error?.message);
    // //   setLoading(false);
    // //  setIsPlceOrder(false);
    // //   setLoading(false);
    // }
  };
  const PaymentMetodContainer = ({ icon, title, isNext, isCard }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          if (isNext) {
            navigation.navigate("AddPaymentMethod");
          }
        }}
        style={{ ...appStyles.rowjustify, gap: scale(7) }}
      >
        <View style={{ ...appStyles.row, gap: scale(10) }}>
          <Image
            source={icon || images.cash}
            resizeMode="contain"
            style={{
              width: scale(18),
              height: scale(18),
            }}
          />
          <View>
            <CustomText
              text={title}
              size={15}
              color={colors.dark_black}
              fontWeight="600"
              fontFam={font.WorkSans_Medium}
            />
            {isCard && (
              <Image
                source={images.visa}
                resizeMode="contain"
                style={{
                  width: scale(30),
                  height: scale(30),
                }}
              />
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
            // onPress={() => {
            //   setSelectedMethod(item);
            //   setSelectedPaymentMethod(item.label);
            // }}
            style={{
              ...styles.radioButtonConainer,
              borderWidth: 1.2,
              borderColor: colors.orange,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              // onPress={() => setSelectedPaymentMethod(item.label)}
              style={styles.radioButtonInner}
            ></TouchableOpacity>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };
  const paymentElementFieldsStyle = {
    creditCard: {
      label: "Card Number",
      placeholder: "1234 1234 1234 1234",
    },
    expiry: {
      label: "Expiry Date",
      placeholder: "MM/YY",
    },
    cvc: {
      label: "CVC",
      placeholder: "CVC",
    },
  };
  return (
    <>
      <ScreenLayout>
        <Pressable
          onPress={() => Keyboard.dismiss()}
          style={{
            paddingHorizontal: scale(20),
            paddingBottom: verticalScale(10),
            gap: verticalScale(20),
            flex: 1,
          }}
        >
          <TopHeader title="Add a Credit or debit card" />
          <View style={{ flex: 1, gap: verticalScale(10) }}>
            {showFields && (
              <View
                style={{
                  gap: verticalScale(10),
                }}
              >
                <CustomText
                  color={colors.dark_grey}
                  text={"Name on Card"}
                  size={15}
                />

                <CustomInput
                  fontWeight={"400"}
                  height={verticalScale(30)}
                  borderColor={colors.dull_half_white}
                  placeholder=""
                  placeholderTextColor={colors.dark_grey}
                  backgroundColor={"transparent"}
                  borderWidth={1}
                  borderRadius={scale(5)}
                  value={cardHolderName}
                  onChangeText={(txt: string) => setCardHolderName(txt)}
                />
              </View>
            )}

            <XPayProvider
              xpay={{
                publishableKey:
                  "xpay_pk_test_216fd9d6154c9bbced04e31c0532ad53c39f6528d3bea515455ac3d00bab12e7",
                hmacSecret:
                  "87772484ac5b2e2daf751d5be8dbfe8f58b39c622f97ce2ed9929343999d18b4",
                accountId: "81b7c9fa30726c4e",
              }}
            >
              
              <PaymentElement
                showModal={false} // or
                useCustomModal={false}
                style={{
                  base: {
                    fontFamily: "ClashDisplay-Semibold", // Change this to your desired font
                    fontSize: "16px",
                    color: "#00B466", // Optional: text color
                  },
                  invalid: {
                    color: "#FF4D4F", // Optional: error text color
                  },
                }}

                onReady={(data:any) => {
                  setShowFields(true);
                  if (!laoding) {
                    setEnabled(data.complete);
                  } else {
                    setEnabled(true);
                  }
                  console.log("Comepletev", data.complete);
                }}
              />
            </XPayProvider>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setIsSaveCard(!isSaveCard);
              }}
              style={{
                flexDirection: "row",
                gap: scale(10),
                paddingVertical: verticalScale(10),
                alignItems: "center",
              }}
            >
              <CheckBox setIsActive={setIsSaveCard} isActive={isSaveCard} />
              <CustomText text={"Save Card For Future Payment"} size={12} />
            </TouchableOpacity>
          </View>
          <View style={styles.continueBtnContainer}>
            <CustomButton
              onPress={onAddPaymentMethod}
              text={isSaveCard ? "Save Card" : "Proceed"}
              disable={buttonEnable()}
              isLoading={laoding}
              bgColor={buttonEnable() ? colors.grey100 : colors.primary}
              style={{ marginTop: verticalScale(20) }}
            />
          </View>

          {/* {paymentMethods.map((item, index) => {
            return (
              <PaymentMetodContainer
                key={index.toString()}
                icon={item?.icon}
                isCard={item?.isCard}
                isNext={item?.isNext}
                title={item?.title}
              />
            );
          })} */}
        </Pressable>

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

export default AddPaymentMethod;

const styles = StyleSheet.create({
  radioButtonConainer: {
    width: scale(16),
    height: scale(16),
    borderRadius: 999,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInner: {
    width: scale(8),
    height: scale(8),
    borderRadius: 999,
    backgroundColor: colors.orange,
  },
  continueBtnContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: verticalScale(40),
  },
});

// if (intentResult?.clientSecret) {
//   const payload = {
//     amount: 1,
//     currency: "PKR",

//     customer: {
//       email: authData?.email,
//       name: `${authData?.first_name} ${authData?.last_name}`,
//       phone: authLatestAddress?.Phone,
//     },
//     shipping: {
//       address1: authLatestAddress?.Address, //required
//       city: authLatestAddress?.City, //required
//       country: authLatestAddress?.Country, //required
//       province: authLatestAddress?.Province, //required
//       zip: authLatestAddress?.PostCode, //required
//     },
//     metadata: {
//       order_reference: "", // order id optional
//     },
//   };
//   console.log("payload",payload)
//   const signature = crypto
//     .createHmac(
//       "SHA256",
//       "87772484ac5b2e2daf751d5be8dbfe8f58b39c622f97ce2ed9929343999d18b4"
//     )
//     .update(JSON.stringify(payload))
//     .digest("hex");
//   console.log("signature", signature);
//   const raw = JSON.stringify({
//     amount: 1,
//     payment_method_types: "card",
//   });
//   let da = {
//     raw: raw,
//     pi_client_secret: intentResult?.clientSecret,
//   };
//   console.log("signature", signature);
//   ApiServices.CaptureAuthorizedAmount(
//     da,
//     async ({ isSuccess, response }: any) => {
//       console.log("Authorized", response);

//       if (isSuccess) {
//         let result = JSON.parse(response);
//         if (result?.success) {
//           setlaoding(false);

//           console.log("CaptureAuthorizedAmount", result);
//         } else {
//           setlaoding(false);
//           setMessage(result?.message);
//           setIsMessage(true);
//           // Alert.alert("", result?.errors);
//         }

//         // if (result?.clientSecret) {
//         //   console.log("Method Added",result)
//         //   // setlaoding(false);
//         //   // setIsSuccessModal(true);
//         //   // navigation.goBack();
//         // } else {
//         //   setlaoding(false);
//         //   setMessage(result?.error);
//         //   setIsMessage(true);
//         //   // Alert.alert("", result?.errors);
//         // }
//       } else {
//         setlaoding(false);
//         setMessage("Something went wrong");
//         setIsMessage(true);

//         console.log("Response", response);
//       }
//     }
//   );
// }
