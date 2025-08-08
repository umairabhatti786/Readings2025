import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { appStyles } from "../../../utils/AppStyles";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import { colors } from "../../../utils/colors";
import { windowHeight, windowWidth } from "../../../utils/Dimensions";
import { images } from "../../../assets/images";
import BookReviewCard from "./BookReviewCard";
import BooksCard from "../../../components/BooksCard";
import CustomButton from "../../../components/CustomButton";
import CustomBottomSheet from "../../../components/CustomBottomSheet";
import BookReviewSheetModal from "./BookReviewSheetModal";
import CustomAlertModal from "../../../components/CustomAlertModal";
import OrderSheetModal from "./OrderSheetModal";
import { ApiServices } from "../../../apis/ApiServices";
import { URLS } from "../../../apis/Urls";
import { BookDetailLayout } from "../../../utils/Loyout/BookDetailLayout";
import Stars from "react-native-stars";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthData,
  getGuestToken,
  getIsBuyNowEnable,
  getToken,
  setGuestToken,
  setIsAddCartLoading,
  setIsAddToCart,
  setIsBuyNow,
} from "../../../redux/reducers/authReducer";
import { sessionCheck } from "../../../utils/CommonHooks";
import CustomToast from "../../../components/CustomToast";
import { useFocusEffect } from "@react-navigation/native";
import { GUESTTOKEN, StorageServices } from "../../../utils/StorageService";
import ZoomImageModal from "./ZoomImageModal";
import AbsoluateView from "../../../components/AbsoluateView";
import Share from "react-native-share";
import Clipboard from "@react-native-clipboard/clipboard";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const BookDetail = ({ route }: any) => {
  const navigation: any = useNavigation();
  const bottomSheetModalRef = useRef<any>(null);
  const OrderbottomSheetModalRef = useRef<any>(null);
  const [bookPriceData, setBookPriceData] = useState<any>();

  const OrderSheetSnapPoints = useMemo(() => ["68%", "70%"], []);
  const [bookReview, setBookReview] = useState([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isAddCart, setIsAddCart] = useState(false);
  const [orderId, setOrderId] = useState();
  const [priceLoading,setPriceLoading]=useState(true)



  let viewOrder = route?.params?.viewOrder;
  let isStationery = route?.params?.isStationery;
  let Book_id = route?.params?.Book_id;
  console.log("Book_id", bookPriceData);
  const [bookId, setBookId] = useState(Book_id);
  const [isReviewAddModal, setIsReviewAddModal] = useState(false);
  const [isZoomModal, setIsZoomModal] = useState(false);
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);

  const [isSuccessModal, setIsSuccessModal] = useState<any>(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const BookReviewSnapPoints = useMemo(() => ["55%", "55%"], []);
  const BookReviewkeyboardSnap = useMemo(() => ["98%", "95%"], []);
  const [laoding, setlaoding] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [bookDetailData, setBookDetailData] = useState<any>();
  const guestUserToken = useSelector(getGuestToken);

  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const isBuyNowEnable = useSelector(getIsBuyNowEnable);
  const focused = useIsFocused();
  const authData = useSelector(getAuthData);
  console.log("authData", isBuyNowEnable);
  // useFocusEffect(
  //   useCallback(() => {
  //     console.log("isWishlist");
  //     bottomSheetModalRef.current.present()    }, [])
  // );

  useEffect(() => {
    getConvertedPrice();
    getBookDetailData();
    if(!isStationery){
      GetBookReviewData();

    }

    // setIsWishlist(bookDetailData?.book?.isInWishlist)
  }, [bookId]);

  useEffect(() => {
    if (focused) {
      if (isBuyNowEnable) {
        setTimeout(() => {
          OrderbottomSheetModalRef?.current?.present();
        }, 200);
      }
    }

    // setIsWishlist(bookDetailData?.book?.isInWishlist)
  }, [focused]);

  const getConvertedPrice = () => {
    setPriceLoading(true)

    ApiServices.ConvertBookPrice(
      bookId,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          setBookPriceData(result?.data);
          setPriceLoading(false)

        } else {
          setPriceLoading(true)

        }
      }
    );
  };

  // Automatically open Bottom Sheet when screen gains focus
  // useFocusEffect(
  //   useCallback(() => {
  //     console.log("isWishlist")
  //     OrderbottomSheetModalRef.current.present()
  //       }, [])
  // );

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('blur', () => {
  //     // navigation.setParams({ isBack: true });
  //   });

  //   return unsubscribe; // Clean up the listener when the component unmounts
  // }, [navigation]);

  const getBookDetailData = async () => {
    setlaoding(true);
    let params = {
      id: bookId,
      token: token,
    };
    let id = bookId;
    ApiServices.GetBookDetail(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.book) {
          setBookDetailData(result);
          setIsWishlist(result?.book?.isInWishlist);
          setIsAddCart(result?.book?.isInCart);
          setlaoding(false);
        } else {
          setlaoding(false);
          setMessage(result?.message);
          setIsMessage(true);
        }
      } else {
        setlaoding(false);
        setMessage("Something went wrong");
        setIsMessage(true);
      }
    });
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onAddToCart = () => {
    let data = {
      Book_Id: Book_id,
      cart_type: 1,
      quantity: 1,
    };
    var raw = JSON.stringify(data);
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
          console.log("guestToken", guestToken);
          let result = JSON.parse(response);

          if (result?.success) {
            setIsAddCart(true);
            dispatch(setIsAddToCart(true));
            dispatch(setIsAddCartLoading(true));
          } else {
            if (result?.error == "Invalid token") {
              sessionCheck(dispatch, navigation);
              return;
            }
            setIsAddCart(false);
            setMessage(result?.error);
            setIsMessage(true);
            console.log("result", result);
          }
        } else {
          setIsAddCart(false);

          setMessage("Something went wrong");
          setIsMessage(true);
          console.log("Response", response);
        }
      }
    );
  };

  const onUpdateQuantity = (increment: any) => {
    let data = {
      quantity: increment ? quantity + 1 : quantity + 1,
    };
    var raw = JSON.stringify(data);
    let params = {
      data: raw,
      token: token,
      id: Book_id,
    };
    ApiServices.UpdateCartItem(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.success) {
          console.log("result", result);
          setQuantity((prev) => (increment ? prev + 1 : prev - 1));
        } else {
          if (result?.error == "Invalid token") {
            sessionCheck(dispatch, navigation);

            return;
          }
          setIsAddCart(false);

          setMessage(result?.error);
          setIsMessage(true);
          console.log("result", result);
        }
      } else {
        setIsAddCart(false);

        setMessage("Something went wrong");
        setIsMessage(true);
        console.log("Response", response);
      }
    });
  };

  const onWishlist = () => {
    var raw = JSON.stringify({
      bookId: bookDetailData?.book?.Book_Id,
    });

    if (isWishlist) {
      let params = {
        id: bookDetailData?.book?.Book_Id,
        token: token,
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

  const GetBookReviewData = () => {
    let params = {
      token: token,
      id: bookId,
    };
    ApiServices.GetBookReview(params, async ({ isSuccess, response }: any) => {
      console.log("responseBook",response)
      if (isSuccess) {
        let result = JSON.parse(response);
        console.log("resultBook", result);

        if (result?.success) {
          setBookReview(result?.data);
          // setIsWishlist(false);
          // setIsReviewAddModal(true);
        } else {
          Alert.alert("", result?.message);
        }
      } else {
        Alert.alert("", "Something went wrong");
      }
    });
  };

  const onSubmitBookReview = (book_review: any) => {
    var raw = JSON.stringify(book_review);

    let params = {
      token: token,
      data: raw,
    };
    ApiServices.AddBookReview(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.success) {
          // setIsWishlist(false);
          setIsReviewAddModal(true);
        } else {
          Alert.alert("", result?.error);
        }
      } else {
        Alert.alert("", "Something went wrong");
      }
    });
  };
  const QuantityContainer = () => {
    return (
      <View
        style={{
          ...appStyles.row,
          paddingTop: verticalScale(4),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (quantity != 1) {
              onUpdateQuantity(false);
            }
          }}
          activeOpacity={0.5}
          style={styles.quantityBox}
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
          style={styles.quantityBox}
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
    );
  };
  const BookInfo = ({ title, detail, onPress }: any) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: "31%",
          paddingLeft: scale(10),
          paddingVertical: verticalScale(10),
          backgroundColor: colors.white,
          borderRadius: scale(10),
          gap: verticalScale(6),
        }}
      >
        <CustomText
          numberOfLines={1}
          text={title}
          color={colors.grey}
          size={12}
        />
        <CustomText
          numberOfLines={1}
          text={detail}
          textTransform={"capitalize"}
          color={colors.black}
          size={12}
        />
      </TouchableOpacity>
    );
  };

  const onShare = async () => {
    try {
      const profileUrl = `${"https://main.d3cyv6aeh0n2or.amplifyapp.com"}/book/${Book_id}`;

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

  const onCopy = (text: any) => {
    console.log("TextCopy", typeof text);
    Clipboard.setString(text);
    setMessage("Copy to Clipboard");
    setIsMessage(true);
  };
  const handleReviewChange = useCallback((txt: any) => {
    setReview(txt);
  }, []);
  const CartHeader = () => {
    return (
      <View
        style={{
          ...appStyles.rowjustify,
          width: "100%",
          paddingHorizontal: scale(20),
          paddingTop: verticalScale(Platform.OS == "ios" ? 50 : 30),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backContainer}
        >
          <Image
            style={{
              width: scale(25),
              height: scale(25),
              tintColor: colors.primary,
            }}
            resizeMode="contain"
            source={images.left_arrow}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}
          style={styles.backContainer}
        >
          <Image
            style={{
              width: scale(25),
              height: scale(25),
            }}
            resizeMode="contain"
            source={images.fill_cart}
          />
          <View style={styles.cartContainer}>
            <CustomText
              text={"0"}
              color={colors.white}
              fontWeight="600"
              fontFam={font.WorkSans_SemiBold}
              size={11}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return laoding ? (
    <BookDetailLayout />
  ) : (
    <>
      <ScrollView
        style={{ ...appStyles.main }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: verticalScale(15),
        }}
      >
        <View
          style={{
            gap: verticalScale(20),
            flex: 1,
          }}
        >
          <View
            style={{
              width: windowWidth / 1,
              flex: 1,
              overflow: "hidden",
              backgroundColor: colors.dull_white,
            }}
          >
            {isStationery ? (
              <View style={{ gap: verticalScale(20) }}>
                <CartHeader />

                <Image
                  style={{
                    width: windowWidth / 1.5,
                    height: windowHeight / 3.5,
                    borderRadius: scale(20),
                    alignSelf: "center",
                  }}
                  source={{
                    uri: `${URLS.IMAGE_URL}/images/${bookDetailData?.book?.picname}.webp`,
                  }}
                  resizeMode="contain"
                  // resizeMethod={"auto"}
                  // resizeMethod=""
                />
              </View>
            ) : (
              <ImageBackground
                style={styles.bookImage}
                source={{
                  uri: `${URLS.IMAGE_URL}/images/${bookDetailData?.book?.picname}.webp`,
                }}
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

                <CartHeader />

                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => setIsZoomModal(true)}
                  style={{ overflow: "hidden", marginTop: verticalScale(10) }}
                >
                  <Image
                    style={styles.bookContainer}
                    resizeMode="contain"
                    source={{
                      uri: `${URLS.IMAGE_URL}/images/${bookDetailData?.book?.picname}.webp`,
                    }}
                  />
                </TouchableOpacity>
              </ImageBackground>
            )}

            <View
              style={{
                paddingHorizontal: scale(20),
                paddingTop: verticalScale(20),
                flex: 1,
                gap: verticalScale(20),
              }}
            >
              <View>
                <CustomText
                  text={bookDetailData?.book?.BOOK_TITLE}
                  color={colors.black}
                  textTransform={"capitalize"}
                  fontWeight="600"
                  fontFam={font.WorkSans_SemiBold}
                  size={20}
                />

                <CustomText
                  text={bookDetailData?.book?.authorName}
                  color={colors.black}
                  textTransform={"capitalize"}
                  size={14}
                />
              </View>
              <View style={{ gap: verticalScale(7) }}>
                <View style={{ ...appStyles.rowjustify }}>
                  <CustomText
                    text={"Availability"}
                    color={colors.grey}
                    size={14}
                  />
                  <CustomText
                    text={bookDetailData?.book?.availabilityStatus}
                    color={
                      bookDetailData?.book?.availabilityStatus == "In Stock"
                        ? colors.green
                        : colors.red
                    }
                    fontWeight="600"
                    style={{ width: windowWidth / 1.5, textAlign: "right" }}
                    fontFam={font.WorkSans_SemiBold}
                    size={16}
                  />
                </View>
                {
                  !isStationery&&(

                    <View style={{ ...appStyles.rowjustify }}>
                    <CustomText
                      text={"List Price"}
                      color={colors.grey}
                      size={14}
                    />

<CustomText
                        textDecorationLine={
                          Number(bookDetailData?.book?.Discount) > 0
                            ? "line-through"
                            : "none"
                        }
                        text={
                          bookDetailData?.book?.currency == "Rs"
                          ? `${bookDetailData?.book?.currency} ${bookDetailData?.book?.PRICE}`
                          : `${bookDetailData?.book?.currency} ${bookDetailData?.book?.PRICE}`
                        }
                        // text={
                        //   bookDetailData?.book?.currency == "Rs"
                        //     ? `${bookDetailData?.book?.currency} ${bookDetailData?.book?.PRICE}`
                        //     : `${bookDetailData?.book?.currency} ${bookDetailData?.book?.PRICE} = ${bookDetailData?.book?.PAK_PRICE}`
                        // }
                        color={colors.black}
                        size={14}
                      />

                      
                    {/* {
                      priceLoading?(
                        <SkeletonPlaceholder
                        // speed={00}
                        highlightColor="rgb(222, 226, 230)"
                        backgroundColor="#e9ecef" // Set the main background color of the skeleton
                      >
                        <View  style={{
                            borderRadius: scale(5),
                            width: scale(90),
                            height: verticalScale(12),
                          }}
                          ></View>
                        </SkeletonPlaceholder>
                      ):(
                        <CustomText
                        textDecorationLine={
                          Number(bookDetailData?.book?.Discount) > 0
                            ? "line-through"
                            : "none"
                        }
                        text={
                          bookPriceData?.originalCurrency == "Rs"
                            ? `${bookPriceData?.originalCurrency} ${Math.floor(bookPriceData?.convertedPrice)}`
                            : `${bookPriceData?.originalCurrency} ${bookPriceData?.originalPrice} = ${Math.floor(bookPriceData?.convertedPrice)}`
                        }
                        // text={
                        //   bookDetailData?.book?.currency == "Rs"
                        //     ? `${bookDetailData?.book?.currency} ${bookDetailData?.book?.PRICE}`
                        //     : `${bookDetailData?.book?.currency} ${bookDetailData?.book?.PRICE} = ${bookDetailData?.book?.PAK_PRICE}`
                        // }
                        color={colors.black}
                        size={14}
                      />

                      )
                    } */}
                  
                  </View>

                  )
                }
               

                <View style={appStyles.rowjustify}>
                  <CustomText
                    text={
                      Number(bookDetailData?.book.Discount) > 0
                        ? `Our Price (${bookDetailData?.book?.Discount}% OFF)`
                        : "Our Price"
                    }
                    color={colors.grey}
                    size={14}
                  />
                  <CustomText
                    text={`Rs ${
                      Number(bookDetailData?.book?.Discount) > 0
                        ? Math.floor(
                            Number(bookDetailData?.book?.PAK_PRICE) -
                              Number(bookDetailData?.book?.PAK_PRICE) *
                                (Number(bookDetailData?.book?.Discount) / 100)
                          )
                        : bookDetailData?.book?.PAK_PRICE
                    }`}
                    color={colors.orange}
                    fontWeight="600"
                    fontFam={font.WorkSans_SemiBold}
                    size={20}
                  />
                </View>
                {
                  !isStationery&&(
                    <View style={{gap:verticalScale(8)}}>

<View style={appStyles.rowjustify}>
                  <BookInfo
                    onPress={() => onCopy("Paperback")}
                    title={"Binding"}
                    detail={"Paperback"}
                  />

                  <BookInfo
                    title={"Published"}
                    onPress={() =>
                      onCopy(
                        new Date(bookDetailData?.book?.PUBLISHED_DATE)
                          .getFullYear()
                          .toString()
                      )
                    }
                    detail={new Date(
                      bookDetailData?.book?.PUBLISHED_DATE
                    ).getFullYear()}
                  />
                  <BookInfo
                    title={"Publisher"}
                    onPress={() => onCopy(bookDetailData?.book?.publisherName)}
                    detail={
                      bookDetailData?.book?.publisherName
                        ? bookDetailData?.book?.publisherName
                        : "-"
                    }
                  />
                </View>
                <View style={appStyles.rowjustify}>
                  <BookInfo
                    title={"Category"}
                    onPress={() => onCopy(bookDetailData?.book?.Level1Name)}
                    detail={
                      bookDetailData?.book?.Level1Name
                        ? bookDetailData?.book?.Level1Name
                        : "-"
                    }
                  />

                  <BookInfo
                    title={"Sub category"}
                    onPress={() =>
                      onCopy(bookDetailData?.book?.CATE_DESCRIPTION)
                    }
                    detail={
                      bookDetailData?.book?.CATE_DESCRIPTION
                        ? bookDetailData?.book?.CATE_DESCRIPTION
                        : "-"
                    }
                  />
                  <BookInfo
                    title={"ISBN"}
                    onPress={() => onCopy(bookDetailData?.book?.BOOK_ISBN)}
                    detail={
                      bookDetailData?.book?.BOOK_ISBN
                        ? bookDetailData?.book?.BOOK_ISBN
                        : "-"
                    }
                  />
                </View>
                <View style={appStyles.rowjustify}>
                  <BookInfo
                    title={"Pages"}
                    onPress={() =>
                      onCopy(bookDetailData?.book?.NO_OF_PAGES.toString())
                    }
                    detail={
                      bookDetailData?.book?.NO_OF_PAGES
                        ? bookDetailData?.book?.NO_OF_PAGES
                        : "-"
                    }
                  />
                  <BookInfo
                    title={"Weight"}
                    onPress={() =>
                      onCopy(bookDetailData?.book?.shipping_weight.toString())
                    }
                    detail={
                      bookDetailData?.book?.shipping_weight
                        ? bookDetailData?.book?.shipping_weight
                        : "-"
                    }
                  />

                  <BookInfo
                    title={"Dimensions"}
                    onPress={() =>
                      onCopy(bookDetailData?.book?.Dimensions.toString())
                    }
                    detail={
                      bookDetailData?.book?.Dimensions
                        ? bookDetailData?.book?.Dimensions
                        : "-"
                    }
                  />
                </View>
                      </View>
                  )
                }
               
              </View>

              {bookDetailData?.book?.readings_book_detail?.BOOK_DESCRIPTION && (
                <>
                  <View style={{ gap: verticalScale(3) }}>
                    <CustomText
                      text={`About ${bookDetailData?.book?.BOOK_TITLE}`}
                      color={colors.black}
                      textTransform={"capitalize"}
                      fontWeight="600"
                      fontFam={font.WorkSans_SemiBold}
                      size={18}
                    />

                    <CustomText
                      lineHeight={22}
                      style={{ textAlign: "justify" }}
                      text={bookDetailData?.book?.readings_book_detail?.BOOK_DESCRIPTION?.trim()}
                      color={colors.dark_black + "90"}
                      size={14}
                    />
                  </View>
                </>
              )}

              {bookDetailData?.book?.readings_book_detail
                ?.AuthorDescription && (
                <>
                  <View style={{ gap: verticalScale(3) }}>
                    <CustomText
                      text={`About ${bookDetailData?.book?.authorName}`}
                      color={colors.black}
                      textTransform={"capitalize"}
                      fontWeight="600"
                      fontFam={font.WorkSans_SemiBold}
                      size={18}
                    />

                    <CustomText
                      lineHeight={22}
                      style={{ textAlign: "justify" }}
                      text={bookDetailData?.book?.readings_book_detail?.AuthorDescription?.trim()}
                      color={colors.dark_black + "90"}
                      size={14}
                    />
                  </View>
                </>
              )}
            </View>
          </View>
          {
            !isStationery&&(
              <View style={{ gap: verticalScale(20) }}>
              {bookReview.length > 0 && (
                <>
                  <CustomText
                    text={"Book Reviews"}
                    color={colors.black}
                    style={{ marginLeft: scale(20) }}
                    fontWeight="600"
                    fontFam={font.WorkSans_SemiBold}
                    size={18}
                  />
                  <FlatList
                    data={bookReview}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingLeft: scale(20) }}
                    contentContainerStyle={{
                      gap: scale(15),
                      paddingRight: scale(40),
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }: any) => {
                      return (
                        <BookReviewCard
                          data={item}
                          onPress={() =>
                            navigation.navigate("BookReviewScreen", {
                              reviewDetail: item,
                            })
                          }
                        />
                      );
                    }}
                  />
                </>
              )}
              <View
                style={{ ...appStyles.rowjustify, marginHorizontal: scale(20) }}
              >
                <View style={{ alignItems: "center", gap: verticalScale(6) }}>
                  <Stars
                    default={0}
                    count={5}
                    spacing={scale(8)}
                    starSize={scale(23)}
                    update={(val: any) => {
                      let book_review = {
                        user_id: authData?.id,
                        book_id: bookDetailData?.book?.Book_Id,
                        rating: val,
                      };
                      onSubmitBookReview(book_review);
                      setRating(val);
                    }}
                    // update={(val: any) => setRating(val)}
                    fullStar={images.fill_star}
                    emptyStar={images.unfill_star}
                  />
                  <CustomText
                    text={"Rate this book"}
                    size={14}
                    color={colors.dark_black}
                    fontWeight="600"
                    fontFam={font.WorkSans_SemiBold}
                  />
                </View>
                {/* <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => bottomSheetModalRef.current.present()}
                style={{
                  ...appStyles.row,
                  gap: scale(10),
                  // marginLeft: scale(20),
                  // marginTop: verticalScale(7),
                }}>
                <CustomText
                  text={'Write a Review'}
                  size={14}
                  color={colors.primary}
                  fontWeight="600"
                  fontFam={font.WorkSans_SemiBold}
                />
                <Image
                  source={images.edit}
                  resizeMode="contain"
                  style={{
                    width: scale(15),
                    height: scale(15),
                  }}
                />
              </TouchableOpacity> */}
                <CustomButton
                  text="Write a Review"
                  width={"40%"}
                  borderRadius={999}
                  onPress={() => bottomSheetModalRef.current.present()}
                />
                {/* <View style={{ gap: verticalScale(10) }}>
                
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => bottomSheetModalRef.current.present()}
                    style={{
                      ...appStyles.row,
                      gap: scale(10),
                      marginLeft: scale(20),
                      marginTop: verticalScale(7),
                    }}
                  >
                    <CustomText
                      text={"Write a Review"}
                      size={14}
                      color={colors.primary}
                      fontWeight="600"
                      fontFam={font.WorkSans_SemiBold}
                    />
                    <Image
                      source={images.edit}
                      resizeMode="contain"
                      style={{
                        width: scale(15),
                        height: scale(15),
                      }}
                    />
                  </TouchableOpacity>
                </View> */}
              </View>
            </View>

            )
          }

          {
            !isStationery&&(
              <View style={{gap:verticalScale(10)}}>


{bookDetailData?.relatedAuthBook.length > 0 && (
            <>
              <View >
                <CustomText
                  text={`Also by ${bookDetailData?.book?.authorName}`}
                  color={colors.black}
                  textTransform={"capitalize"}
                  fontWeight="600"
                  style={{
                    marginLeft: scale(20),
                    marginBottom: verticalScale(7),
                    marginTop: verticalScale(5),
                  }}
                  fontFam={font.WorkSans_SemiBold}
                  size={14}
                />
                <View style={{ ...appStyles.row }}>
                  <FlatList
                    data={bookDetailData?.relatedAuthBook}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingLeft: scale(20) }}
                    contentContainerStyle={{
                      paddingRight: scale(20),
                      gap: scale(15),
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }: any) => {
                      // console.log("ItemDetail",item)
                      let book_data = {
                        title: item?.BOOK_TITLE,
                        auther: item?.authorName,
                        listPrice:
                          item?.currency == "Rs"
                            ? `${item?.currency} ${item?.PRICE}`
                            : `${item?.currency} ${item?.PRICE} = ${item?.PAK_PRICE}`,
                        appPrice:
                          Number(item?.Discount) > 0
                            ? Math.floor(
                                Number(item?.PAK_PRICE) -
                                  Number(item?.PAK_PRICE) *
                                    (Number(item?.Discount) / 100)
                              )
                            : item?.PAK_PRICE,
                        book: `${URLS.IMAGE_URL}/images/${item?.picname}.webp`,
                        discount: Number(item?.Discount),
                        quantity: Number(item?.QUANTITY),
                        inStock: item?.availabilityStatus,
                        isInWishlist: item?.isInWishlist,
                        book_Id: item?.Book_Id,
                      };
                      return (
                        <View>
                          <BooksCard
                            setIsMessage={setIsMessage}
                            setMessage={setMessage}
                            onPress={() =>
                              navigation.push("BookDetailScreen", {
                                Book_id: item?.Book_Id,
                              })
                            }
                            // onPress={() =>
                            //   BookMoreDetailScreen
                            //   // setBookId(item?.Book_Id)

                            // }
                            data={book_data}
                          />
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            </>
          )}
          {bookDetailData?.bestseller.length > 0 && (
            <>
              <View style={{ marginBottom: verticalScale(15) }}>
                <CustomText
                  text={bookDetailData?.bestsellersHeading}
                  color={colors.black}
                  textTransform={"capitalize"}
                  fontWeight="600"
                  style={{
                    marginLeft: scale(20),
                    marginBottom: verticalScale(7),
                    marginTop: verticalScale(5),
                  }}
                  fontFam={font.WorkSans_SemiBold}
                  size={14}
                />
                <View style={{ ...appStyles.row }}>
                  <FlatList
                    data={bookDetailData?.bestseller}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingLeft: scale(20) }}
                    contentContainerStyle={{
                      paddingRight: scale(20),
                      gap: scale(15),
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }: any) => {
                      // console.log("ItemDetail",item)
                      let book_data = {
                        title: item?.BOOK_TITLE,
                        auther: item?.authorName,
                        listPrice:
                          item?.currency == "Rs"
                            ? `${item?.currency} ${item?.PRICE}`
                            : `${item?.currency} ${item?.PRICE} = ${item?.PAK_PRICE}`,
                        appPrice:
                          Number(item?.Discount) > 0
                            ? Math.floor(
                                Number(item?.PAK_PRICE) -
                                  Number(item?.PAK_PRICE) *
                                    (Number(item?.Discount) / 100)
                              )
                            : item?.PAK_PRICE,
                        book: `${URLS.IMAGE_URL}/images/${item?.picname}.webp`,
                        discount: Number(item?.Discount),
                        quantity: Number(item?.QUANTITY),
                        inStock: item?.availabilityStatus,
                        isInWishlist: item?.isInWishlist,
                        book_Id: item?.Book_Id,
                      };
                      return (
                        <View>
                          <BooksCard
                            setIsMessage={setIsMessage}
                            setMessage={setMessage}
                            onPress={() =>
                              navigation.push("BookDetailScreen", {
                                Book_id: item?.Book_Id,
                              })
                            }
                            // onPress={() =>
                            //   BookMoreDetailScreen
                            //   // setBookId(item?.Book_Id)

                            // }
                            data={book_data}
                          />
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            </>
          )}

              </View>

            )
          }
        

          
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        {viewOrder ? (
          <View style={{ ...appStyles.rowjustify, width: "100%" }}>
            <CustomButton
              width={"48%"}
              onPress={() => setIsAddCart(true)}
              text={"Cancel"}
              bgColor={colors.white}
              textColor={colors.primary}
            />
            <CustomButton
              width={"48%"}
              onPress={() => setIsSuccessModal(true)}
              text={"Accept Price"}
              bgColor={colors.primary}
              textColor={colors.white}
            />
          </View>
        ) : (
          <>
            <CustomButton
              width={"30%"}
              text={"Buy Now"}
              onPress={() => OrderbottomSheetModalRef.current.present()}
              bgColor={colors.white}
              textColor={colors.primary}
            />

            <View style={{ width: "30%", alignItems: "center" }}>
              {isAddCart ? (
                <QuantityContainer />
              ) : (
                <CustomButton
                  width={"100%"}
                  onPress={() => {
                    // if (!token) {
                    //   navigation.navigate("Login");

                    //   return;
                    // }
                    onAddToCart();
                  }}
                  text={"Add To Cart"}
                  bgColor={colors.primary}
                  textColor={colors.white}
                />
              )}
            </View>

            <TouchableOpacity
              onPress={onWishlist}
              activeOpacity={0.5}
              style={styles.box}
            >
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
          </>
        )}
      </View>

      <CustomBottomSheet
        snapPoints={
          isKeyboardVisible ? BookReviewkeyboardSnap : BookReviewSnapPoints
        }
        backgroundColor={colors.dull_white}
        bottomSheetModalRef={bottomSheetModalRef}
      >
        <BookReviewSheetModal
          onCancel={() => bottomSheetModalRef.current.dismiss()}
          rating={rating}
          setReview={setReview}
          setRating={setRating}
          bookTitle={bookDetailData?.book?.BOOK_TITLE}
          // onChangeText={(txt: any) => setReview(txt)}
          // onChangeText={handleReviewChange}

          review={review}
          onSubmit={() => {
            let book_review = {
              user_id: authData?.id,
              book_id: bookDetailData?.book?.Book_Id,
              rating: rating,
              review: review,
            };
            onSubmitBookReview(book_review);
          }}
        />
      </CustomBottomSheet>
      <CustomBottomSheet
        idDisableDrop={isBuyNowLoading ? true : false}
        // enableContentPanningGesture={false}

        enableHandlePanningGesture={isBuyNowLoading ? false : true} // Disable gesture-based closing
        enableContentPanningGesture={isBuyNowLoading ? false : true} // Disable gesture-based closing
        // enableDismissOnClose={isBuyNowLoading ? true : false} // Prevent backdrop tap closing
        // onBackDrop={() => {
        //   dispatch(setIsBuyNow(false));
        // }}
        snapPoints={OrderSheetSnapPoints}
        backgroundColor={colors.dull_white}
        bottomSheetModalRef={OrderbottomSheetModalRef}
      >
        <OrderSheetModal
          data={bookDetailData?.book}
          token={token}
          setOrderId={setOrderId}
          isBuyNowLoading={isBuyNowLoading}
          setIsBuyNowLoading={setIsBuyNowLoading}
          book_id={Book_id}
          setIsSuccessModal={setIsSuccessModal}
          dispatch={dispatch}
          onCancel={() => OrderbottomSheetModalRef.current.dismiss()}
          onDispatch={() => {
            OrderbottomSheetModalRef.current.dismiss();
            setTimeout(() => {
              navigation.navigate("ChooseAddressScreen", { isBuyNow: true });
              dispatch(setIsBuyNow(true));
            }, 200);
          }}
          onPaywith={() => {
            OrderbottomSheetModalRef.current.dismiss();
            setTimeout(() => {
              navigation.navigate("ChoosePaymentScreen");
              dispatch(setIsBuyNow(true));
            }, 200);
          }}
          navigation={navigation}
          // onSubmit={() => setIsSuccessModal(true)}
        />
      </CustomBottomSheet>

      <CustomAlertModal
        buttonTitle={"Great!"}
        modalVisible={isReviewAddModal}
        title={"Review Added"}
        des={`Your review for ${bookDetailData?.book?.BOOK_TITLE} has been submitted and is now pending approval.`}
        setModalVisible={setIsReviewAddModal}
        onPress={() => {
          setIsReviewAddModal(false);
          setTimeout(() => {
            bottomSheetModalRef.current.close();
          }, 500);
        }}
      />

      <CustomAlertModal
        buttonTitle={viewOrder ? "Continue" : "Back to Home"}
        icon={images.congrat}
        modalVisible={isSuccessModal}
        // title={"Order Received"}
        title={`Order ${orderId}`}
        des={
          token != null
            ? "Thank you for shopping with Readings. We have received your order. You can check the status of your order in the orders tab."
            : " Thank you for shopping with Readings. We have received your order and will notify you via email once it has been dispatched"
        }
        // des={
        //   viewOrder
        //     ? "Thank you for your order. For all requests, there is a requirement of 50% payment. Button: Continue to payment."
        //     : "Thanks for shopping with Readings. We have received your order. You can check the status of your order in the orders tab and track in real time."
        // }
        setModalVisible={setIsReviewAddModal}
        onPress={() => {
          setIsSuccessModal(false);

          setTimeout(() => {
            if (viewOrder) {
              navigation.navigate("CheckoutScreen", { viewOrder: true });

              return;
            }
            navigation.goBack();
          }, 500);
        }}
      />

      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
      />

      <ZoomImageModal
        book_img={`${URLS.IMAGE_URL}/images/${bookDetailData?.book?.picname}.webp`}
        modalVisible={isZoomModal}
        setModalVisible={setIsZoomModal}
        onPress={() => {
          setIsSuccessModal(false);
        }}
      />
      {/* {!isBuyNowLoading && <AbsoluateView />} */}
    </>
  );
};

export default BookDetail;

const styles = StyleSheet.create({
  box: {
    width: scale(47),
    height: verticalScale(38),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: scale(8),
  },
  quantityBox: {
    width: scale(22),
    height: scale(22),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: scale(6),
  },

  bookIcons: {
    width: scale(20),
    height: scale(20),
  },
  bookImage: {
    width: "100%",
    height: verticalScale(295),
    alignItems: "center",
  },
  backContainer: {
    width: scale(30),
    height: scale(30),
    alignItems: "flex-start",
    justifyContent: "center",
  },
  cartContainer: {
    width: scale(15),
    height: scale(15),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: colors.orange,
    position: "absolute",
    right: scale(2),
    top: verticalScale(-2),
  },
  bookContainer: {
    width: scale(121),
    height: verticalScale(170),
    borderRadius: scale(3),
    overflow: "hidden",
  },
  bottomContainer: {
    width: "100%",
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(30),
    backgroundColor: colors.dull_white,
    borderTopWidth: 1,
    borderTopColor: colors.dull_half_white,
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
});
