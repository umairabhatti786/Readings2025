import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { appStyles } from "../../../utils/AppStyles";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import { colors } from "../../../utils/colors";
import { images } from "../../../assets/images";
import * as Animatable from "react-native-animatable";

type Props = {};
const LocalPaymentCard = ({ selectedMethod }: any) => {
  return (
    <Animatable.View duration={1000} animation={"fadeIn"} delay={300}>
      {selectedMethod?.type == "JazzCash" ? (
        <View style={styles.main}>
          <CustomText
            text={"JazzCash"}
            fontFam={font.WorkSans_SemiBold}
            fontWeight="600"
            color={colors.black}
            size={18}
          />

          <View style={{ ...appStyles.rowjustify, width: "100%" }}>
            <CustomText
              text={"Title of Account"}
              color={colors.grey}
              size={12}
            />
            <CustomText
              text={"Elan Vital Private Limited"}
              color={colors.black}
              size={12}
            />
          </View>
          <View style={{ ...appStyles.rowjustify, width: "100%" }}>
            <CustomText text={"Phone Number"} color={colors.grey} size={12} />
            <View style={{ ...appStyles.row, gap: scale(7) }}>
              <Image source={images.copy} style={styles.copyImage} />
              <CustomText
                text={"0301-1555527"}
                color={colors.black}
                size={12}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.main}>
          <CustomText
            text={"EasyPaisa"}
            fontFam={font.WorkSans_SemiBold}
            fontWeight="600"
            color={colors.black}
            size={18}
          />
          <View style={{ ...appStyles.rowjustify, width: "100%" }}>
            <CustomText
              text={"Title of Account"}
              color={colors.grey}
              size={12}
            />
            <CustomText
              text={"Elan Vital Private Limited"}
              color={colors.black}
              size={12}
            />
          </View>
          <View style={{ ...appStyles.rowjustify, width: "100%" }}>
            <CustomText text={"Phone Number"} color={colors.grey} size={12} />
            <View style={{ ...appStyles.row, gap: scale(7) }}>
              <Image source={images.copy} style={styles.copyImage} />
              <CustomText
                text={"0301-1555527"}
                color={colors.black}
                size={12}
              />
            </View>
          </View>
        </View>
      )}
    </Animatable.View>
  );
};

export default LocalPaymentCard;

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.white,
    padding: scale(15),
    borderRadius: scale(10),
    gap: verticalScale(8),
    marginTop: verticalScale(-7),
  },
  copyImage: {
    width: scale(15),
    height: scale(15),
  },
});
