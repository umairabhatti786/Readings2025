import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import sizeHelper from "../../../utils/Helpers";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomButton from "../../../components/Button";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import { appStyles } from "../../../utils/GlobalStyles";
import CustomHeader from "../../../components/Header";
import images from "../../../utils/Constants/images";

const PassportPhotoInstruction = ({ navigation }: any) => {
  return (
    <>
      <ScreenLayout style={appStyles.screenLayout}>
        <View style={{ flex: 1, gap: sizeHelper.calHp(20) }}>
          <CustomHeader />
          <View style={{ gap: sizeHelper.calHp(20) }}>
            <Image
              style={{
                width: sizeHelper.calWp(350),
                height: sizeHelper.calWp(350),
                resizeMode: "contain",
                alignSelf: "center",
              }}
              source={images.photo_id}
            />

            <CustomText
              style={{ marginRight: sizeHelper.calWp(30) }}
              size={33}
              fontWeight="700"
              text={"Before take your passport photo, please make sure that"}
            />
          </View>

          <View style={{ flex: 1 }}>
            <View>
              <View style={{ flexDirection: "row", gap: sizeHelper.calWp(10) }}>
                <CustomText
                  text={"."}
                  fontWeight="700"
                  fontFam={fonts.PlusJakartaSans_Bold}
                  size={40}
                />
                <CustomText
                  style={{ alignSelf: "flex-end" }}
                  text={"Your ID isn’t expired"}
                  size={23}
                />
              </View>
              <View style={{ flexDirection: "row", gap: sizeHelper.calWp(10) }}>
                <CustomText
                  text={"."}
                  fontWeight="700"
                  fontFam={fonts.PlusJakartaSans_Bold}
                  size={40}
                />
                <CustomText
                  style={{ alignSelf: "flex-end" }}
                  text={"Take a clear photo"}
                  size={23}
                />
              </View>
              <View style={{ flexDirection: "row", gap: sizeHelper.calWp(10) }}>
                <CustomText
                  text={"."}
                  fontWeight="700"
                  fontFam={fonts.PlusJakartaSans_Bold}
                  size={40}
                />
                <CustomText
                  style={{ alignSelf: "flex-end" }}
                  text={"Capture you entire ID"}
                  size={23}
                />
              </View>
            </View>
          </View>

          <CustomButton
            style={{ bottom: "3%" }}
            onPress={() => navigation.navigate("PhotoIDCard")}
            text="Continue"
            width={"100%"}
          />
        </View>
      </ScreenLayout>
    </>
  );
};

export default PassportPhotoInstruction;

const styles = StyleSheet.create({});
