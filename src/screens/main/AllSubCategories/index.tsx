import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../../utils/colors";
import CustomText from "../../../components/CustomText";
import TopHeader from "../../../components/TopHeader";
import CustomButton from "../../../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthSelectCategory,
  getAuthSelectSubCategory,
  getSubCategorories,
  setAuthSearch,
  setIsHighDiscount,
  setSubCategory,
} from "../../../redux/reducers/authReducer";
import { windowHeight } from "../../../utils/Dimensions";
import { setIsBooksAdvanceSearch } from "../../../redux/reducers/advanceSearchReducer";

const AllSubCategoriesScreen = ({ navigation }: any) => {
  const Categories = useSelector(getAuthSelectCategory);
  const subCategories = useSelector(getSubCategorories);
  const subCategory = useSelector(getAuthSelectSubCategory);
  const [activeTab, setActiveTab] = useState<any>(subCategory);


  const dispatch = useDispatch();

  return (
    <ScreenLayout>
      <View
        style={{
          paddingHorizontal: scale(20),
          paddingBottom: verticalScale(10),
        }}
      >
        <TopHeader title="All Sub Categories" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: colors.dull_white,
          flex: 1,
          paddingHorizontal: scale(20),
          paddingTop: verticalScale(10),
        }}
        contentContainerStyle={{
          backgroundColor: colors.dull_white,
          gap: verticalScale(20),
          paddingBottom: verticalScale(20),
        }}
      >
        {subCategories.length > 0 ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: scale(10),
              flexWrap: "wrap",
            }}
          >
            {subCategories.map((item: any, index: any) => {
              let data = {
                id: item?.Link,
                count: item?.cnt,
                sub: item?.name,
              };
              return (
                <TouchableOpacity
                  key={index.toString()}
                  activeOpacity={0.6}
                  onPress={() => {
                    setActiveTab(data);
                  }}
                  style={{
                    ...styles.subCategoryContainer,
                    backgroundColor:
                      activeTab?.id == data?.id ? colors.black : colors.white,
                  }}
                >
                  <CustomText
                    textTransform={"capitalize"}
                    color={
                      activeTab?.id == data?.id ? colors.white : colors.grey
                    }
                    text={data?.sub}
                    size={14}
                  />
                  <CustomText
                    textTransform={"capitalize"}
                    color={
                      activeTab?.id == data?.id ? colors.white : colors.grey
                    }
                    text={`[${data?.count}]`}
                    size={14}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
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
        )}
      </ScrollView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          paddingTop: verticalScale(10),
          paddingHorizontal: scale(20),
          paddingBottom: verticalScale(30),
          // paddingBottom: verticalScale(30),
        }}
      >
        <CustomButton
          text="Apply"
          disable={!activeTab}
          onPress={() => {
            dispatch(setAuthSearch(""));
            dispatch(setIsHighDiscount(false));
            dispatch(setIsBooksAdvanceSearch(false));
            dispatch(setSubCategory(activeTab));

            navigation.goBack();
          }}
        />
      </View>
    </ScreenLayout>
  );
};

export default AllSubCategoriesScreen;

const styles = StyleSheet.create({
  subCategoryContainer: {
    borderRadius: 999,
    height: verticalScale(32),
    paddingHorizontal: scale(13),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: scale(10),
  },
});
