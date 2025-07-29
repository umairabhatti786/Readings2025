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

const CapturedIDCard = ({ navigation }: any) => {
  return (
    <>
      <ScreenLayout style={appStyles.screenLayout}>
        <View style={{ flex: 1, gap: sizeHelper.calHp(20) }}>
          <CustomHeader />
          <View style={{ gap: sizeHelper.calHp(30) }}>
            <CustomText size={30} fontWeight="700" text={"Captured ID card"} />

            <Image
              style={{
                width: "100%",
                height: sizeHelper.calWp(400),
                resizeMode: "stretch",
              }}
              source={images.IDCard}
            />

            <CustomText
              style={{ marginRight: sizeHelper.calWp(30) }}
              size={25}
              fontWeight="700"
              text={"After Captured ID card photo, Make suret"}
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
                  text={"Readable, clear and not blurry"}
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
                  text={"Well-lit, not reflective, not too dark"}
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
                  text={"ID occupies most of the image"}
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
              onPress={() => navigation.navigate("TakeSelfie")}
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

export default CapturedIDCard;

const styles = StyleSheet.create({});
