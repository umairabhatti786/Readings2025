import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import TopHeader from "../../../components/TopHeader";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import { colors } from "../../../utils/colors";
import { appStyles } from "../../../utils/AppStyles";
import CustomButton from "../../../components/CustomButton";
import OrderDetailCard from "./OrderDetailCard";
import CustomToast from "../../../components/CustomToast";
import { ApiServices } from "../../../apis/ApiServices";
import { useSelector } from "react-redux";
import { getGuestToken, getToken } from "../../../redux/reducers/authReducer";
import ScreenLoader from "../../../components/Screenloader";
import moment from "moment";
import { images } from "../../../assets/images";
import * as Animatable from "react-native-animatable";
import { getOrderStatusText } from "../../../utils/CommonHooks";
import AddressCard from "../../../components/AddressCard";
import { OrderProgressLayout } from "../../../utils/Loyout/OrderProgressLayout";
import ShippingAddressCard from "../../../components/AddressCard/ShippingAddressCard";

const OrderDetailScreen = ({ route, navigation }: any) => {
  const item = route?.params?.item;
  console.log("itemitem", item);
  const [orderContent, setOrderContent] = useState([]);
  const [inStockBooks, setInStockBooks] = useState(item?.inStockBooks);
  const [outOfStockBooks, setOutOfStockBooks] = useState(item?.outOfStockBooks);
  const [preOrderBooks, setPreOrderBooks] = useState(item?.preOrderBooks);
  const [onDemandBooks, setOnDemandBooks] = useState(item?.onDemandBooks);
  const [isCollapsibProgress, setIsCollapsibProgress] = useState(false);
  const [isOrderStatusLoading, setIsOrderStatusLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    Address: item?.shippingAddress?.Address,
    City: item?.shippingAddress?.City,
    Country: item?.shippingAddress?.Country,
    Phone: item?.shippingAddress?.Phone,
    PostCode: item?.shippingAddress?.PostCode,
    Name: item?.shippingAddress?.Name,
  });
  const [subtotal, setSubtotal] = useState(0);

  // const []

  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const token = useSelector(getToken);
  const [loading, setLoading] = useState(false);
  const guestToken = useSelector(getGuestToken);
  const [orderProgress, setOrderProgress] = useState([]);
  useEffect(() => {
    getFormatData();
  }, []);
  console.log("subtotal",subtotal)
  // "courier": "daewoo",
  // useEffect(() => {
  //   if (item?.courier == "daewoo" && item?.status == 4) {
  //     getDaewooOrder();
  //   } else if (item?.courier == "postex" && item?.status == 4) {
  //     getPakPostOrder();
  //   }
  //   // getFormatData();
  // }, []);

  const bookCategories = [
    { books: inStockBooks, label: "In Stock - Ready for Dispatch" },
    { books: outOfStockBooks, label: "Out of Stock" },
    { books: preOrderBooks, label: "Pre Orders" },
    { books: onDemandBooks, label: "On Demand" },
  ];

  const availableCategories = bookCategories.filter(
    (category) => category.books.length > 0
  );

  const getPostexOrder = () => {
    console.log("ckdbckbdc", item);
    setIsOrderStatusLoading(true);

    let params = {
      id: item?.tracking_id,
    };
    // setHasMoreData(true);
    ApiServices.GetPotexOrder(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        console.log("Postex", result?.dist?.transactionStatusHistory);
        const transformBookingDetails = (result: any) => {
          const updated = result?.dist?.transactionStatusHistory.map((item) => {
            const dateTime = moment(item.modifiedDatetime);
            console.log("ckdnckdn", item.transactionStatusMessage);
            return {
              ...item,
              date: dateTime.format("DD MMM YYYY"), // e.g., 27 Jun 2025
              time: dateTime.format("h:mm A"), // e.g., 4:50 PM
              deliveryStatus: item.transactionStatusMessage,
            };
          });

          return updated;
        };
        const updatedData: any = transformBookingDetails(result);
        setOrderProgress(updatedData);
        setIsOrderStatusLoading(false);

        console.log("OrderResultcdcd", updatedData);
      } else {
        setLoading(false);
        setIsOrderStatusLoading(false);
        setMessage("Something went wrong");
        setIsMessage(true);
      }
    });
  };
  const getDaewooOrder = () => {
    setIsOrderStatusLoading(true);

    let params = {
      id: item?.tracking_id,
    };
    // setHasMoreData(true);
    ApiServices.GetDaewooOrder(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        const transformBookingDetails = (result: any) => {
          const booking = result?.BookingDetails?.bookingstatusDetail || [];
          const tracking = result?.BookingDetails?.hdTrackingDetail || [];

          const merged = [...booking, ...tracking];

          const updated = merged.map((item) => {
            const [date, time] = item.dateTime.split(" ");
            return {
              ...item,
              date: moment(date, "DD/MM/YYYY").format("DD MMM YYYY"),
              time: moment(time, "HH:mm").format("h:mm A"),
              deliveryStatus: item.status,
            };
          });

          return updated;
        };
        const updatedData: any = transformBookingDetails(result);
        const reversedArray = updatedData.reverse();

        setOrderProgress(reversedArray);
        console.log("OrderResultcdcd", updatedData);
        setIsOrderStatusLoading(false);
      } else {
        setLoading(false);
        setIsOrderStatusLoading(false);

        setMessage("Something went wrong");
        setIsMessage(true);
      }
    });
  };

  console.log("item", item);
  const OrderContentContainer = ({ title, books }: any) => {

    useEffect(()=>{

      const total = books
      .map((it) => Number(it.price) || 0) // extract amount safely
      .reduce((acc, curr) => acc + curr, 0); // sum amounts
      setSubtotal(total)


    },[])

    return (
      <View style={{ gap: verticalScale(8), flex: 1 }}>
        <View style={{ marginBottom: verticalScale(15) }}>
          <CustomText
            text={title}
            color={colors.black}
            textTransform={"capitalize"}
            fontWeight="600"
            style={{
              marginBottom: verticalScale(7),
              marginTop: verticalScale(5),
            }}
            fontFam={font.WorkSans_SemiBold}
            size={14}
          />
          <View>
            <FlatList
              data={books}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                gap: verticalScale(5),
              }}
              renderItem={({ item, index }: any) => {
                return <OrderDetailCard 
                // setSubtotal={setSubtotal}
                key={index.toString()} data={item} />;
              }}
            />
          </View>
        </View>
      </View>
    );
  };
  const onCancelOrder = () => {
    setLoading(true);
    let params = {
      page: 1,
      token: token != null ? token : guestToken,
      id: item?.n_order_id,
    };
    // setHasMoreData(true);
    ApiServices.CancelOrder(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        // setProcessingOrders(result?.data?.processingOrders);
        // setOrdersHistory(result?.data?.lastSixMonthsOrders)
        setLoading(false);
        console.log("OrderResult", result);
        navigation.goBack();

        // if (
        //   result?.data?.availableBooks ||
        //   result?.data?.outOfStockBooks ||
        //   result?.data?.outOfStockBooks ||
        //   result?.data?.preOrderBooks
        // ) {
        //   setData([
        //     ...(result?.data?.availableBooks || []), // Spread availableBooks if exists, otherwise empty array
        //     ...(result?.data?.outOfStockBooks || []), // Spread outOfStockBooks if exists, otherwise empty array
        //     ...(result?.data?.preOrderBooks || []), // Spread preOrderBooks if exists, otherwise empty array
        //   ]);
        //   setLoading(false);
        // } else {
        //   setLoading(false);
        //   if (token) {
        //     setMessage(result?.error);
        //     setIsMessage(true);
        //   }
        // }
      } else {
        setLoading(false);
        setMessage("Something went wrong");
        setIsMessage(true);
      }
    });
  };

  const getTrackOrderButtonState = (
    status: number
  ): { disabled: boolean; label: string; isEnable: boolean;opacity:number } => {
    switch (status) {
      case 4:
        return { disabled: false, label: "Track", isEnable: true, opacity:1 }; // Button enabled
      case 6:
        return { disabled: true, label: "Track", isEnable: true,opacity:0.5 }; // Button disabled
        case 7:
          return { disabled: true, label: "Sent to the Publisher", isEnable: true,opacity:0.5 }; // Button disabled
        case 8:
          return { disabled: true, label: "Awaiting Shipment", isEnable: true,opacity:0.5 }; // Button disabled

      default:
        return { disabled: true, label: "Cancel Order", isEnable: false, opacity:0.5 }; // Fallback
    }
  };
  const getCancelOrderButtonState = (
    status: number
  ): { disabled: boolean; label: string; isEnable: boolean; opacity:number } => {
    switch (status) {
      case 1:
        return { disabled: false, label: "Cancel Order", isEnable: true, opacity:1 }; // Button enabled
      case 2:
      case 3:
        return { disabled: true, label: "Cancel Order", isEnable: true ,opacity:0.5}; // Button disabled
      case 5:
        return { disabled: true, label: "Cancelled", isEnable: true ,opacity:0.5}; // Button disabled, label changed
      default:
        return { disabled: true, label: "Cancel Order", isEnable: false, opacity:0.5}; // Fallback
    }
  };
  const CancelOrderStatus = getCancelOrderButtonState(item?.status);
  const TrackOrderStatus = getTrackOrderButtonState(item?.status);

  const getFormatData = () => {

 
    
  };
  return (
    <>
      <ScreenLayout
        style={{
          paddingHorizontal: scale(20),
        }}
      >
        <View
          style={{
            paddingBottom: verticalScale(10),
          }}
        >
          <TopHeader title="Order Details" />
        </View>
        <ScrollView
          style={{ ...appStyles.main, paddingTop: verticalScale(10) }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: verticalScale(20),
            // gap: verticalScale(10),
          }}
        >
          <View>
            <CustomText
              text={`ORDER ${item?.n_order_id}`}
              fontWeight="600"
              style={{ textAlign: "center" }}
              fontFam={font.WorkSans_SemiBold}
              size={17}
            />
            <View style={appStyles.rowjustify}>
              <CustomText
                text={`Order Status`}
                fontFam={font.WorkSans_SemiBold}
                style={{ marginVertical: verticalScale(10) }}
                size={14}
              />
              <CustomText
                text={`${getOrderStatusText(item?.status).title}`}
                fontFam={font.WorkSans_SemiBold}
                style={{ marginVertical: verticalScale(10) }}
                size={14}
              />
            </View>

            <CustomText
                text={"Shipping Address"}
                fontFam={font.WorkSans_SemiBold}
                style={{ marginBottom: verticalScale(10) }}
                size={14}
              />

            {Object.keys(shippingAddress).length > 0 && (
              <ShippingAddressCard width={"100%"} 
              data={shippingAddress} />
            )}

            {item?.status == 4 && item?.courier != "pakpost" && (
              <View
                style={{
                  marginVertical: verticalScale(10),
                  gap: verticalScale(10),
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    console.log("cdlmcld", item?.courier);
                    if (isCollapsibProgress) {
                      setIsCollapsibProgress(false);

                      return;
                    }

                    if (item?.courier == "daewoo") {
                      setIsCollapsibProgress(true);
                      getDaewooOrder();

                      return;
                    }
                    if (item?.courier == "postex") {
                      setIsCollapsibProgress(true);
                      getPostexOrder();

                      return;
                    }
                    // if (item?.courier == "pakpost") {
                    //   navigation.navigate("LiveOrderTrackingScreen",{tracking_id: item?.tracking_id});

                    //   return;
                    // }
                  }}
                  style={{ ...appStyles.rowjustify, gap: scale(10) }}
                >
                  <CustomText
                    text={"Track Your Order"}
                    fontWeight="600"
                    fontFam={font.WorkSans_SemiBold}
                    size={15}
                  />
                  <Image
                    style={{
                      width: scale(18),
                      height: scale(18),
                      tintColor: colors.black,
                    }}
                    source={images.down_arrow}
                  />
                </TouchableOpacity>
                {isCollapsibProgress && (
                  <Animatable.View
                    duration={1000}
                    animation={"fadeIn"}
                    delay={100}
                    // style={{
                    //   gap: verticalScale(10),
                    //   marginTop: verticalScale(-5),
                    // }}
                  >
                    <View
                      style={{
                        width: "100%",
                        height: verticalScale(0.3),
                        backgroundColor: colors.dark_grey,
                        marginBottom: verticalScale(10),
                      }}
                    />
                    {isOrderStatusLoading ? (
                      <>
                        <OrderProgressLayout />
                      </>
                    ) : (
                      <>
                        {orderProgress.map((item: any, index) => {
                          return (
                            <View
                              key={index.toString()}
                              style={{
                                flexDirection: "row",
                                gap: scale(12),
                                marginLeft: scale(5),
                              }}
                            >
                              <View
                                style={{
                                  gap: verticalScale(5),
                                  marginTop: verticalScale(5),
                                }}
                              >
                                <CustomText
                                  text={item?.date}
                                  fontWeight="600"
                                  fontFam={font.WorkSans_SemiBold}
                                  size={14}
                                />
                                <CustomText
                                  text={item?.time}
                                  fontWeight="600"
                                  style={{ textAlign: "right" }}
                                  color={colors.grey100}
                                  fontFam={font.WorkSans_SemiBold}
                                  size={14}
                                />
                              </View>
                              <View style={{ alignItems: "center" }}>
                                <View
                                  style={{
                                    width: scale(36),
                                    height: scale(36),
                                    borderRadius: scale(36),
                                    backgroundColor: colors.white,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    elevation: 5, // Android shadow
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: scale(30),
                                      height: scale(30),
                                      resizeMode: "contain",
                                      // tintColor: colors.black,
                                    }}
                                    source={images.logo}
                                  />
                                </View>
                                {orderProgress.length - 1 !== index && (
                                  <View
                                    style={{
                                      width: scale(1),
                                      height: verticalScale(40),
                                      backgroundColor: colors.grey100,
                                    }}
                                  />
                                )}
                              </View>

                              <View
                                style={{
                                  gap: verticalScale(5),
                                  marginTop: verticalScale(10),
                                  width: "55%",
                                  // backgroundColor:"red"
                                }}
                              >
                                <CustomText
                                  text={item?.deliveryStatus}
                                  fontWeight="600"
                                  numberOfLines={1}
                                  // style={{width:"80%"}}
                                  fontFam={font.WorkSans_SemiBold}
                                  size={14}
                                />
                              </View>
                            </View>
                          );
                        })}
                      </>
                    )}
                  </Animatable.View>
                )}

                {/* <Collapsible
                  collapsed={isCollapsibProgress}
                  // style={{gap:verticalScale(10)}}
                >
                  <View
                    style={{
                      width: "100%",
                      height: verticalScale(0.3),
                      backgroundColor: colors.dark_grey,
                      marginBottom: verticalScale(10),
                    }}
                  />
                  {orderProgress.map((item: any, index) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          gap: scale(12),
                          marginLeft: scale(5),
                        }}
                      >
                        <View
                          style={{
                            gap: verticalScale(5),
                            marginTop: verticalScale(5),
                          }}
                        >
                          <CustomText
                            text={item?.date}
                            fontWeight="600"
                            fontFam={font.WorkSans_SemiBold}
                            size={14}
                          />
                          <CustomText
                            text={item?.time}
                            fontWeight="600"
                            style={{ textAlign: "right" }}
                            color={colors.grey100}
                            fontFam={font.WorkSans_SemiBold}
                            size={14}
                          />
                        </View>
                        <View style={{ alignItems: "center" }}>
                          <View
                            style={{
                              width: scale(36),
                              height: scale(36),
                              borderRadius: scale(36),
                              backgroundColor: colors.white,
                              alignItems: "center",
                              justifyContent: "center",
                              elevation: 5, // Android shadow
                              shadowColor: "#000",
                              shadowOffset: { width: 0, height: 2 },
                              shadowOpacity: 0.25,
                              shadowRadius: 3.84,
                            }}
                          >
                            <Image
                              style={{
                                width: scale(30),
                                height: scale(30),
                                resizeMode: "contain",
                                // tintColor: colors.black,
                              }}
                              source={images.logo}
                            />
                          </View>
                          {orderProgress.length - 1 !== index && (
                            <View
                              style={{
                                width: scale(1),
                                height: verticalScale(40),
                                backgroundColor: colors.grey100,
                              }}
                            />
                          )}
                        </View>

                        <View
                          style={{
                            gap: verticalScale(5),
                            marginTop: verticalScale(10),
                            width:"55%",
                            // backgroundColor:"red"
                          }}
                        >
                          <CustomText
                            text={item?.deliveryStatus}
                            fontWeight="600"
                            numberOfLines={1}
                            // style={{width:"80%"}}
                            fontFam={font.WorkSans_SemiBold}
                            size={14}
                          />
                        </View>
                      </View>
                    );
                  })}
                </Collapsible> */}
              </View>
            )}
          </View>

          {/* <OrderTrackingCard /> */}

          <View
            style={{
              gap: verticalScale(8),
              marginTop: verticalScale(10),
            }}
          >
            {availableCategories.map((category, index) => (
              <OrderContentContainer
                key={index}
                title={`Part ${index + 1} of ${availableCategories.length} (${
                  category.label
                })`}
                books={category.books}
              />
            ))}

            {/* {inStockBooks.length > 0 && (
              <OrderContentContainer
              title={`Part 1 of ${outOfStockBooks.length > 0?"2":"1"} (In Stock - ready for dispatch)`}
              books={inStockBooks}
              />
            )}

          
            {outOfStockBooks.length > 0 && (
              <OrderContentContainer
                title="Part 2 of 2 (Out of Stock)"
                books={outOfStockBooks}
              />
            )}
            {preOrderBooks.length > 0 && (
              <OrderContentContainer
                title="Part 3 of 3 (Pre Orders)"
                books={preOrderBooks}
              />
            )}
             {onDemandBooks.length > 0 && (
              <OrderContentContainer
                title="Part 3 of 3 (Pre Orders)"
                books={onDemandBooks}
              />
            )} */}

            <View style={styles.subtotalContainer}>
              <View style={{ ...appStyles.rowjustify }}>
                <CustomText text={"Subtotal"} color={colors.black} size={14} />
                <CustomText
                //  text={`Rs. ${
                //   subtotal
                // }`}
                  text={`Rs. ${
                    Number(item?.total_amount) - Number(item?.deliveryFee)
                  }`}
                  color={colors.black}
                  size={14}
                />
              </View>
              <View style={{ ...appStyles.rowjustify }}>
                <CustomText text={"Discounts"} color={colors.black} size={14} />
                <CustomText text={"Rs.00"} color={colors.black} size={14} />
              </View>
              <View style={{ ...appStyles.rowjustify }}>
                <CustomText
                  text={"Shipping (Standard)"}
                  color={colors.black}
                  size={14}
                />
                <CustomText
                  text={`Rs.${Number(item?.deliveryFee)}`}
                  color={colors.black}
                  size={14}
                />
              </View>

              <View style={{ ...appStyles.rowjustify }}>
                <CustomText
                  fontWeight="600"
                  fontFam={font.WorkSans_SemiBold}
                  text={"Total"}
                  color={colors.black}
                  size={20}
                />
                <CustomText
                  fontWeight="600"
                  fontFam={font.WorkSans_SemiBold}
                  text={`Rs.${item?.total_amount}`}
                  color={colors.black}
                  size={20}
                />
              </View>
            </View>
          </View>

          {/* {item?.status == 5 && (
            <CustomButton
              text="Apply"
              style={{ marginTop: verticalScale(20) }}
            />
          )} */}

          {/* {item?.status != 5 && (
            <View
              style={{ ...appStyles.rowjustify, marginTop: verticalScale(20) }}
            >
              <CustomButton
                text="Track"
                onPress={() => navigation.navigate("LiveOrderTrackingScreen")}
                width={"48%"}
                // style={{ marginBottom: verticalScale(30) }}
              />
              <CustomButton
                bgColor={colors.red}
                onPress={() => {
                  Alert.alert(
                    "Confirmation",
                    "Are You Sure You Want To Cancel This Order?",
                    [
                      {
                        text: "No",
                        style: "cancel",
                      },
                      {
                        text: "Yes",
                        onPress: async () => {
                          onCancelOrder();
                        },
                      },
                    ]
                  );
                }}
                text="Cancel Order"
                width={"48%"}
                // style={{ marginBottom: verticalScale(30) }}
              />
            </View>
            // <TouchableOpacity
            // activeOpacity={0.3}
            // onPress={()=>{
            //   Alert.alert(
            //     "Confirmation",
            //     "Are You Sure You Want To Cancel This Order?",
            //     [
            //       {
            //         text: "No",
            //         style: "cancel",
            //       },
            //       {
            //         text: "Yes",
            //         onPress: async () => {
            //           onCancelOrder();
            //         },
            //       },
            //     ]
            //   )

            // }}
            // style={{width:"40%",height:verticalScale(40),alignSelf:"center",}}
            // >
            //    <CustomText
            //         fontWeight="600"
            //         fontFam={font.WorkSans_Medium}
            //         text={"Cancel Order"}
            //         style={{textAlign:"center"}}
            //         textDecorationLine="underline"
            //         color={colors.red}
            //         size={18}
            //       />

            // </TouchableOpacity>
          )} */}
        </ScrollView>

        <View style={styles.bottomContainer}>
          {TrackOrderStatus?.isEnable && (
            <CustomButton
              text="Track"
              style={{opacity:TrackOrderStatus?.opacity}}
            
              disable={TrackOrderStatus?.disabled}
              onPress={() => {
                if (isCollapsibProgress) {
                  setIsCollapsibProgress(false);

                  return;
                }
                if (item?.courier == "daewoo") {
                  setIsCollapsibProgress(true);
                  getDaewooOrder();

                  return;
                }
                if (item?.courier == "postex") {
                  setIsCollapsibProgress(true);
                  getPostexOrder();

                  return;
                }
                if (item?.courier == "pakpost") {
                  navigation.navigate("LiveOrderTrackingScreen", {
                    tracking_id: item?.tracking_id,
                  });

                  return;
                }
              }}
              // width={"48%"}
              // style={{ marginBottom: verticalScale(30) }}
            />
          )}
          {CancelOrderStatus.isEnable && (
            <CustomButton
            style={{opacity:CancelOrderStatus?.opacity}}

              bgColor={colors.red}
              disable={CancelOrderStatus.disabled}
              onPress={() => {
                Alert.alert(
                  "Confirmation",
                  "Are You Sure You Want To Cancel This Order?",
                  [
                    {
                      text: "No",
                      style: "cancel",
                    },
                    {
                      text: "Yes",
                      onPress: async () => {
                        onCancelOrder();
                      },
                    },
                  ]
                );
              }}
              text={CancelOrderStatus.label}
              width={"100%"}
              // style={{ marginBottom: verticalScale(30) }}
            />
          )}
        </View>
      </ScreenLayout>

      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        color={colors.white}
      />
      {loading && <ScreenLoader />}
    </>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  subtotalContainer: {
    backgroundColor: colors.white,
    padding: scale(15),
    borderRadius: scale(10),
    gap: verticalScale(12),
  },

  bottomContainer: {
    width: "100%",
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(30),
    backgroundColor: colors.dull_white,
    alignItems: "center",
    gap: scale(10),
  },
});
