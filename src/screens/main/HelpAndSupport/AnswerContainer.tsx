import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/CustomText";
import { scale, verticalScale } from "react-native-size-matters";
import TopHeader from "../../../components/TopHeader";
import { colors } from "../../../utils/colors";
import { font } from "../../../utils/font";
import { images } from "../../../assets/images";
import Collapsible from "react-native-collapsible";

const AnswerContainer = ({ item, index }: any) => {
  const [isCollapsibQuestion, setIsCollapsibQuestion] = useState(true);

  return (
    <View 
    // style={{gap:verticalScale(10)}}
    key={index.toString()}>
      <TouchableOpacity
        onPress={() => setIsCollapsibQuestion(!isCollapsibQuestion)}
        activeOpacity={0.5}
        style={{
          width: "100%",
          paddingHorizontal: scale(10),
          paddingVertical: verticalScale(5),
          borderWidth: 1,
          borderColor: colors.dark_black,
          borderRadius: scale(10),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          // marginVertical:verticalScale(5)
        }}
      >
        <CustomText
          text={item.quesstion}
          style={{ width: "92%" }}
          fontFam={font.WorkSans_SemiBold}
          fontWeight="600"
          color={colors.dark_black}
          size={14}
        />
        <Image
          style={{
            width: scale(20),
            height: scale(20),
            tintColor: colors.dark_black,
          }}
          source={isCollapsibQuestion ? images.down_arrow : images.down_arrow}
        />
      </TouchableOpacity>
      <Collapsible
      style={{gap:verticalScale(10)}}
       collapsed={isCollapsibQuestion}>

      <CustomText
                // key={ind.toString()}
                // text={"1. "}
                style={{marginTop:verticalScale(10)}}
                label={item?.answer}
                color={colors.black}
                size={14}
              />
        {item?.points?.map((it: any, ind: any) => {
          return (
            <View style={{gap:verticalScale(5)}} >
              {
                it?.heading&&(
                  <CustomText
                  key={ind.toString()}
                  // text={"1. "}
                  label={it?.heading}
                  color={colors.black}
                  size={14}
                />

                )
              }
             
              {it?.details?.map((det: any, inde: any) => {
                return(
                  <CustomText
                  key={inde.toString()}
                  // text={"1. "}
                  label={det?.point}
                  color={colors.black}
                  size={14}
                />
                )
               
              })}
            </View>
          );
        })}
      </Collapsible>
    </View>
  );
};

export default AnswerContainer;

const styles = StyleSheet.create({
  detailConainer: {
    width: "100%",
    borderRadius: scale(10),
    padding: scale(15),
    backgroundColor: colors.white,
    gap: verticalScale(20),
  },
});
