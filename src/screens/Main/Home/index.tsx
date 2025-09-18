import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  PanResponder,
  RefreshControl,
  Platform,
  StatusBar,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import CustomHeader from "../../../components/CustomHeader";
import { colors } from "../../../utils/colors";
import DiscountBooks from "./DiscountBooks";
import CustomSearch from "../../../components/CustomSearch";
import { appStyles } from "../../../utils/AppStyles";
import { images } from "../../../assets/images";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import BooksCard from "../../../components/BooksCard";
import { windowWidth } from "../../../utils/Dimensions";
import { ApiServices } from "../../../apis/ApiServices";
import { HomeLayout } from "../../../utils/Loyout/HomeLayout";
import { URLS } from "../../../apis/Urls";
import { useDispatch, useSelector } from "react-redux";
import {
  getGuestToken,
  getToken,
  setAuthSearch,
  setSelectedViewAll,
} from "../../../redux/reducers/authReducer";
import { setIsBooksAdvanceSearch } from "../../../redux/reducers/advanceSearchReducer";
import { useIsFocused } from "@react-navigation/native";
import { PanGestureHandler } from "react-native-gesture-handler";
import PredictionList from "../../../components/PredictionList";
import CustomToast from "../../../components/CustomToast";
import { STATUS_BAR_HEIGHT } from "../../../utils/CommonHooks";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState(0);
  const [laoding, setlaoding] = useState(true);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [search, setSearch] = useState("");
  const fucused = useIsFocused();
  const token = useSelector(getToken);
  const guestToken = useSelector(getGuestToken);
  const [booksData, setBooksData] = useState([]);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const position = useRef(new Animated.Value(0)).current;
  const [predictionData, setPredictionData] = useState([]);
  const [isPredictionList, setIsPredictionList] = useState(false);

  const [recentOrderHistory, setRecentOrderHistory] = useState([]);
  const scrollRef = useRef();
  useEffect(() => {
    if (fucused) {
      console.log("isFcoussed");
      getHomePageData(); // Run this function on the first visit
    }
  }, [fucused]);
  console.log("message", message);
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      const isFocused = navigation.isFocused();
      if (isFocused) {
        console.log("ckdncdkncdkcndk");
        // Scroll to the top if the tab is pressed again
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      }
    });
    return unsubscribe;
  }, [navigation]);

  const getHomePageData = async () => {
    ApiServices.GetHome(token, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        const data = result?.tags_books;
        if (data) {
          setBooksData(data);
          ApiServices.GetRecentOrderHistory(
            token?.length != 0 ? token : guestToken,
            async ({ isSuccess, response }: any) => {
              if (isSuccess) {
                let result = JSON.parse(response);
                const data = result?.data?.recentHistory;
                setRecentOrderHistory(data);
              }
            }
          );
          setlaoding(false);
        } else {
          setlaoding(false);
          setMessage(result?.error);
          setIsMessage(true);
        }
      } else {
        setlaoding(false);
        setMessage("Something went wrong");
        console.log("errorResponse", response);

        setIsMessage(true);
      }
    });
  };
  return (
    <>
      <SafeAreaView
        style={[
          {
            gap: verticalScale(10),
            flex: 1,
          },
        ]}
      >
        {laoding ? (
          <HomeLayout />
        ) : (
          <>
            <View style={{ flex: 1 }}>
              <ScrollView
                ref={scrollRef}
                removeClippedSubviews={false}
                style={{ ...appStyles.main }}
                showsVerticalScrollIndicator={false}
                // refreshControl={
                //   <RefreshControl refreshing={refresh} onRefresh={getHomePageData} />
                // }
                contentContainerStyle={{
                  paddingBottom: verticalScale(80),
                  gap: verticalScale(15),
                  paddingTop: verticalScale(Platform.OS == "ios" ? 40 : 45),
                }}
              >
                <View
                  style={{
                    paddingHorizontal: scale(20),
                    gap: verticalScale(15),
                  }}
                >
                  <DiscountBooks />
                  <View style={appStyles.rowjustify}>
                    <CustomSearch
                      onSearch={() => {
                        if (search.length > 0) {
                          dispatch(setIsBooksAdvanceSearch(false));

                          setSearch("");
                          navigation.navigate("SearchResultScreen");
                        }
                      }}
                      onSubmitEditing={() => {
                        if (search.length > 0) {
                          dispatch(setIsBooksAdvanceSearch(false));
                          setSearch("");
                          navigation.navigate("SearchResultScreen");
                        }
                      }}
                      onFilter={() => {
                        navigation.navigate("FilterScreen");
                      }}
                      value={search}
                      onChangeText={(value: any) => {
                        if (value.length == 0) {
                          setIsPredictionList(false);
                        } else {
                          setIsPredictionList(true);
                        }
                        setSearch(value);
                        dispatch(setAuthSearch(value));
                      }}
                      placeholder="Search"
                      width={"80%"}
                      filter={true}
                    />
                  </View>
                </View>

                <View>
                  <FlatList
                    data={[
                      "All",
                      "Fiction",
                      "Non-fiction",
                      "Young Adults",
                      "Children",
                      "Urdu Books",
                      "Our Publications",
                      "Stationery & Art Supplies",
                    ]}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                      paddingLeft: scale(20),
                      marginTop: verticalScale(-5),
                    }}
                    contentContainerStyle={{
                      gap: scale(10),
                      paddingRight: scale(40),
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }: any) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.6}
                          onPress={() => setActiveTab(index)}
                          style={{
                            ...styles.categoryContainer,
                            backgroundColor:
                              activeTab == index ? colors.black : colors.white,
                          }}
                        >
                          <CustomText
                            color={
                              activeTab == index ? colors.white : colors.grey
                            }
                            text={item}
                            size={14}
                          />
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>

                <View>
                  {booksData?.map((ite: any, index: any) => {
                    return (
                      <View
                        key={index.toString()}
                        style={{ marginBottom: verticalScale(15) }}
                      >
                        <CustomText
                          text={ite?.tag_description}
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
                            data={ite?.books}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ListFooterComponent={({ item, index }: any) => {
                              const lastItem =
                                ite?.books?.[ite?.books.length - 1]; // Get last item
                              return (
                                <TouchableOpacity
                                  activeOpacity={0.5}
                                  onPress={() => {
                                    dispatch(setSelectedViewAll(ite?.url));
                                    navigation.navigate("RecommendedScreen", {
                                      title: ite?.tag_description,
                                    });
                                  }}
                                  style={styles.popularBox}
                                >
                                  <View style={styles.popularContainer}>
                                    <Image
                                      source={images.add_unfill}
                                      style={{
                                        width: scale(22),
                                        height: scale(22),
                                        tintColor: colors.white,
                                      }}
                                      resizeMode="contain"
                                    />
                                  </View>

                                  <CustomText
                                    text={"View All"}
                                    color={colors.white}
                                    size={14}
                                  />
                                </TouchableOpacity>
                              );
                            }}
                            style={{ paddingLeft: scale(20) }}
                            contentContainerStyle={{
                              paddingRight: scale(40),
                              gap: scale(15),
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }: any) => {
                              let book_data = {
                                title: item?.BOOK_TITLE,
                                auther: item?.authorName,
                                listPrice:
                                  item?.currency == "Rs"
                                    ? `${item?.currency} ${item?.PRICE}`
                                    : `${item?.currency} ${item?.PRICE}`,
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
                                isInCart: item?.isInCart,
                              };
                              return (
                                <View>
                                  <BooksCard
                                    setIsMessage={setIsMessage}
                                    setMessage={setMessage}
                                    onPress={() =>
                                      navigation.navigate("BookDetailScreen", {
                                        Book_id: item?.Book_Id,
                                      })
                                    }
                                    data={book_data}
                                  />
                                </View>
                              );
                            }}
                          />
                        </View>
                      </View>
                    );
                  })}
                  {recentOrderHistory.length > 0 && (
                    <View style={{ marginBottom: verticalScale(15) }}>
                      <CustomText
                        text={"Your Recent History"}
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
                          data={recentOrderHistory}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          style={{ paddingLeft: scale(20) }}
                          contentContainerStyle={{
                            paddingRight: scale(40),
                            gap: scale(15),
                          }}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item, index }: any) => {
                            let book_data = {
                              title: item?.BOOK_TITLE,
                              auther: item?.authorName,
                              listPrice:
                                item?.currency == "Rs"
                                  ? `${item?.currency} ${item?.PRICE}`
                                  : `${item?.currency} ${item?.PRICE}`,
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
                            console.log("item?.Book_Id,", item?.Book_Id);
                            return (
                              <View>
                                <BooksCard
                                  setIsMessage={setIsMessage}
                                  setMessage={setMessage}
                                  onPress={() =>
                                    navigation.navigate("BookDetailScreen", {
                                      Book_id: item?.Book_Id,
                                    })
                                  }
                                  // onPress={() =>
                                  //   navigation.navigate("BookDetailScreen", {
                                  //     Book_id: item?.Book_Id,
                                  //   })
                                  // }
                                  data={book_data}
                                />
                              </View>
                            );
                          }}
                        />
                      </View>
                    </View>
                  )}
                </View>
              </ScrollView>

              {!laoding && (
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
          </>
        )}
      </SafeAreaView>
      <CustomToast
        marginBottom={70}
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        color={colors.white}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  popularContainer: {
    width: scale(62),
    height: scale(62),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: "#FFFFFF20",
  },
  popularBox: {
    width: windowWidth / 1.9,
    height: verticalScale(240),
    backgroundColor: colors.primary,
    borderRadius: scale(10),
    alignItems: "center",
    paddingTop: verticalScale(55),
    gap: verticalScale(30),
  },
  categoryContainer: {
    borderRadius: 999,
    height: verticalScale(30),
    paddingHorizontal: scale(16),
    alignItems: "center",
    justifyContent: "center",
  },
});
