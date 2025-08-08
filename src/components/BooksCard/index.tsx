import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { appStyles } from "../../utils/AppStyles";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import { colors } from "../../utils/colors";
import { windowWidth } from "../../utils/Dimensions";
import { images } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import {
  getGuestToken,
  getToken,
  setGuestToken,
  setIsAddCartLoading,
  setIsAddToCart,
} from "../../redux/reducers/authReducer";
import { ApiServices } from "../../apis/ApiServices";
import { sessionCheck } from "../../utils/CommonHooks";
import { GUESTTOKEN, StorageServices } from "../../utils/StorageService";
import Share from "react-native-share";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import FastImage from "react-native-fast-image";

interface data {
  title?: string;
  auther?: string;
  listPrice?: string;
  appPrice?: string;
  book?: any;
  discount?: any;
  quantity?: any;
  inStock?: any;
  isInWishlist?: any;
  book_Id?: any;
  isInCart?: any;
}
type Props = {
  data: data;
  onPress?: any;
  setMessage?: any;
  setIsMessage?: any;
};

const BooksCard = ({ data, onPress, setMessage, setIsMessage }: Props) => {
  const navigation: any = useNavigation();
  const [isWishlist, setIsWishlist] = useState<boolean>(data?.isInWishlist);
  const [isInCart, setIsInCart] = useState<boolean>(data?.isInCart);
  const [bookPriceData, setBookPriceData] = useState<any>();
  console.log("cdknkcd", bookPriceData?.convertedPrice);
  const token = useSelector(getToken);
  const guestUserToken = useSelector(getGuestToken);
  const [priceLoading, setPriceLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsWishlist(data?.isInWishlist);
    setIsInCart(data?.isInCart);
    // getConvertedPrice();
  }, []);

  const getConvertedPrice = () => {
    setPriceLoading(true);
    ApiServices.ConvertBookPrice(
      data?.book_Id,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          setBookPriceData(result?.data);
          setPriceLoading(false);
        } else {
          setPriceLoading(false);
        }
      }
    );
  };
  const onWishlist = () => {
    var raw = JSON.stringify({
      bookId: data?.book_Id,
    });

    if (isWishlist) {
      let params = {
        id: data?.book_Id,
        token: token?.length != 0 ? token : guestUserToken,
      };
      ApiServices.DeleteWishlist(
        params,
        async ({ isSuccess, response }: any) => {
          if (isSuccess) {
            let result = JSON.parse(response);
            if (result?.success) {
              setIsWishlist(false);
            } else {
              Alert.alert("", result?.error);
            }
          } else {
            Alert.alert("", "Something went wrong");
          }
        }
      );
    } else {
      let params = {
        data: raw,
        token: token,
      };
      ApiServices.SaveWishlist(params, async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.success) {
            setIsWishlist(true);
          } else {
            Alert.alert("", result?.error);
          }
        } else {
          Alert.alert("", "Something went wrong");
        }
      });
    }
  };

  const onAddToCart = () => {
    let Data = {
      Book_Id: data?.book_Id,
      cart_type: 1,
      quantity: 1,
    };
    var raw = JSON.stringify(Data);
    let params = {
      data: raw,
      token: token != null ? token : guestUserToken,
    };
    console.log("params", params);
    ApiServices.AddToCartItem(
      params,
      async ({ isSuccess, response, guestToken }: any) => {
        if (isSuccess) {
          if (guestToken != null && !guestUserToken) {
            StorageServices.setItem(GUESTTOKEN, guestToken);
            dispatch(setGuestToken(guestToken));
          }
          let result = JSON.parse(response);
          if (result?.success) {
            setIsInCart?.(true);
            // Alert.alert("","Added to orders")
            setMessage?.("Added to orders");
            setIsMessage?.(true);
            dispatch(setIsAddToCart(true));
            dispatch(setIsAddCartLoading(true));

            // setIsAddToCart(true);
          } else {
            if (result?.error == "Invalid token") {
              sessionCheck(dispatch, navigation);

              return;
            }
            // setIsAddToCart(false);

            setMessage(result?.error);
            setIsMessage(true);
          }
        } else {
          // setIsAddToCart(false);

          setMessage("Something went wrong");
          setIsMessage(true);
        }
      }
    );
  };

  const onShare = async () => {
    console.log("DataCase", data);
    try {
      const profileUrl = `${"https://main.d3cyv6aeh0n2or.amplifyapp.com"}/book/${
        data?.book_Id
      }`;

      if (profileUrl) {
        const options = {
          message: `Check out this book on Readings`,
          url: profileUrl,
        };
        await Share.open(options);
      }
    } catch (e) {
      console.log("eee", e);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        width: windowWidth / 1.9,
        borderRadius: scale(10),
        overflow: "hidden",
        backgroundColor: colors.white,
        // height: verticalScale(232),
      }}
    >
    <View style={styles.bookImage}>
  {/* Background image */}
  <FastImage
    source={{ uri: data?.book, priority: FastImage.priority.normal }}
    style={StyleSheet.absoluteFill}
    resizeMode={FastImage.resizeMode.cover} // or .contain if preferred
  />

  {/* Optional white overlay */}
  <View
    style={{
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.white,
      opacity: 0.7,
    }}
  />

  {/* Foreground thumbnail or content */}
  <FastImage
    source={{ uri: data?.book, priority: FastImage.priority.normal }}
    style={{
      width: scale(60),
      height: verticalScale(73),
      borderRadius: scale(7),
    }}
    resizeMode={FastImage.resizeMode.contain}
  />
</View>
      <View
        style={{
          padding: scale(10),
          flex: 1,
          gap: verticalScale(5),
        }}
      >
        <View style={{ paddingTop: verticalScale(3), marginRight: scale(10) }}>
          <CustomText
            text={`${data?.title}`}
            textTransform={"capitalize"}
            color={colors.black}
            numberOfLines={1}
            fontWeight="600"
            fontFam={font.WorkSans_SemiBold}
            size={14}
          />

          <CustomText
            text={`${data?.auther}`}
            textTransform={"capitalize"}
            numberOfLines={1}
            color={colors.grey}
            size={12}
          />
        </View>
        <View style={{ ...appStyles.rowjustify, paddingTop: verticalScale(5) }}>
          <CustomText text={"List Price"} color={colors.grey} size={12} />
          <CustomText
              textDecorationLine={data.discount > 0 ? "line-through" : "nunu"}
              text={data?.listPrice}
              // text={
              //   Object.keys(bookPriceData || {}).length > 0
              //     ? bookPriceData?.originalCurrency == "Rs"
              //       ? `${bookPriceData?.originalCurrency} ${Math.floor(
              //           bookPriceData?.convertedPrice
              //         )}`
              //       : `${bookPriceData?.originalCurrency} ${
              //           bookPriceData?.originalPrice
              //         } = ${Math.floor(bookPriceData?.convertedPrice)}`
              //     : 0
              // }
              color={colors.grey}
              size={12}
            />
          {/* {priceLoading ? (
            <SkeletonPlaceholder
              // speed={00}
              highlightColor="rgb(222, 226, 230)"
              backgroundColor="#e9ecef" // Set the main background color of the skeleton
            >
              <View
                style={{
                  borderRadius: scale(5),
                  width: scale(80),
                  height: verticalScale(10),
                }}
              ></View>
            </SkeletonPlaceholder>
          ) : (
            <CustomText
              textDecorationLine={data.discount > 0 ? "line-through" : "nunu"}
              text={data?.listPrice}
              // text={
              //   Object.keys(bookPriceData || {}).length > 0
              //     ? bookPriceData?.originalCurrency == "Rs"
              //       ? `${bookPriceData?.originalCurrency} ${Math.floor(
              //           bookPriceData?.convertedPrice
              //         )}`
              //       : `${bookPriceData?.originalCurrency} ${
              //           bookPriceData?.originalPrice
              //         } = ${Math.floor(bookPriceData?.convertedPrice)}`
              //     : 0
              // }
              color={colors.grey}
              size={12}
            />
          )} */}
        </View>

        <View style={appStyles?.rowjustify}>
          <CustomText text={"Our Price"} color={colors.grey} size={12} />
          <CustomText
            text={`Rs ${data?.appPrice}`}
            color={colors.orange}
            fontWeight="600"
            fontFam={font.WorkSans_SemiBold}
            size={14}
          />
        </View>

        <CustomText
          text={data?.inStock}
          numberOfLines={1}
          color={data?.inStock == "In Stock" ? colors.green : colors.red}
          size={12}
        />
        <View style={{ ...appStyles.rowjustify, marginTop: verticalScale(4) }}>
          <TouchableOpacity style={styles.box} onPress={onWishlist}>
            <Image
              style={{
                ...styles.bookIcons,
                tintColor: isWishlist ? colors.red : colors.grey,
              }}
              source={isWishlist ? images.fill_heart : images.unfill_heart}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onShare} style={styles.box}>
            <Image
              style={styles.bookIcons}
              source={images.share}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // if (!token) {
              //   navigation.navigate("Login");

              //   return;
              // }
              onAddToCart();
            }}
            style={styles.box}
          >
            <Image
              style={{
                ...styles.bookIcons,
                tintColor: isInCart ? colors.primary : colors.grey,
              }}
              source={isInCart ? images.fill_cart : images.unfill_cart}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BooksCard;

const styles = StyleSheet.create({
  box: {
    width: scale(50),
    height: scale(28),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dull_white,
    borderRadius: scale(6),
  },

  bookIcons: {
    width: scale(18),
    height: scale(18),
  },
  bookImage: {
    width: "100%",
    height: verticalScale(100),
    alignItems: "center",
    justifyContent: "center",
  },
});
