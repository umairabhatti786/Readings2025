import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import CustomHeader from "../../../components/CustomHeader";
import { colors } from "../../../utils/colors";
import { cartData } from "../../../utils/Data";
import CartContainer from "./CartContainer";
import CustomText from "../../../components/CustomText";
import { appStyles } from "../../../utils/AppStyles";
import { font } from "../../../utils/font";
import CustomButton from "../../../components/CustomButton";
import { windowHeight, windowWidth } from "../../../utils/Dimensions";
import { images } from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import {
  getGuestToken,
  getIsAddToCart,
  getIsCartLoading,
  getToken,
  setIsAddCartLoading,
  setIsAddToCart,
} from "../../../redux/reducers/authReducer";
import { ApiServices } from "../../../apis/ApiServices";
import LikedCard from "../Liked/LikedCard";
import { LikedLayout } from "../../../utils/Loyout/LikedLayout";
import { useIsFocused } from "@react-navigation/native";
import { STATUS_BAR_HEIGHT } from "../../../utils/CommonHooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CartScreen = ({ navigation }: any) => {
  const [data, setData] = useState<any>([]);
  const token = useSelector(getToken);
  const isCartLoading = useSelector(getIsCartLoading);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const guestToken = useSelector(getGuestToken);
  const focused = useIsFocused();
  const scrollRef = useRef<any>();
  const isAdToCart = useSelector(getIsAddToCart);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const [isMessage, setIsMessage] = useState(false);
  useEffect(() => {
    getCartBooks(); // Run this function on the first visit
  }, []);
  useEffect(() => {
    if (focused) {
      if (isAdToCart) {
        getCartBooks(); // Run this function on the first visit
      }

      // const unsubscribe = navigation.addListener("state", () => {
    }
  }, [focused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      const isFocused = navigation.isFocused();
      if (isFocused) {
        scrollRef.current?.scrollToOffset({ offset: 0, animated: true });

        // Scroll to the top if the tab is pressed again
      }
    });
    return unsubscribe;
  }, [navigation]);

  const getCartBooks = () => {
    let params = {
      page: 1,
      token: token != null ? token : guestToken,
    };
    // setHasMoreData(true);
    ApiServices.GetOrderCart(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);

        setSubtotal(result?.data?.summary?.net_amount)
        if (
          result?.data?.availableBooks ||
          result?.data?.outOfStockBooks ||
          result?.data?.onDemandBooks ||
          result?.data?.preOrderBooks
        ) {
          setData([
            ...(result?.data?.availableBooks || []), // Spread availableBooks if exists, otherwise empty array
            ...(result?.data?.outOfStockBooks || []), // Spread outOfStockBooks if exists, otherwise empty array
            ...(result?.data?.preOrderBooks || []), // Spread preOrderBooks if exists, otherwise empty array
            ...(result?.data?.onDemandBooks || []), // Spread onDemandBooks if exists, otherwise empty array
          ]);
          dispatch(setIsAddToCart(false));
          dispatch(setIsAddCartLoading(false));
          // setTimeout(() => {
          //   setLoading(true)

          // }, 500);
        } else {
          dispatch(setIsAddCartLoading(false));

          if (token) {
            setMessage(result?.error);
            setIsMessage(true);
          }
        }
      } else {
        dispatch(setIsAddCartLoading(false));

        setMessage("Something went wrong");
        setIsMessage(true);
      }
    });
  };

  const renderOrdersItem = ({ item }: any) => {
    return (
      <LikedCard
        isCart={true}
        setSubtotal={setSubtotal}
        subtotal={subtotal}
        onIsLiked={(id: any) => {
          let likedData = [...data];
          let filterData = data.filter((it: any) => it?.cart_item_id != id);
          console.log("filterDatalength", id);
          setData(filterData);
        }}
        // onPress={() =>
        //   navigation.navigate("BookDetailScreen", { Book_id: item?.Book_Id })
        // }
        data={item}
      />
    );
  };
  return (
    <>
      <SafeAreaView
        style={{
          gap: verticalScale(15),
          flex: 1,
          backgroundColor: colors.dull_white,
        }}
      >
        {isCartLoading ? (
          <View
          
          >
            <LikedLayout />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              data={data}
              ref={scrollRef}
              scrollEnabled={data?.length > 0 ? true : false}
              contentContainerStyle={{
                gap: verticalScale(15),
                paddingBottom: verticalScale( Platform.OS=="ios"?370: 340),
                paddingHorizontal: scale(20),
                paddingTop: verticalScale(Platform.OS == "ios" ? 45 : 45),
              }}
              renderItem={renderOrdersItem}
              ListEmptyComponent={
                <View
                  style={{
                    height: windowHeight,
                    alignItems: "center",
                    marginTop: verticalScale(50),
                  }}
                >
                  <Image
                    style={{
                      width: windowWidth / 1.1,
                      height: windowHeight / 2.2,
                    }}
                    resizeMode="contain"
                    source={images.empty_cart}
                  />
                  <CustomText
                    text={"You haven’t added any books to the cart section."}
                    size={14}
                    style={{ width: windowWidth / 1.5, textAlign: "center" }}
                    fontWeight="500"
                    color={colors.black}
                  />
                </View>
              }
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />

{!isCartLoading && (
          <CustomHeader
            containerStyle={{
              backgroundColor: "rgba(243, 245, 247, 0.9)", // Semi-transparent background,
              height: Platform.OS == "ios" ? verticalScale(35) : 50,
              width: "100%",
              position: "absolute",
              top: 0,
              paddingHorizontal: scale(20),
              paddingTop: verticalScale(Platform.OS == "ios" ? 0 : 0),
            }}
          />
        )}

          </View>
        )}
        {!isCartLoading && (
          <>
            {data?.length > 0 && (
              <View
                style={{
                  gap: verticalScale(10),
                  paddingHorizontal: scale(20),
                  backgroundColor: "rgba(243, 245, 247, 0.9)", // Semi-transparent background,
                  display: "flex",
                  paddingVertical: verticalScale(10),
                  width: "100%",
                  position: "absolute",
                  // bottom: verticalScale(Platform.OS=="ios"?75: 55),
                  bottom: Platform.OS=="ios"?verticalScale(75) : insets.bottom+70

                }}
              >
                <View
                  style={{
                    ...appStyles.rowjustify,
                    ...styles.detailContainer,
                  }}
                >
                  <CustomText text={"Subtotal"} size={12} color={colors.grey} />

                  <CustomText
                    text={`Rs. ${subtotal}`}
                    size={14}
                    fontWeight={"600"}
                    fontFam={font.WorkSans_SemiBold}
                    color={colors.black}
                  />
                </View>
                <CustomButton
                  text="Checkout"
                  onPress={() => navigation.navigate("CheckoutScreen")}
                />
              </View>
            )}
          </>
        )}

       
      </SafeAreaView>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  detailContainer: {
    height: verticalScale(39),
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: scale(10),
    paddingHorizontal: scale(10),
  },
});
