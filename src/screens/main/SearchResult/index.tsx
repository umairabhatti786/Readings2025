import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, Keyboard } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import CustomSearch from "../../../components/CustomSearch";
import { appStyles } from "../../../utils/AppStyles";
import TopHeader from "../../../components/TopHeader";
import LikedCard from "../Liked/LikedCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthSearch,
  getToken,
  setAuthSearch,
} from "../../../redux/reducers/authReducer";
import { ApiServices } from "../../../apis/ApiServices";
import { URLS } from "../../../apis/Urls";
import { LikedBookLayout } from "../../../utils/Loyout/LikedBookLayout";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import * as Animatable from "react-native-animatable";
import {
  getBooksAdvanceSearch,
  getIsBooksAdvanceSearch,
  setIsBooksAdvanceSearch,
} from "../../../redux/reducers/advanceSearchReducer";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import { windowHeight } from "../../../utils/Dimensions";
import CustomToast from "../../../components/CustomToast";

const SearchResultScreen = ({ navigation, route }: any) => {
  const search = useSelector(getAuthSearch);
  const isFilter = route?.params?.isFilter;
  // const [search, setSearch] = useState(authSearch);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const dispach = useDispatch();
  const [searchData, setSearchData] = useState<any>();
  const [page, setPage] = useState(1);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true); // Flag to indicate if more data is available
  const focused = useIsFocused();
  const isBooksAdvanceSearch = useSelector(getIsBooksAdvanceSearch);
  const booksAdvanceSearchData = useSelector(getBooksAdvanceSearch);
  const [totalPage, setTotalPage] = useState(0);
  console.log("searchData", searchData?.length);
  console.log("isFilter", totalPage);

  const token = useSelector(getToken);
  useEffect(() => {
    if (!isFilter) {
      getSearchData();
    }
  }, []);

  useEffect(() => {
    if (isBooksAdvanceSearch == true) {
      getAdvanceSearchBooks();
    }
  }, [isBooksAdvanceSearch]);

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

  const getAdvanceSearchBooks = () => {
    let params = {
      ...booksAdvanceSearchData,
      page: 1,
      token: token,
    };
    setLoading(true);
    setHasMoreData(true);
    ApiServices.GetAdvanceSearch(
      params,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.books) {
            setSearchData(result?.books);
            setTotalPage(result?.pagination?.totalPages);

            dispach(setIsBooksAdvanceSearch(false));
            setLoading(false);
            setPage(2);
          } else {
            setLoading(false);
            dispach(setIsBooksAdvanceSearch(false));
            setMessage(result?.error);
            setIsMessage(true);
          }
        } else {
          setLoading(false);
          dispach(setIsBooksAdvanceSearch(false));
          setMessage("Something went wrong");
          setIsMessage(true);
        }
      }
    );
  };
  const getSearchData = () => {
    let params = {
      search: search,
      page: 1,
      token: token,
    };

    setLoading(true);
    setHasMoreData(true);
    ApiServices.BookSearch(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.books) {
          console.log("result", result);
          setTotalPage(result?.pagination?.totalPages);
          setSearchData(result?.books);
          setLoading(false);
          setPage(2);
        } else {
          setLoading(false);
          setMessage(result?.error);
          setIsMessage(true);
        }
      } else {
        setLoading(false);
        setMessage("Something went wrong");
        setIsMessage(true);
      }
    });
  };

  const onEndReached = () => {
    setIsRefreshing(true);

    if (search.length > 0) {
      let params = {
        search: search,
        page: page,
        token: token,
      };
      ApiServices.BookSearch(params, async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.books) {
            console.log("SearchLencb", result?.books.length);
            if (result?.books.length == 0) {
              setHasMoreData(false);
            }
            setSearchData((prevData) => {
              return [...prevData, ...result?.books];
            });

            setPage(page + 1);
            setIsRefreshing(false);
          } else {
            setIsRefreshing(false);

            setMessage(result?.error);
            setIsMessage(true);
          }
        } else {
          setIsRefreshing(false);
          setMessage("Something went wrong");
          setIsMessage(true);
        }
      });
    } else {
      let params = {
        ...booksAdvanceSearchData,
        page: page,
        token: token,
      };
      ApiServices.GetAdvanceSearch(
        params,
        async ({ isSuccess, response }: any) => {
          if (isSuccess) {
            let result = JSON.parse(response);
            if (result?.books) {
              if (result?.books.length == 0) {
                setHasMoreData(false);
              }
              setSearchData((prevData) => [...prevData, ...result?.books]);

              setPage(page + 1);
              setIsRefreshing(false);
            } else {
              setIsRefreshing(false);

              setMessage(result?.error);
              setIsMessage(true);
            }
          } else {
            setIsRefreshing(false);
            setMessage("Something went wrong");
            setIsMessage(true);
          }
        }
      );
    }
  };
  // const renderOrdersItem = React.memo(({ item }) => (
  //   <LikedCard
  //     onPress={() =>
  //       navigation.navigate("BookDetailScreen", { Book_id: item?.Book_Id })
  //     }
  //     data={item}
  //   />
  // ));

  // const renderOrdersItem = ({ item, index }: any) => {

  //   return (
  //     <LikedCard
  //       onPress={() =>
  //         navigation.navigate("BookDetailScreen", { Book_id: item?.Book_Id })
  //       }
  //       data={item}
  //     />
  //   );
  // };
  const renderFooter = () => {
    if (!isRefreshing) return null;
    return (
      <View style={{ marginVertical: verticalScale(10), alignItems: "center" }}>
        <LottieView
          style={{ width: scale(50), height: scale(50) }}
          source={require("../../../assets/json/loading_primary.json")}
          renderMode="HARDWARE"
          speed={1.2}
          autoPlay
        />
      </View>
    );
  };

  return (
    <>

<ScreenLayout
      style={{
        gap: verticalScale(20),
        paddingHorizontal: scale(20),
      }}
    >
      <TopHeader
        title="Search Result"
        onRightPress={() => navigation.navigate("AllSubCategoriesScreen")}
      />

      <View style={{ gap: verticalScale(15), flex: 1 }}>
        <View style={appStyles.rowjustify}>
          <CustomSearch
            value={search}
            onFilter={() => navigation.goBack()}
            onChangeText={(value: any) => {
              dispach(setAuthSearch(value));
            }}
            onSearch={() => {
              getSearchData();
            }}
            width={"80%"}
            filter={true}
            placeholder="Search"
          />
        </View>
        {loading ? (
          <LikedBookLayout />
        ) : (
          <FlatList
            data={searchData}
            contentContainerStyle={{
              gap: verticalScale(15),
              paddingBottom: verticalScale(isKeyboardVisible ? 280 : 30),
            }}
            renderItem={({ item }) => (
              <LikedCard
              setIsMessage={setIsMessage}
              setMessage={setMessage}
                onPress={() =>
                  navigation.navigate("BookDetailScreen", {
                    Book_id: item?.Book_Id,
                  })
                }
                data={item}
              />
            )}
            initialNumToRender={15}
            removeClippedSubviews={true}
            windowSize={5}
            onEndReachedThreshold={10}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View
                style={{
                  height: windowHeight / 1.5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CustomText
                  text={"No result found."}
                  size={14}
                  fontWeight="500"
                  color={colors.primary}
                />
              </View>
            }
            onEndReached={() => {
              if (
                !isRefreshing &&
                searchData?.length > 0 &&
                hasMoreData &&
                totalPage > 1
              ) {
                // Only load more data if not refreshing
                onEndReached();
              }
            }}
            // onEndReached={() => {
            //   if (hasMoreData) {
            //     onEndReached();
            //   }
            // }} // Triggers fetchData when reaching the end of the list
            ListFooterComponent={renderFooter}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </ScreenLayout>

<CustomToast
        // marginBottom={70}
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        color={colors.white}
      />
    </>
  
  );
};

export default SearchResultScreen;
