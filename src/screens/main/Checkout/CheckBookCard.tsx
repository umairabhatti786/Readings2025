import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { appStyles } from "../../../utils/AppStyles";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import { colors } from "../../../utils/colors";
import { windowWidth } from "../../../utils/Dimensions";
import { images } from "../../../assets/images";
import { URLS } from "../../../apis/Urls";
interface data {
  title?: string;
  auther?: string;
  price?: string;
  quantity?: string;
}
type Props = {
  data?: any;
};
const CheckBookCard = ({ data }: Props) => {
  console.log("dataChecout", data);
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        borderRadius: scale(10),
        overflow: "hidden",
        backgroundColor: colors.white,
        height: verticalScale(70),
      }}
    >
      <ImageBackground
        style={styles.bookImage}
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
            width: scale(30),
            height: verticalScale(50),
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
          paddingVertical: verticalScale(Platform.OS == "ios" ? 10 : 4),
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: verticalScale(4) }}>
          <View style={appStyles.rowjustify}>
            <CustomText
              text={data?.BOOK_TITLE}
              color={colors.black}
              textTransform={"capitalize"}
              style={{ width: "60%" }}
              numberOfLines={1}
              fontWeight="600"
              fontFam={font.WorkSans_SemiBold}
              size={14}
            />

            <CustomText
              text={`Rs ${
                Number(data?.Discount) > 0
                  ? Math.floor(
                      Number(data?.PAK_PRICE) -
                        Number(data?.PAK_PRICE) * (Number(data?.Discount) / 100)
                    )
                  : data?.PAK_PRICE
              }`}
              color={colors.black}
              fontWeight="600"
              fontFam={font.WorkSans_SemiBold}
              size={14}
            />
          </View>
          <CustomText
            text={data?.authorName}
            textTransform={"capitalize"}
            numberOfLines={1}
            color={colors.grey}
            size={12}
          />
        </View>

        <View
          style={{
            alignSelf: "flex-end",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <CustomText
            text={`Qty ${data?.cart_qty}`}
            color={"#1C274C"}
            size={12}
          />
        </View>
      </View>
    </View>
  );
};

export default CheckBookCard;

const styles = StyleSheet.create({
  box: {
    width: scale(22),
    height: scale(22),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: scale(6),
  },

  bookIcons: {
    width: scale(18),
    height: scale(18),
  },
  bookImage: {
    width: windowWidth / 6,
    // height: verticalScale(135),
    alignItems: "center",
    justifyContent: "center",
  },
});
