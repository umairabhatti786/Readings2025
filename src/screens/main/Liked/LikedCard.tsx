import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { appStyles } from "../../../utils/AppStyles";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import { colors } from "../../../utils/colors";
import { windowWidth } from "../../../utils/Dimensions";
import { images } from "../../../assets/images";
import { URLS } from "../../../apis/Urls";
import { ApiServices } from "../../../apis/ApiServices";
import { useDispatch, useSelector } from "react-redux";
import {
  getGuestToken,
  getToken,
  setGuestToken,
  setIsAddCartLoading,
  setIsAddToCart,
} from "../../../redux/reducers/authReducer";
import { sessionCheck } from "../../../utils/CommonHooks";
import { GUESTTOKEN, StorageServices } from "../../../utils/StorageService";
import Share from "react-native-share";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

interface data {
  title?: string;
  author?: any;
  listPrice?: string;
  appPrice?: string;
  isLike?: boolean;
  book?: any;
  discount?: any;
}
type Props = {
  data?: any;
  isLiked?: any;
  onIsLiked?: any;
  onPress?: () => void;
  isCart?: any;
  setSubtotal?: any;
  subtotal?: any;
  setMessage?: any;
  setIsMessage?: any;
};

const LikedCard = ({
  data,
  onPress,
  isLiked,
  onIsLiked,
  isCart,
  setSubtotal,
  subtotal,
  setMessage,
  setIsMessage,
}: Props) => {
  const [quantity, setQuantity] = useState<any>(data?.cart_qty);
  const dispatch = useDispatch();
  let navigation = useNavigation();
  const [isWishlist, setIsWishlist] = useState<any>();
  const [isInCart, setIsInCart] = useState<boolean>(data?.isInCart);
  const [bookPriceData, setBookPriceData] = useState<any>();
  const [priceLoading, setPriceLoading] = useState(true);

  const token = useSelector(getToken);
  const guestToken = useSelector(getGuestToken);
  const guestUserToken = useSelector(getGuestToken);

  useEffect(() => {
    // if (isCart) {
    //   getSubTotal();
    // }
    getConvertedPrice();
    setIsWishlist(data?.isInWishlist);
  }, []);

  // useEffect(() => {

  //   setIsWishlist(data?.isInWishlist)
  // }, [data]);
  // const getSubTotal = () => {
  //   const newSubtotal =
  //     Number(data?.Discount) > 0
  //       ? Math.floor(
  //           quantity *
  //             (Number(data?.PAK_PRICE) -
  //               Number(data?.PAK_PRICE) * (Number(data?.Discount) / 100))
  //         )
  //       : quantity * Number(data?.PAK_PRICE || 0);

  //   quantity * Number(data?.PAK_PRICE || 0);
  //   setSubtotal((pre) => Number(pre + newSubtotal));
  // };

  const getConvertedPrice = () => {
    setPriceLoading(true);
    ApiServices.ConvertBookPrice(
      data?.Book_Id,
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

  const onShare = async () => {
    console.log("DataCase", data);
    try {
      const profileUrl = `${"https://main.d3cyv6aeh0n2or.amplifyapp.com"}/book/${
        data?.Book_Id
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
  const onWishlist = () => {
    var raw = JSON.stringify({
      bookId: data?.Book_Id,
    });

    if (isWishlist) {
      setIsWishlist(false);

      let params = {
        id: data?.Book_Id,
        token: token,
      };
      ApiServices.DeleteWishlist(
        params,
        async ({ isSuccess, response }: any) => {
          if (isSuccess) {
            let result = JSON.parse(response);
            if (result?.success) {
              if (isLiked) {
                onIsLiked(data?.Book_Id);

                return;
              }
            } else {
              Alert.alert("", result?.error);
            }
          } else {
            Alert.alert("", "Something went wrong");
          }
        }
      );
    } else {
      setIsWishlist(true);

      let params = {
        data: raw,
        token: token,
      };
      ApiServices.SaveWishlist(params, async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.success) {
          } else {
            Alert.alert("", result?.error);
          }
        } else {
          Alert.alert("", "Something went wrong");
        }
      });
    }
  };

  const onDeleteCartItem = () => {
    let params = {
      id: data?.cart_item_id,
      token: token != null ? token : guestUserToken,
    };
    ApiServices.DeleteCartItem(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.success) {
          onIsLiked(data?.cart_item_id);

          const newSubtotal =
            Number(data?.Discount) > 0
              ? quantity *
                Math.floor(
                  Number(data?.PAK_PRICE) -
                    Number(data?.PAK_PRICE) * (Number(data?.Discount) / 100)
                )
              : quantity * Number(data?.PAK_PRICE || 0);

          setSubtotal((prev) => prev - newSubtotal);
        } else {
          Alert.alert("", result?.error);
        }
      } else {
        Alert.alert("", "Something went wrong");
      }
    });
  };

  const onUpdateQuantity = (increment: any) => {
    let item = {
      quantity: increment ? quantity + 1 : quantity - 1,
    };
    var raw = JSON.stringify(item);
    let params = {
      data: raw,
      token: token != null ? token : guestUserToken,
      id: data?.cart_item_id,
    };
    ApiServices.UpdateCartItem(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.success) {
          const newSubtotal =
            Number(data?.Discount) > 0
              ? Math.floor(
                  Number(data?.PAK_PRICE) -
                    Number(data?.PAK_PRICE) * (Number(data?.Discount) / 100)
                )
              : Number(data?.PAK_PRICE || 0);

          console.log("newSubtotalData", newSubtotal);

          setSubtotal((prev) =>
            increment ? prev + newSubtotal : prev - newSubtotal
          );
          setQuantity((prev: any) => (increment ? prev + 1 : prev - 1));
        } else {
          if (result?.error == "Invalid token") {
            sessionCheck(dispatch, navigation);

            return;
          }

          Alert.alert("", result?.error);
          console.log("result", result);
        }
      } else {
        Alert.alert("", "Something went wrong");

        console.log("Response", response);
      }
    });
  };

  const onAddToCart = () => {
    let Data = {
      Book_Id: data?.Book_Id,
      cart_type: 1,
      quantity: 1,
    };
    var raw = JSON.stringify(Data);
    let params = {
      data: raw,
      token: token != null ? token : guestUserToken,
    };
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
            setIsInCart(true);
            setMessage?.("Added to orders");
            setIsMessage?.(true);

            dispatch(setIsAddToCart(true));
            dispatch(setIsAddCartLoading(true));

            // setIsMessage?.(true)

            // setIsAddToCart(true);
          } else {
            if (result?.error == "Invalid token") {
              sessionCheck(dispatch, navigation);

              return;
            }
            // setIsAddToCart(false);

            setMessage(result?.message);
            setIsMessage(true);
            // console.log("resulcdcdcdt", result?.message);
          }
        } else {
          // setIsAddToCart(false);

          setMessage("Something went wrong");
          setIsMessage(true);
          console.log("Response", response);
        }
      }
    );
  };
  return (
    <TouchableOpacity
      // onLayout={(e) =>
      //   console.log("Item height:", e.nativeEvent.layout.height)
      // }
      activeOpacity={0.5}
      disabled={!onPress}
      onPress={onPress}
      style={{
        width: "100%",
        flexDirection: "row",
        borderRadius: scale(15),
        overflow: "hidden",
        backgroundColor: colors.white,
      }}
    >
      <ImageBackground
        style={styles.bookImage}
        resizeMethod="scale"
        resizeMode="stretch"

        source={{ uri: `${URLS.IMAGE_URL}/images/${data?.picname}.webp` }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: colors.white,
            opacity: 0.7,
          }}
        />
        <Image
          style={{
            width: scale(75),
            height: verticalScale(100),
            borderRadius: scale(5),
            overflow: "hidden",
          }}
          source={{ uri: `${URLS.IMAGE_URL}/images/${data?.picname}.webp` }}
          resizeMode="contain"
        />
      </ImageBackground>
      <View
        style={{
          paddingHorizontal: scale(10),
          paddingVertical:verticalScale(7),
          flex: 1,
          gap: verticalScale(5),
        }}
      >
        <View style={{ gap: scale(2), paddingTop: verticalScale(3) }}>
          <CustomText
            text={data?.BOOK_TITLE}
            textTransform={"capitalize"}
            color={colors.black}
            numberOfLines={1}
            fontWeight="600"
            fontFam={font.WorkSans_SemiBold}
            size={14}
          />

          <CustomText
            text={data?.authorName}
            numberOfLines={1}
            textTransform={"capitalize"}
            color={colors.grey}
            size={12}
          />
        </View>
        <View style={{ ...appStyles.rowjustify, paddingTop: verticalScale(5) }}>
          <CustomText text={"List Price"} color={colors.grey} size={13} />

          <CustomText
          textDecorationLine={
            Number(data?.Discount) > 0 ? "line-through" : "nunu"
          }
          
          text={
            data?.currency == "Rs"
              ? `${data?.currency} ${data?.PRICE}`
              : `${data?.currency} ${data?.PRICE}`
          }
          color={colors.black}
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
              textDecorationLine={
                Number(data?.Discount) > 0 ? "line-through" : "nunu"
              }
              text={
                Object.keys(bookPriceData || {}).length > 0
                  ? bookPriceData?.originalCurrency == "Rs"
                    ? `${bookPriceData?.originalCurrency} ${Math.floor(
                        bookPriceData?.convertedPrice
                      )}`
                    : `${bookPriceData?.originalCurrency} ${
                        bookPriceData?.originalPrice
                      } = ${Math.floor(bookPriceData?.convertedPrice)}`
                  : ""
              }
              color={colors.black}
              size={12}
            />
          )} */}
        </View>

        <View style={appStyles.rowjustify}>
          <CustomText text={"Our Price"} color={colors.grey} size={12} />
          <CustomText
            text={`Rs ${
              Number(data?.Discount) > 0
                ? Math.floor(
                    Number(data?.PAK_PRICE) -
                      Number(data?.PAK_PRICE) * (Number(data?.Discount) / 100)
                  )
                : data?.PAK_PRICE
            }`}
            color={colors.orange}
            fontWeight="600"
            fontFam={font.WorkSans_SemiBold}
            size={14}
          />
        </View>
        <CustomText
          text={data?.availabilityStatus}
          color={
            data?.availabilityStatus == "In Stock" ? colors.green : colors.red
          }
          size={12}
        />
        {isCart ? (
          <View
            style={{
              ...appStyles.row,
              paddingTop: verticalScale(4),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (quantity <= 1) {
                  onDeleteCartItem();

                  return;
                } else {
                  onUpdateQuantity(false);
                }
              }}
              activeOpacity={0.5}
              style={styles.quantityContainer}
            >
              <Image
                style={{
                  width: scale(15),
                  height: scale(15),
                  tintColor: colors.white,
                }}
                source={images.decrement}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <CustomText
              style={{ width: scale(35), textAlign: "center" }}
              text={quantity}
              color={colors.black}
              fontWeight="600"
              fontFam={font.WorkSans_SemiBold}
              size={15}
            />

            <TouchableOpacity
              onPress={() => onUpdateQuantity(true)}
              activeOpacity={0.5}
              style={styles.quantityContainer}
            >
              <Image
                style={{
                  width: scale(11),
                  height: scale(11),
                  tintColor: colors.white,
                }}
                source={images.increment}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={appStyles.rowjustify}>
            <TouchableOpacity onPress={onWishlist} style={styles.box}>
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
        )}
      </View>
    </TouchableOpacity>
  );
};

export default LikedCard;

const styles = StyleSheet.create({
  box: {
    width: scale(53),
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
    width: windowWidth / 3.4,
    minHeight: verticalScale(130),
    alignItems: "center",
    justifyContent: "center",
  },
  quantityContainer: {
    width: scale(22),
    height: scale(22),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: scale(6),
  },
});
