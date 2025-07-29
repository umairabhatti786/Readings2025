import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomButton from "../../../components/Button";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import { appStyles } from "../../../utils/GlobalStyles";
import images from "../../../utils/Constants/images";
import CustomHeader from "../../../components/Header";

const YouVerified = ({ navigation }: any) => {
  return (
    <>
      <ScreenLayout style={appStyles.screenLayout}>
        <View style={{ flex: 1, gap: sizeHelper.calHp(20) }}>
          <CustomHeader />

          <View
            style={{
              flex: 1,
              gap: sizeHelper.calWp(25),
              paddingHorizontal: sizeHelper.calWp(30),
              paddingTop: "40%",
              alignItems: "center",
            }}
          >
            <Image
              source={images.verified}
              style={{
                width: sizeHelper.calWp(200),
                height: sizeHelper.calWp(200),
              }}
              resizeMode={"contain"}
            />
            <CustomText
              text={"You're Verified!"}
              fontWeight="700"
              fontFam={fonts.PlusJakartaSans_Bold}
              size={35}
            />

            <CustomText
              color={theme.colors.gray}
              style={{ textAlign: "center" }}
              size={23}
              text={
                "Thanks, your identity has been confirmed. You can now send and receive money securely."
              }
            />

            <CustomButton
              onPress={() => navigation.navigate("BottomTab")}
              text="Go to Dashboard"
              style={{ marginTop: sizeHelper.calHp(50) }}
              width={"100%"}
            />
          </View>
        </View>
      </ScreenLayout>
    </>
  );
};

export default YouVerified;

const styles = StyleSheet.create({});
