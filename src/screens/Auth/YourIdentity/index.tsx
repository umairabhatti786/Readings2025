import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomButton from "../../../components/Button";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import CustomHeader from "../../../components/Header";
import images from "../../../utils/Constants/images";
import { appStyles } from "../../../utils/GlobalStyles";

const YourIdentity = ({ navigation }: any) => {
  const IdentityDetail = ({ img, title, des }: any) => {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "80%",
          gap: sizeHelper.calWp(25),
        }}
      >
        <Image
          source={img}
          style={{
            width: sizeHelper.calWp(70),
            height: sizeHelper.calWp(70),
            resizeMode: "contain",
          }}
        />
        <View>
          <CustomText
            text={title}
            fontWeight="600"
            fontFam={fonts.PlusJakartaSans_SemiBold}
            color={"#031424"}
            size={27}
          />
          <CustomText color={theme.colors.gray} text={des} />
        </View>
      </View>
    );
  };

  return (
    <>
      <ScreenLayout style={appStyles.screenLayout}>
        <View style={{ flex: 1, gap: sizeHelper.calHp(20) }}>
          <CustomHeader />
          <View style={{ gap: sizeHelper.calHp(20) }}>
            <CustomText
              text={"Let’s Verify Your Identity"}
              fontWeight="700"
              fontFam={fonts.PlusJakartaSans_Bold}
              size={33}
            />
            <CustomText
              color={theme.colors.gray}
              style={{ marginRight: sizeHelper.calWp(30) }}
              size={21}
              text={
                "To keep your account secure and meet financial regulations, we’ll need to confirm your identity. This only takes a few minutes."
              }
            />
          </View>

          <View
            style={{
              flex: 1,
              gap: sizeHelper.calHp(30),
              marginTop: sizeHelper.calHp(40),
            }}
          >
            <CustomText text={"What You'll Need:"} fontWeight="700" size={30} />
            <IdentityDetail
              img={images.photo_id}
              title={"Photo ID"}
              des={
                "A government-issued photo ID (passport, driver’s license, or national ID)"
              }
            />
            <IdentityDetail
              img={images.facial_recognition}
              title={"Facial recognition"}
              des={
                "Confirm that the portrait matches the picture on the identification document."
              }
            />
          </View>

          <View style={styles.botttom}>
            <CustomButton
              onPress={() => navigation.navigate("ProofOfResidency")}
              text="Start Verification"
              width={"100%"}
            />
          </View>
        </View>
      </ScreenLayout>
    </>
  );
};

export default YourIdentity;

const styles = StyleSheet.create({
  botttom: {
    gap: sizeHelper.calHp(20),
    bottom: "3%",
  },
});
