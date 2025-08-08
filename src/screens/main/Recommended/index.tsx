import React, { useEffect, useState } from "react";
import { View, FlatList, Keyboard } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../../utils/colors";
import CustomSearch from "../../../components/CustomSearch";
import { appStyles } from "../../../utils/AppStyles";
import CustomText from "../../../components/CustomText";
import TopHeader from "../../../components/TopHeader";
import LikedCard from "../Liked/LikedCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthSearch,
  getSelectedViewAll,
  getToken,
  setAuthSearch,
} from "../../../redux/reducers/authReducer";
import { ApiServices } from "../../../apis/ApiServices";
import { LikedBookLayout } from "../../../utils/Loyout/LikedBookLayout";
import { windowHeight } from "../../../utils/Dimensions";
import LottieView from "lottie-react-native";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation,useRoute } from "@react-navigation/native";
import CustomToast from "../../../components/CustomToast";

const RecommendedScreen = ({}: any) => {
  const navigation: any = useNavigation();
  const viewAll = useSelector(getSelectedViewAll);
  const [categoryBooks, setCategoryBooks] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [page, setPage] = useState(1);
  const [search,setSearch] =useState("")
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true); // Flag to indicate if more data is available
  const token = useSelector(getToken);
  const route:any = useRoute();
  const title = route.params?.title
console.log("categoryBooks",loading)


  useEffect(() => {
    getCategortBooks();
  }, []);

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

  const getCategortBooks = () => {
    setLoading(true);

    let params = {
      page: 1,
      token: token,
      url: viewAll,
    };

    setHasMoreData(true);
    ApiServices.ViewAllBook(params, async ({ isSuccess, response }: any) => {
      console.log("ckbdckdbckdb",response)
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.books) {
          setCategoryBooks(result?.books);
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

  const getSearchData = () => {
    let params = {
      search: search,
      page: 1,
      token: token,
    };

    setLoading(true);
    setHasMoreData(true);

    ApiServices.BookCategorySearch(
      params,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.books) {
            setCategoryBooks(result?.books);
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
      }
    );
  };

  const renderOrdersItem = ({ item, index }: any) => {

    return (
      <LikedCard
        setIsMessage={setIsMessage}
        setMessage={setMessage}
        onPress={() =>
          navigation.navigate("BookDetailScreen", { Book_id: item?.Book_Id })
        }
        data={item}
      />
    );
  };

  const onEndReached = () => {
    setIsRefreshing(true);
    if (search.length > 0) {
      let params = {
        search: search,
        page: page,
        token: token,
      };
      ApiServices.BookCategorySearch(
        params,
        async ({ isSuccess, response }: any) => {
          if (isSuccess) {
            let result = JSON.parse(response);
            if (result?.books) {
              if (result?.books.length == 0) {
                setHasMoreData(false);
              }
              setCategoryBooks((prevData) => {
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
        }
      );

      return;
    } else {
      let params = {
        page: page,
        token: token,
        url: viewAll,
      };
      ApiServices.ViewAllBook(params, async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.books) {
            setPage(page + 1);

            if (result?.books.length == 0) {
              setHasMoreData(false);
            }
            setCategoryBooks((prevData: any) => {
              return [...prevData, ...result?.books];
            });

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
    }
  };

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
          paddingHorizontal: scale(20),
        }}
      >
        <View style={{ paddingBottom: verticalScale(10) }}>
          <TopHeader title={title} />
        </View>

        <View style={{ gap: verticalScale(8), flex: 1 }}>
          <View style={appStyles.rowjustify}>
            <CustomSearch
              onFilter={() => navigation.navigate("FilterScreen")}
              value={search}
              filter={false}
              onChangeText={(value: any) => {
                setSearch(value)

                if (value.length == 0) {
                  Keyboard.dismiss();
                  getCategortBooks();
                }
              }}
              onSubmitEditing={() => {
                if (search.length > 0) {
                  Keyboard.dismiss();

                  getSearchData();
                }
              }}
              onSearch={() => {
                if (search.length > 0) {
                  Keyboard.dismiss();

                  getSearchData();
                }
              }}
              // width={"80%"}
              placeholder="Search"
            />
          </View>

          {loading ? (
            <View style={{ marginTop: verticalScale(10) }}>
              <LikedBookLayout />
            </View>
          ) : (
            <FlatList
              data={categoryBooks}
              ListFooterComponent={renderFooter}
              onEndReachedThreshold={8}
              initialNumToRender={10} // Render 10 items initially
              maxToRenderPerBatch={10} // Render in batches of 10
              windowSize={5} // Load 5 windows of data (visible and off-screen)
              removeClippedSubviews={true} // Improve performance by removing items outside view
              style={{ paddingTop: verticalScale(5) }}
              contentContainerStyle={{
                gap: verticalScale(15),
                paddingBottom: verticalScale(isKeyboardVisible ? 280 : 30),
              }}
              renderItem={renderOrdersItem}
              onEndReached={() => {
                if (!isRefreshing && categoryBooks?.length > 0 && hasMoreData) {
                  // Only load more data if not refreshing
                  onEndReached();
                }
              }}
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
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </ScreenLayout>

      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
      />
    </>
  );
};

export default RecommendedScreen;
