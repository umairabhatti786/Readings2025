import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Keyboard,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/CustomText";
import { scale, verticalScale } from "react-native-size-matters";
import CustomInput from "../../../components/CustomInput";
import { appStyles } from "../../../utils/AppStyles";
import { images } from "../../../assets/images";
import { colors } from "../../../utils/colors";
import TopHeader from "../../../components/TopHeader";
import { useDispatch } from "react-redux";
import { categoriesData } from "../../../utils/Data";
import { useIsFocused } from "@react-navigation/native";
import {
  setAuthSearch,
  setCategory,
  setIsHighDiscount,
  setSubCategory,
} from "../../../redux/reducers/authReducer";
import { setIsBooksAdvanceSearch } from "../../../redux/reducers/advanceSearchReducer";
import { ApiServices } from "../../../apis/ApiServices";
import { HighDiscountLayout } from "../../../utils/Loyout/HighDiscountLayout";
import CustomToast from "../../../components/CustomToast";
const HighDiscountsScreen = ({ navigation }: any) => {
  const [categories, setCategories] = useState<any>([]);
  const [searchCategories, setSearchCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(()=>{
    getDiscountData();

  },[])

  useEffect(() => {
    dispatch(setSubCategory(""));
    dispatch(setAuthSearch(""));
    dispatch(setIsBooksAdvanceSearch(false));
    dispatch(setAuthSearch(""));
    // dispatch(setIsHighDiscount(false));
    dispatch(setIsBooksAdvanceSearch(false));

    
  }, [isFocused]);
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

  const getDiscountData = () => {
    setLoading(true);
    ApiServices.GetHighDiscountCategories(
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.data?.allCategories) {
            setCategories(result?.data?.allCategories);
            setSearchCategories(result?.data?.allCategories)
            setLoading(false);
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

  const CategoryCard = ({ title, onPress,count }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={{
          ...appStyles.rowjustify,
          ...styles.categoryContainer,
        }}
      >
        <View style={{...appStyles.row,gap:scale(10)}}>
        <CustomText text={title} size={14} />
        <CustomText text={`[${count}]`} size={14} />



        </View>
        <Image
          style={{
            width: scale(18),
            height: scale(18),
          }}
          resizeMode="contain"
          source={images.right_arrow}
        />
      </TouchableOpacity>
    );
  };

  const onSearch = (value: any) => {
    setSearch(value);
    if (value.length == 0) {
      setCategories(searchCategories);
      // Keyboard.dismiss()

      return;
    } else {
      const filteredData = searchCategories?.filter((item: any) => {
        return `${item?.label || ""}`
          .toLowerCase()
          .trim()
          .includes(value.toLowerCase().trim());
      });
      console.log("filteredData", filteredData);
      setCategories(filteredData);
    }
  };
  return (
    <>
     <ScreenLayout
      style={{
        paddingHorizontal: scale(20),
        gap: verticalScale(15),
      }}
    >
      <TopHeader title="High Discounts (Books only)" />
      <View style={appStyles.rowjustify}>
        <CustomInput
          value={search}
          onChangeText={onSearch}
          rightSource={search.length > 0 && images.close}
          onShowPassword={() => {
            setSearch("");
            setCategories(categoriesData);
            Keyboard.dismiss();
          }}
          placeholder="Search Category"
        />
      </View>
      <ScrollView
        style={{ ...appStyles.main }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: verticalScale(isKeyboardVisible ? 300 : 40),
        }}
      >
         {loading ? (
          <View
          
          >
            <HighDiscountLayout />
          </View>
        ) : (
          <View style={{ gap: verticalScale(6) }}>
          {categories.map((item:any, index:any) => {
            let data={
              id:Number(item?.id),
              title:item?.label,
              count:item?.count

            }
              return (
                <CategoryCard
                count={data?.count}
                  onPress={() => {
                    dispatch(setCategory(data));
                    dispatch(setIsHighDiscount(true));
                    navigation.navigate("BusinessScreen",{highDiscountParam:true});
                  }}
                  key={index.toString()}
                  title={data.title}
                />
              );
            })}
        </View>
        )}
       
      </ScrollView>
    </ScreenLayout>

    <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
      />
    </>
   
  );
};

export default HighDiscountsScreen;

const styles = StyleSheet.create({
  categoryContainer: {
    height: verticalScale(39),
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: scale(10),
    paddingHorizontal: scale(10),
  },
  filterContainer: {
    height: verticalScale(39),
    backgroundColor: colors.primary,
    borderRadius: scale(8),
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
});
