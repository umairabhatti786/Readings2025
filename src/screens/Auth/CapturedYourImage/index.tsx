import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomButton from "../../../components/Button";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import { appStyles } from "../../../utils/GlobalStyles";
import CustomHeader from "../../../components/Header";
import images from "../../../utils/Constants/images";

const CapturedYourImage = ({ navigation }: any) => {
  return (
    <>
      <ScreenLayout style={appStyles.screenLayout}>
        <View style={{ flex: 1, gap: sizeHelper.calHp(20) }}>
          <CustomHeader />
          <View style={{ gap: sizeHelper.calHp(30) }}>
            <CustomText
              size={33}
              fontWeight="700"
              text={"Captured your image"}
            />

            <Image
              style={{
                width: sizeHelper.calWp(350),
                height: sizeHelper.calWp(350),
                alignSelf: "center",
                borderRadius: sizeHelper.calWp(30),
              }}
              source={images.capture_img}
            />

            <CustomText
              style={{ marginRight: sizeHelper.calWp(30) }}
              size={27}
              fontWeight="700"
              text={"After Captured your photo, Make sure"}
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
                  text={"Clear and not blurry"}
                  size={23}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              paddingBottom: sizeHelper.calHp(Platform.OS == "ios" ? 10 : 50),
            }}
          >
            <CustomButton
              onPress={() => navigation.navigate("YouVerified")}
              text="Confirm"
              width={"100%"}
            />

            <TouchableOpacity
              style={{ padding: sizeHelper.calWp(20), alignSelf: "center" }}
            >
              <CustomText
                text={"Retake image"}
                textDecorationLine="underline"
                color={theme.colors.black}
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScreenLayout>
    </>
  );
};

export default CapturedYourImage;

const styles = StyleSheet.create({});
