import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import TopHeader from "../../../components/TopHeader";
import CustomText from "../../../components/CustomText";
import { images } from "../../../assets/images";
import CustomButton from "../../../components/CustomButton";
import AddressCard from "../../../components/AddressCard";
import { appStyles } from "../../../utils/AppStyles";
import { colors } from "../../../utils/colors";
import { font } from "../../../utils/font";
import CheckBookCard from "./CheckBookCard";
import CustomAlertModal from "../../../components/CustomAlertModal";
import PaymentCard from "../../../components/PaymentCard";
import BankTransferCard from "./BankTransferCard";
import LocalPaymentCard from "./LocalPaymentCard";
import { checkoutBooksData } from "../../../utils/Data";
import * as Animatable from "react-native-animatable";
import CheckBox from "../../../components/CheckBox";
import { ApiServices } from "../../../apis/ApiServices";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthData,
  getGuestToken,
  getToken,
  getUserData,
  setAuthBillingAddress,
  setAuthlatestAddress,
  setGuestUserEmail,
} from "../../../redux/reducers/authReducer";
import {
  BILLING_ADDRESS,
  DISPATCH_ADDRESS,
  DISPATCH_PAYMENY_METHOD,
  PAYMENT_METHOD,
  StorageServices,
} from "../../../utils/StorageService";
import { sessionCheck } from "../../../utils/CommonHooks";
import { CheckoutLayout } from "../../../utils/Loyout/CheckoutLayout";
import CustomInput from "../../../components/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomToast from "../../../components/CustomToast";
import AbsoluateView from "../../../components/AbsoluateView";
import { URLS } from "../../../apis/Urls";
import { emailRegex } from "../../../utils/Regex";
import { CommonActions } from "@react-navigation/native";
import {
  XPayProvider,
  PaymentElement,
} from "@xstak/xpay-element-react-native-stage";
import axios from "axios";

const CheckoutScreen = ({ navigation, route }: any) => {
  const [isBilling, setIsBilling] = useState(true);
  const [isGiftRap, setIsGiftRap] = useState(false);
  const [isInvoice, setIsInvoice] = useState(false);

  const [userlatestAddress, setUserlatestAddress] = useState<any>();
  const [userBilliingAddress, setUserBillingAddress] = useState<any>();
  const [selectedMethod, setSelectedMethod] = useState<any>({});
  console.log("selectedMethod", selectedMethod);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [specialInstruction, setSpecialInstruction] = useState("");
  const [checkoutBooks, setCheckoutBooks] = useState<any>([]);
  const [isPlaceOrder, setIsPlceOrder] = useState(false);
  const [cardDiscount, setCardDiscount] = useState({});
  const guestToken = useSelector(getGuestToken);
  const authData = useSelector(getAuthData);
  const [orderId, setOrderId] = useState();
  const [subTotal,setSubTotal]=useState()
  const [isOnDemandDelivery,setIsOnDemandDelivery]=useState(false)
  const [checkOutdetails, setCheckOutdetails] = useState({
    subtital: 0,
    shipping: 0,
    total: 0,
  });
  console.log("checkOutdetails", checkoutBooks);

  const [selectedOnlinePayment, setSelectedOnlinePayment] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isOrderPlaceVisible, setIsOrderPlaceVisible] = useState(false);

  const [values, setValues] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email_error: "",
  });
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const paymentMethods = [
    { title: "Cash on Delivery", label: "cash", id: 4 },
    {
      title: "Online Payment (Debit, Credit, Paypak)",
      label: "online payment",
    },
  ];

  const onlinePaymentMethods = [
    { title: "Card", label: "card", id: 1 },
    { title: "Bank Transfer", label: "bank", id: 3 },
    { title: "Jazzcash / Easypaisa", label: "local", id: 2 },
  ];
  console.log("userlatestAddress", userlatestAddress);
  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      getCheckoutData(); // Run this function on the first visit
      getUserAddresses();
      getpaymentMethod();
    });

    return unsubscribe; // Clean up the listener when the screen is unmounted
  }, []);

  // useEffect(() => {
  //     UpdateOndemandDelivery(); // Run this function on the first visit
   
 

  // }, [checkoutBooks]);

  const UpdateOndemandDelivery=(    availableBooks: any[],
    preOrderBooks: any[],
    outOfStockBooks: any[],
    onDemandBooks: any[])=>{



      const hasAvailable = availableBooks.length > 0;
      const hasPreOrder = preOrderBooks.length > 0;
      const hasOutOfStock = outOfStockBooks.length > 0;
      const hasOnDemand = onDemandBooks.length > 0;
  
      // ✅ Two-category combinations with amount = 300
      if (
        (hasAvailable && hasOutOfStock) ||
        (hasAvailable && hasOnDemand) ||
        (hasPreOrder && hasOutOfStock) ||
        (hasPreOrder && hasOnDemand)
      ) {
        return true;
      }
  
      // ✅ Any three-category combination = 300
      const totalTrue = [
        hasAvailable,
        hasPreOrder,
        hasOutOfStock,
        hasOnDemand,
      ].filter(Boolean).length;
      if (totalTrue >= 3) {
        return true;
      }
  
      // ✅ All four categories = 300
      if (hasAvailable && hasPreOrder && hasOutOfStock && hasOnDemand) {
        return true;
      }
  
      // Otherwise not 300
      return false;
    

   

    // const hasLimitedAvailability = checkoutBooks.some(book => {
    //   console.log("status",book)
    //   const status = book.BOOK_STATUS;
    //   const quantity = Number(book.QUANTITY) || 0;
    
    //   const isStatusLimited =
    //     status === "N" ||
    //     status === "O" 
    
    //   return isStatusLimited && quantity <= 0;
    // });
    // setIsOnDemandDelivery(hasLimitedAvailability);


  }



  console.log("userlatestAddress", selectedPaymentMethod);

  const getCheckoutData = () => {
    let params = {
      page: 1,
      token: token != null ? token : guestToken,
    };
    // setHasMoreData(true);
    ApiServices.GetOrderCart(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        console.log("CardChechc",result)
        setCheckOutdetails({
          ...checkOutdetails,
          subtital: result?.data?.summary?.net_amount,
          shipping:
            Number(result?.data?.summary?.net_total) -
            Number(result?.data?.summary?.net_amount),
          total: result?.data?.summary?.net_total,
        });

        ApiServices.InitiateCheckout(
          token != null ? token : guestToken,
          async ({ isSuccess, response }: any) => {
            if (isSuccess) {
              console.log("InitiateCheckout", response);
              setLoading(false);
            }

            // else {
            //   setIsMessage(true);
            //   setMessage("Something went wrong");
            // }
          }
        );

        if (
          result?.data?.availableBooks ||
          result?.data?.outOfStockBooks ||
          result?.data?.outOfStockBooks ||
          result?.data?.onDemandBooks ||
          result?.data?.preOrderBooks
        ) {
          setCheckoutBooks([
            ...(result?.data?.availableBooks || []), // Spread availableBooks if exists, otherwise empty array
            ...(result?.data?.outOfStockBooks || []), // Spread outOfStockBooks if exists, otherwise empty array
            ...(result?.data?.preOrderBooks || []), // Spread preOrderBooks if exists, otherwise empty array
            ...(result?.data?.onDemandBooks || []), // Spread onDemandBooks if exists, otherwise empty array
          ]);

          let isOnDemand=UpdateOndemandDelivery(result?.data?.availableBooks,result?.data?.preOrderBooks,result?.data?.outOfStockBooks,result?.data?.onDemandBooks)
          setIsOnDemandDelivery(isOnDemand)
        } else {
          setLoading(false);
          if (token) {
            setMessage(result?.error);
            setIsMessage(true);
          }
        }
      } else {
        setLoading(false);
        setMessage("Something went wrong");
        setIsMessage(true);
      }
    });
  };

  const getPaymentCardDiscount = (method: any) => {
    let params = {
      token: token != null ? token : guestToken,
      bin: method?.bin,
      last4digits: method?.card_details?.last_four_digits,
    };
    console.log("ckdnkdnkdncknc");
    // setHasMoreData(true);
    ApiServices.GetCardDicount(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        console.log("ckdbkdc",result?.data)
        setSubTotal
        if (result?.success) {
          setCardDiscount(result?.data);
        } else {
          setCardDiscount({});
        }
        // console.log("resultresultresultresult",result?.data)
      } else {
        setLoading(false);
        setMessage("Something went wrong");
        setIsMessage(true);
      }
    });
  };
  const getpaymentMethod = async () => {
    const dispatchPayment = await StorageServices.getItem(
      DISPATCH_PAYMENY_METHOD
    );
    if (dispatchPayment == null) {
      setSelectedMethod({
        title: "Cash",
        type: "cash",
        id: 4,
        icon: images.cash,
      });
    } else {
      setSelectedMethod(dispatchPayment);
    }
    if (dispatchPayment?.payment_method == "card") {
      getPaymentCardDiscount(dispatchPayment);
    } else {
      setCardDiscount({});
    }

    // setSelectedOnlinePayment(dispatchPayment);
    // setSelectedAddress(dispatchAddress);
  };

  const getUserAddresses = () => {
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
            dispatch(
              setAuthlatestAddress(
                dispatchAddress != null ? dispatchAddress : lastObject
              )
            );
            setUserBillingAddress(
              billingAddress != null ? billingAddress : undefined
            );
            dispatch(
              setAuthBillingAddress(
                billingAddress != null ? billingAddress : undefined
              )
            );
          } else {
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
        }
      }
    );
  };

  const onPlaceOrder = async () => {
    if (!token) {
      if (!values.email) {
        setMessage("Email is required");
        setIsMessage(true);

        return;
      }
      if (!emailRegex.test(values.email)) {
        setMessage("Invalid Email Address");
        setIsMessage(true);
        return;
      }
    }
    if (!userlatestAddress) {
      setMessage("Please Select Delivery Address");

      setIsMessage(true);
      return;
    }
    if (!isBilling) {
      if (userBilliingAddress?.id || userlatestAddress?.id) {
      } else {
        setMessage("Please Select Billing Address");
        setIsMessage(true);

        return;
      }
    }
    setIsPlceOrder(true);
    navigation.setOptions({
      gestureEnabled: false, // Disable swipe back when true
    });
    if (selectedMethod?.payment_method == "card") {
      PayWithCard();

      return;
    }

    let data = {
      email: !token ? values.email : "",
      // userBilliingAddress?.Address?userBilliingAddress:userlatestAddress
      subscribeToNewsLetter: false,
      address_id: userlatestAddress.id,
      billing_address_id: isBilling
        ? userlatestAddress?.id
        : userBilliingAddress?.id
        ? userBilliingAddress?.id
        : userlatestAddress?.id,
      gift_wrap: isGiftRap ? 1 : 0,
      invoice_not_submit: isInvoice ? 1 : 0,
      special_instruction: specialInstruction ? specialInstruction : "",
      payment_option:
        selectedMethod?.payment_method == "card" ? 1 : selectedMethod?.id,
    };

    var raw = JSON.stringify(data);

    let params = {
      data: raw,
      token: token != null ? token : guestToken,
    };

    ApiServices.PlaceOrder(params, async ({ isSuccess, response }: any) => {
      console.log("PlaceOder", response);

      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.success) {
          const match = result?.data.redirectUrl.match(/orderId=(\d+)/);
          const orderId = match ? match[1] : null;
          setOrderId(orderId);
          let params = {
            token: token != null ? token : guestToken,
            id: orderId,
          };
          ApiServices.OrderConfirmation(
            params,
            async ({ isSuccess, response }: any) => {
              if (isSuccess) {
                let result = JSON.parse(response);
                if (result?.success) {
                  setIsPlceOrder(false);
                  navigation.setOptions({
                    gestureEnabled: true, // Disable swipe back when true
                  });
                  setIsOrderPlaceVisible(true);

                  // if (guestToken) {
                  //   await StorageServices.removeItem(DISPATCH_ADDRESS);
                  //   await StorageServices.removeItem(BILLING_ADDRESS);
                  // }
                } else {
                  setIsOrderPlaceVisible(false);
                  setMessage(result?.error);
                  setIsMessage(true);
                }
              } else {
                setIsOrderPlaceVisible(false);
                setMessage("Something went wrong");
              }
            }
          );
        } else {
          setIsOrderPlaceVisible(false);
          setMessage(result?.error);
          setIsMessage(true);
        }
      } else {
        setIsOrderPlaceVisible(false);
        setMessage("Something went wrong");
      }
    });
  };

  const checkEmailExists = async (
    values: any,
    token: string | null,
    guestToken: string | null
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      const params = {
        token: token != null ? token : guestToken,
        email: values?.email,
      };

      ApiServices.CheckEmailExist(
        params,
        async ({ isSuccess, response }: any) => {
          let res = JSON.parse(response);

          if (res?.error) {
            setMessage(res?.error);
            setIsMessage(true);

            resolve(false);
          } else {
            setErrors((prev) => ({
              ...prev,
              email_error: "",
            }));
            resolve(true);
          }
        }
      );
    });
  };

  const CalculateCardDiscount = () => {
    if (cardDiscount?.binDiscountDetail?.discount_value > 0) {
      let discount = Math.floor(
        (CalculateSubTotal() *
          cardDiscount?.binDiscountDetail?.discount_value) /
          100
      );
      console.log("discount",cardDiscount)
      return discount > Number(cardDiscount?.binDiscountDetail?.discount_limit) ? Number(cardDiscount?.binDiscountDetail?.discount_limit) : discount;
    }
    return 0;
  };

  const CalculateSubTotal = () => {
    if (cardDiscount?.binDiscountDetail?.discount_value > 0) {

      let currentTotal = checkoutBooks?.reduce(
        (accumulator: any, current: any) =>
          accumulator + Number(current?.PAK_PRICE*current?.cart_qty),
        0.0,
      );

      console.log("currentTotal",currentTotal)

    return currentTotal;
  };

  return  checkOutdetails?.subtital

}

// CalculateSubTotal()

  const PayWithCard = () => {
    let data = {
      gift_wrap: isGiftRap ? 1 : 0,
      paymentMethod: selectedMethod?.payment_method,
      customer: {
        email: token == null ? values?.email : authData?.email,
        name: `${authData?.first_name} ${authData?.last_name}`,
        phone: isBilling
          ? userlatestAddress?.Phone
          : userBilliingAddress?.id
          ? userBilliingAddress?.Phone
          : userlatestAddress?.Phone,
      },

      billingAddress: {
        address: isBilling
          ? userlatestAddress?.Address
          : userBilliingAddress?.id
          ? userBilliingAddress?.Address
          : userlatestAddress?.Address,
        city: isBilling
          ? userlatestAddress?.City
          : userBilliingAddress?.id
          ? userBilliingAddress?.City
          : userlatestAddress?.City,
        province: isBilling
          ? userlatestAddress?.Province
          : userBilliingAddress?.id
          ? userBilliingAddress?.Province
          : userlatestAddress?.Province,
        country: isBilling
          ? userlatestAddress?.Country
          : userBilliingAddress?.id
          ? userBilliingAddress?.Country
          : userlatestAddress?.Country,
        zipCode: isBilling
          ? userlatestAddress?.PostCode
          : userBilliingAddress?.id
          ? userBilliingAddress?.PostCode
          : userlatestAddress?.PostCode,
      },
      token: selectedMethod?.id,
    };

    var raw = JSON.stringify(data);

    let params = {
      data: raw,
      token: token != null ? token : guestToken,
    };

    console.log("paramsData", params);

    ApiServices.PayWithCard(params, async ({ isSuccess, response }: any) => {
      console.log("payCardResponse", response);
      if (isSuccess) {
        let result = JSON.parse(response);
        console.log("PlaceOdercad", result);
        if (result?.success) {
          if (token == null) {
            // StorageServices.removeItem(DISPATCH_PAYMENY_METHOD);
            dispatch(setGuestUserEmail(null));
          }

          let data = {
            email: !token ? values.email : "",
            // userBilliingAddress?.Address?userBilliingAddress:userlatestAddress
            subscribeToNewsLetter: false,
            address_id: userlatestAddress.id,
            billing_address_id: isBilling
              ? userlatestAddress?.id
              : userBilliingAddress?.id
              ? userBilliingAddress?.id
              : userlatestAddress?.id,
            gift_wrap: isGiftRap ? 1 : 0,
            invoice_not_submit: isInvoice ? 1 : 0,
            special_instruction: specialInstruction ? specialInstruction : "",
            payment_option: 1,
          };

          var raw = JSON.stringify(data);

          let params = {
            data: raw,
            token: token != null ? token : guestToken,
          };

          ApiServices.PlaceOrder(
            params,
            async ({ isSuccess, response }: any) => {
              if (isSuccess) {
                let result = JSON.parse(response)
                console.log("PlaceOder", result);
                if (result?.success) {
                  const match = result?.data.redirectUrl.match(/orderId=(\d+)/);
                  const orderId = match ? match[1] : null;
                  setOrderId(orderId);
                  let params = {
                    token: token != null ? token : guestToken,
                    id: orderId,
                  };
                  ApiServices.OrderConfirmation(
                    params,
                    async ({ isSuccess, response }: any) => {
                      if (isSuccess) {
                        let result = JSON.parse(response);
                        if (result?.success) {
                          if (
                            selectedMethod?.isSaveCard == false ||
                            token == null
                          ) {
                            let params = {
                              token: token != null ? token : guestToken,
                              id: selectedMethod?.id,
                            };

                            ApiServices.DeletePaymentcard(
                              params,
                              async ({ isSuccess, response }: any) => {
                                if (isSuccess) {
                                  let result = JSON.parse(response);
                                  if (result?.success) {
                                    StorageServices.removeItem(
                                      DISPATCH_PAYMENY_METHOD
                                    );
                                    setIsPlceOrder(false);
                                    navigation.setOptions({
                                      gestureEnabled: true, // Disable swipe back when true
                                    });

                                    setIsOrderPlaceVisible(true);
                                  } else {
                                    // Alert.alert("", result?.error);
                                  }
                                } else {
                                  // Alert.alert("", "Something went wrong");
                                }
                              }
                            );
                            StorageServices.removeItem(DISPATCH_PAYMENY_METHOD);

                            return;
                          }

                          setIsPlceOrder(false);
                          navigation.setOptions({
                            gestureEnabled: true, // Disable swipe back when true
                          });
                          setIsOrderPlaceVisible(true);

                          // if (guestToken) {
                          //   await StorageServices.removeItem(DISPATCH_ADDRESS);
                          //   await StorageServices.removeItem(BILLING_ADDRESS);
                          // }
                        } else {
                          navigation.setOptions({
                            gestureEnabled: true, // Disable swipe back when true
                          });
                          setIsOrderPlaceVisible(false);
                          setMessage(result?.error);
                          setIsPlceOrder(false);
                          setIsMessage(true);
                        }
                      } else {
                        navigation.setOptions({
                          gestureEnabled: true, // Disable swipe back when true
                        });
                        setIsOrderPlaceVisible(false);
                        setIsPlceOrder(false);
                        setMessage("Something went wrong");
                      }
                    }
                  );
                } else {
                  navigation.setOptions({
                    gestureEnabled: true, // Disable swipe back when true
                  });
                  setIsOrderPlaceVisible(false);
                  setIsPlceOrder(false);
                  setMessage(result?.error);
                  setIsMessage(true);
                }
              } else {
                navigation.setOptions({
                  gestureEnabled: true, // Disable swipe back when true
                });
                setIsPlceOrder(false);
                setIsOrderPlaceVisible(false);
                setMessage("Something went wrong");
                setIsMessage(true);
              }
            }
          );
        } else {
          navigation.setOptions({
            gestureEnabled: true, // Disable swipe back when true
          });
          setIsOrderPlaceVisible(false);
          setIsPlceOrder(false);

          setMessage(result?.error ? result?.error : result?.message);
          setIsMessage(true);
        }
      } else {
        navigation.setOptions({
          gestureEnabled: true, // Disable swipe back when true
        });
        setIsOrderPlaceVisible(false);
        setIsPlceOrder(false);
        setMessage("Something went wrong");
      }
    });
  };

  const PaymentMetodContainer = ({
    icon,
    title,
    isCard,
    item,
    last_four_digits,
  }: any) => {
    console.log("ItemViza", item);
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          ...appStyles.rowjustify,
          gap: scale(7),
          padding: scale(15),
          borderWidth: 1,
          borderColor: colors.grey100 + "70",
          borderRadius: scale(10),
          backgroundColor: colors.white,
        }}
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
                  width: scale(34),
                  height: scale(34),
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

        <CustomText
          text={`Rs. ${
            GrandCalculation()
          }`}
          size={15}
          color={colors.dark_black}
          fontWeight="600"
          fontFam={font.WorkSans_Medium}
        />
      </TouchableOpacity>
    );
  };

  const GrandCalculation = (
   
  ) => {

    // isGiftRap
    // ? (Number(checkOutdetails?.total + 100) - CalculateCardDiscount()) +
    //   (isOnDemandDelivery ? 150 : 0)
    // : (checkOutdetails?.total - CalculateCardDiscount()) +
    //   (isOnDemandDelivery ? 150 : 0)
    // let finalTotal = Number(CalculateSubTotal()+checkOutdetails?.shipping) || 0;

    let finalTotal =  cardDiscount?.binDiscountDetail?.discount_value > 0?Number(CalculateSubTotal()+checkOutdetails?.shipping) || 0:  Number(checkOutdetails?.total) || 0;
  
    // Apply discount
    finalTotal -= CalculateCardDiscount();
  
    // Add gift wrap charge
    if (isGiftRap) {
      finalTotal += 100;
    }
  
    // Add on-demand delivery charge
    if (isOnDemandDelivery) {
      finalTotal += 150;
    }
  
    return finalTotal;
  };

  return (
    <>
      <ScreenLayout style={{ gap: verticalScale(20) }}>
        <View style={{ paddingHorizontal: scale(20) }}>
          <TopHeader title="Checkout" />
        </View>
        {loading ? (
          <CheckoutLayout />
        ) : (
          <>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              style={{ ...appStyles.main }}
              contentContainerStyle={{
                paddingBottom: verticalScale(20),
                gap: verticalScale(20),
              }}
            >
              <View
                style={{
                  flex: 1,
                  gap: verticalScale(20),
                  paddingHorizontal: scale(20),
                }}
              >
                {token == null && (
                  <View
                    style={{
                      gap: verticalScale(10),
                    }}
                  >
                    <CustomText
                      text={"Email Address"}
                      size={18}
                      color={colors.black}
                      fontWeight="600"
                      fontFam={font.WorkSans_SemiBold}
                    />

                    <CustomInput
                      value={values.email}
                      error={errors.email_error}
                      onChangeText={(txt: string) => {
                        setValues({ ...values, email: txt });
                        let isValid = emailRegex.test(txt);
                        if (!txt) {
                          setErrors({ ...errors, email_error: "" });
                          return;
                        }
                        if (!isValid) {
                          setErrors({
                            ...errors,
                            email_error: "Invalid Email Address",
                          });
                        } else if (isValid) {
                          setErrors({ ...errors, email_error: "" });
                        }
                      }}
                      placeholder="Enter Email"
                    />
                  </View>
                )}

                <View>
                  <CustomText
                    text={"Delivery Address"}
                    color={colors.black}
                    fontWeight="600"
                    style={{
                      marginBottom: verticalScale(5),
                    }}
                    fontFam={font.WorkSans_SemiBold}
                    size={18}
                  />
                  {userlatestAddress?.id && (
                    <AddressCard
                      width={"100%"}
                      // selectedAddress={selectedAddress}
                      data={userlatestAddress}
                    />
                  )}

                  {/* <AddressCard width={"100%"} /> */}
                </View>

                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    navigation.navigate(
                      userlatestAddress?.id
                        ? "ChooseAddressScreen"
                        : "AddAddressScreen"
                    )
                  }
                  style={{
                    gap: scale(10),
                    marginTop: verticalScale(-5),
                  }}
                >
                  <CustomText
                    text={
                      userlatestAddress?.id
                        ? "Change Delivery Address"
                        : "Add Delivery Address"
                    }
                    size={14}
                    color={colors.primary}
                    fontWeight="600"
                    fontFam={font.WorkSans_SemiBold}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    marginTop: verticalScale(5),
                    gap: verticalScale(10),
                  }}
                >
                  <CustomText
                    text={"Billing address"}
                    size={18}
                    color={colors.black}
                    fontWeight="600"
                    fontFam={font.WorkSans_SemiBold}
                  />
                  {!isBilling && (
                    <>
                      {(userBilliingAddress?.id || userlatestAddress?.id) && (
                        <AddressCard
                          width={"100%"}
                          data={
                            userBilliingAddress?.id
                              ? userBilliingAddress
                              : userlatestAddress
                          }
                        />
                      )}
                    </>
                  )}
                  {!isBilling && (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() =>
                        navigation.navigate(
                          userBilliingAddress?.id || userlatestAddress?.id
                            ? "ChooseAddressScreen"
                            : "AddAddressScreen",
                          {
                            isBillingAddress: true,
                          }
                        )
                      }
                      style={{
                        ...appStyles.row,
                        gap: scale(10),
                        marginTop: verticalScale(5),
                      }}
                    >
                      <CustomText
                        text={
                          userBilliingAddress?.id || userlatestAddress?.id
                            ? "Change Biling Address"
                            : "Add Billing Address"
                        }
                        size={14}
                        color={colors.primary}
                        fontWeight="600"
                        fontFam={font.WorkSans_SemiBold}
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => setIsBilling(!isBilling)}
                    style={{ ...appStyles.row, gap: scale(7) }}
                  >
                    <CheckBox isActive={isBilling} setIsActive={setIsBilling} />

                    <CustomText
                      text={"My billing address is same as shipping address"}
                      size={12}
                      color={colors.grey}
                      fontWeight="500"
                      fontFam={font.WorkSans_Regular}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    gap: verticalScale(10),
                  }}
                >
                  <View style={appStyles.rowjustify}>
                    <CustomText
                      text={"Payment Method"}
                      size={18}
                      color={colors.black}
                      fontWeight="600"
                      fontFam={font.WorkSans_SemiBold}
                    />
                    <TouchableOpacity
                      onPress={async () => {
                        if (!token) {
                          if (!values.email) {
                            setMessage("Email is required");
                            setIsMessage(true);

                            return;
                          }
                          if (!emailRegex.test(values.email)) {
                            setMessage("Invalid Email Address");
                            setIsMessage(true);
                            return;
                          }

                          if (!userlatestAddress) {
                            setMessage("Please Select Delivery Address");

                            setIsMessage(true);
                            return;
                          }
                          if (!isBilling) {
                            if (
                              userBilliingAddress?.id ||
                              userlatestAddress?.id
                            ) {
                            } else {
                              setMessage("Please Select Billing Address");
                              setIsMessage(true);

                              return;
                            }
                          }
                          const isValid = await checkEmailExists(
                            values,
                            token,
                            guestToken
                          );

                          if (!isValid) {
                            // Show alert or block submission
                            return;
                          }
                          if (!token) {
                            dispatch(setGuestUserEmail(values?.email));
                          }
                          navigation.navigate("ChoosePaymentScreen", {
                            isBillingAddress: isBilling,
                          });
                        }
                        // if (!token) {
                        //   dispatch(setGuestUserEmail(values?.email));
                        // }
                        navigation.navigate("ChoosePaymentScreen", {
                          isCheckout: true,
                        });
                      }}
                      style={{ paddingVertical: verticalScale(5) }}
                    >
                      <CustomText
                        text={"Change"}
                        size={18}
                        color={colors.black}
                        fontWeight="600"
                        fontFam={font.WorkSans_SemiBold}
                      />
                    </TouchableOpacity>
                  </View>

                  <PaymentMetodContainer
                    item={selectedMethod}
                    icon={
                      selectedMethod?.card_details?.card_network == "mastercard"
                        ? images?.master_card
                        : selectedMethod?.card_details?.card_network == "visa"
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
                  />
                  {/* {selectedMethod?.label == "local" ? (
                    <>
                      <LocalPaymentCard selectedMethod={selectedMethod} />
                    </>
                  ) : (
                    
                  )} */}

                  {/* {paymentMethods.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index.toString()}
                        activeOpacity={0.5}
                        onPress={() => {
                          setSelectedMethod(item);
                          setSelectedPaymentMethod(item.label);
                        }}
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
                              onPress={() => {
                                setSelectedMethod(item);
                                setSelectedPaymentMethod(item.label);
                              }}
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
                  })} */}
                </View>

                {/* {selectedPaymentMethod == "online payment" && (
                  <Animatable.View
                    duration={1000}
                    animation={"fadeIn"}
                    delay={100}
                    style={{
                      gap: verticalScale(10),
                      marginTop: verticalScale(-5),
                    }}
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
                                onPress={() => {
                                  setSelectedMethod(item);
                                  setSelectedOnlinePayment(item.label);
                                }}
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
                )} */}
              </View>

              {/* {selectedPaymentMethod == "online payment" && (
                <View>
                  {selectedOnlinePayment == "card" && (
                    <View >
                      <View
                      style={{marginHorizontal:scale(20)}}
                      >

                      <XPayProvider
                        xpay={{
                          publishableKey: "xpay_pk_test_95c6197c399f6cb65919e5a992267e12a56f4e428d0c62e514048b54e9852ae7",
                          hmacSecret: "87772484ac5b2e2daf751d5be8dbfe8f58b39c622f97ce2ed9929343999d18b4",
                          accountId: "81b7c9fa30726c4e",
                        }}
                      >
                        <PaymentElement />
                      </XPayProvider>
                        </View>
                     
                      
                    </View>
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
              )} */}

              <View
                style={{ paddingHorizontal: scale(20), gap: verticalScale(20) }}
              >
                <View style={{ gap: verticalScale(10) }}>
                  {checkoutBooks?.map((item: any, index: any) => {
                    return <CheckBookCard key={index.toString()} data={item} />;
                  })}
                </View>

                <View style={{ ...appStyles.row, gap: scale(20) }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      setIsGiftRap(!isGiftRap);
                      setIsInvoice(!isInvoice);
                    }}
                    style={{ ...appStyles.row, gap: scale(7) }}
                  >
                    <CheckBox
                      onActive={() => {
                        setIsInvoice(!isInvoice);
                      }}
                      isActive={isGiftRap}
                      setIsActive={setIsGiftRap}
                    />

                    <CustomText
                      text={"Gift Wrap"}
                      size={12}
                      color={colors.grey}
                      fontWeight="500"
                      fontFam={font.WorkSans_Regular}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => setIsInvoice(!isInvoice)}
                    style={{ ...appStyles.row, gap: scale(7) }}
                  >
                    <CheckBox isActive={isInvoice} setIsActive={setIsInvoice} />

                    <CustomText
                      text={"Do not include invoice"}
                      size={12}
                      color={colors.grey}
                      fontWeight="500"
                      fontFam={font.WorkSans_Regular}
                    />
                  </TouchableOpacity>
                </View>

                <CustomInput
                  height={100}
                  value={specialInstruction}
                  multiline={true}
                  onChangeText={(value: any) => setSpecialInstruction(value)}
                  textAlignVertical={"top"}
                  paddingTop={verticalScale(10)}
                  placeholder="Special Instructions"
                />

                <View style={styles.promoContainer}>
                  <TextInput
                    style={styles.promoInput}
                    placeholder={"Promo"}
                    allowFontScaling={false} // Disable font scaling
                    placeholderTextColor={colors.grey}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.promoButton}
                  >
                    <CustomText text={"Apply"} color={colors.white} size={14} />
                  </TouchableOpacity>
                </View>

                <View style={styles.subtotalContainer}>
                  <View style={{ ...appStyles.rowjustify, width: "100%" }}>
                    <CustomText
                      text={"Subtotal"}
                      color={colors.black}
                      size={14}
                    />
                    <CustomText
                      text={`Rs. ${CalculateSubTotal()}`}
                      color={colors.black}
                      size={14}
                    />
                  </View>

                  {cardDiscount?.binDiscountDetail?.discount_value > 0 && (
                    <View style={{ ...appStyles.rowjustify, width: "100%" }}>
                      <CustomText
                        text={`${cardDiscount?.binDiscountDetail?.bank_name} Discount (${cardDiscount?.binDiscountDetail?.discount_value}%)`}
                        color={colors.green}
                        style={{width:"75%"}}
                        numberOfLines={1}
                        size={14}
                      />
                      <CustomText
                        text={`- Rs. ${CalculateCardDiscount()}`}
                        color={colors.green}
                        size={14}
                      />
                    </View>
                  )}
                  {isGiftRap && (
                    <View style={{ ...appStyles.rowjustify, width: "100%" }}>
                      <CustomText
                        text={"Gift Wrap "}
                        color={colors.black}
                        size={14}
                      />
                      <CustomText
                        text={`Rs. 100`}
                        color={colors.black}
                        size={14}
                      />
                    </View>
                  )}
                 

                  <View style={{ ...appStyles.rowjustify, width: "100%" }}>
                    <CustomText
                      text={"Shipping"}
                      color={colors.black}
                      size={14}
                    />
                    <CustomText
                      text={`Rs. ${checkOutdetails?.shipping}`}
                      color={colors.black}
                      size={14}
                    />
                  </View>

                  {
                    isOnDemandDelivery&&(

                      <View style={{ ...appStyles.rowjustify, width: "100%" }}>
                      <CustomText
                        text={"On Demand Delivery"}
                        color={colors.black}
                        size={14}
                      />
                      <CustomText
                        text={`Rs. ${150}`}
                        color={colors.black}
                        size={14}
                      />
                    </View>

                    )
                  }
                </View>
              </View>
            </KeyboardAwareScrollView>
          </>
        )}
      </ScreenLayout>
      {!loading && (
        <View style={styles.checkoutTotalContainer}>
          <View style={{ ...appStyles.rowjustify, width: "100%" }}>
            <CustomText
              text={"Total"}
              color={colors.black}
              size={18}
              fontWeight="600"
              fontFam={font.WorkSans_SemiBold}
            />
            <CustomText
            text={`Rs. ${
              GrandCalculation()
            }`}
              color={colors.black}
              size={16}
              fontWeight="600"
              fontFam={font.WorkSans_SemiBold}
            />
          </View>

          <CustomButton
            text={"Place Order"}
            isLoading={isPlaceOrder}
            onPress={onPlaceOrder}
            bgColor={colors.primary}
            textColor={colors.white}
          />
        </View>
      )}
      {isPlaceOrder && <AbsoluateView />}

      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
      />

      <CustomAlertModal
        buttonTitle={token != null ? "Go to orders" : "Back to Home"}
        modalVisible={isOrderPlaceVisible}
        icon={images.congrat}
        title={`Order ${orderId}`}
        des={
          token != null
            ? "Thank you for shopping with Readings. We have received your order. You can check the status of your order in the orders tab."
            : " Thank you for shopping with Readings. We have received your order and will notify you via email once it has been dispatched"
        }
        setModalVisible={setIsOrderPlaceVisible}
        onBackdropPress={() => {
          setIsOrderPlaceVisible(false);

          setTimeout(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: "BottomTab",
                    params: { screen: token != null ? "Orders" : "Home" },
                  },
                ],
              })
            );
          }, 500);
        }}
        onPress={() => {
          setIsOrderPlaceVisible(false);

          setTimeout(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: "BottomTab",
                    params: { screen: token != null ? "Orders" : "Home" },
                  },
                ],
              })
            );
          }, 500);
        }}
      />
    </>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  subtotalContainer: {
    backgroundColor: colors.white,
    padding: scale(15),
    borderRadius: scale(10),
    gap: verticalScale(15),
    marginTop: verticalScale(-7),
  },
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
  promoContainer: {
    width: "100%",
    height: verticalScale(39),
    backgroundColor: colors.white,
    borderRadius: scale(10),
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    marginTop: verticalScale(-7),
  },
  promoInput: {
    fontSize: 14,
    flex: 1,
    paddingHorizontal: scale(10),
    paddingVertical: 0, // Adjust as needed for centering
    fontFamily: font.WorkSans_Light,
    fontWeight: "500",
    color: colors.black,
  },
  promoButton: {
    width: scale(80),
    height: "100%",
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutTotalContainer: {
    width: "100%",
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(30),
    backgroundColor: colors.dull_white,
    alignItems: "center",
    gap: scale(10),
  },
  billingCheckBox: {
    width: scale(17),
    height: scale(17),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(5),
    borderColor: colors.grey,
  },
});
