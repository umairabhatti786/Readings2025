import React, { useEffect, useRef, useState } from "react";
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
import CustomHeader from "../../../components/CustomHeader";
import CustomInput from "../../../components/CustomInput";
import { appStyles } from "../../../utils/AppStyles";
import { images } from "../../../assets/images";
import { colors } from "../../../utils/colors";
import { categoriesData } from "../../../utils/Data";
import { useDispatch } from "react-redux";
import {
  setAuthSearch,
  setCategory,
  setIsHighDiscount,
  setSubCategory,
} from "../../../redux/reducers/authReducer";
import { useIsFocused } from "@react-navigation/native";
import { setIsBooksAdvanceSearch } from "../../../redux/reducers/advanceSearchReducer";
import TopHeader from "../../../components/TopHeader";

const StationeryAndArt = ({ navigation,route }: any) => {
  const data=route?.params?.data

  const [categories, setCategories] = useState(data?.subcategories);
  console.log("data",data)
  const [search, setSearch] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const scrollRef = useRef();

  useEffect(() => {
    dispatch(setSubCategory(""));
    dispatch(setAuthSearch(""));
    dispatch(setIsBooksAdvanceSearch(false));
    dispatch(setAuthSearch(""));
    dispatch(setIsHighDiscount(false));
  }, [isFocused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      const isFocused = navigation.isFocused();
      if (isFocused) {
        // Scroll to the top if the tab is pressed again
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      }
    });
    return unsubscribe;
  }, [navigation]);

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
  const CategoryCard = ({ title, onPress }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={{
          ...appStyles.rowjustify,
          ...styles.categoryContainer,
        }}
      >
        <CustomText text={title} size={14} />

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
      setCategories(data?.subcategories);
      // Keyboard.dismiss()

      return;
    } else {
      const filteredData = data?.subcategories?.filter((item: any) => {
        return `${item?.title || ""}`
          .toLowerCase()
          .trim()
          .includes(value.toLowerCase().trim());
      });
      setCategories(filteredData);
    }
  };
  return (
    <>
      <ScreenLayout
      style={{
        paddingHorizontal: scale(20),

      }}
    >
      <View style={{ paddingBottom: verticalScale(10) }}>
        <TopHeader
          title={data?.title}
        />
      </View>
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

      <ScrollView
          style={{ ...appStyles.main }}
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: verticalScale(isKeyboardVisible ? 300 : 80),
        

          }}
        >
          <View style={{ gap: verticalScale(6),marginTop:verticalScale(15) }}>
            {categories.map((item, index) => {
              return (
                <CategoryCard
                  onPress={() => {
                   
                    dispatch(setCategory(item));
                    navigation.navigate(
                      "StationeryBooks",{isStationery:true}
                    );
                  }}
                  key={index.toString()}
                  title={item.title}
                />
              );
            })}
          </View>
        </ScrollView>
    </ScreenLayout>


    </>
  );
};

export default StationeryAndArt;

const styles = StyleSheet.create({
  categoryContainer: {
    height: verticalScale(39),
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: scale(10),
    paddingHorizontal: scale(10),
  },
});
