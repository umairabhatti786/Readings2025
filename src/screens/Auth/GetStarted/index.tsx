import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
import sizeHelper, { screenWidth, screentHeight } from "../../../utils/Helpers";
import images from "../../../utils/Constants/images";
import { theme } from "../../../utils/Themes";
import CustomButton from "../../../components/Button";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import icons from "../../../utils/Constants/icons";
import { appStyles } from "../../../utils/GlobalStyles";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";

const GetStarted = ({ navigation }: any) => {
  return (
    <ImageBackground style={{ flex: 1 }} source={images.get_started_background}>
      <View
        style={styles.innerContainer}
      >
        <Image
          style={{
            width: sizeHelper.calWp(270),
            height: sizeHelper.calWp(100),
            alignSelf: "center",
          }}
          source={images.logo}
          resizeMode="contain"
        />
        <CustomText
          text={"Securely connecting your wallet!"}
          fontWeight="700"
          style={{
            textAlign: "center",
            paddingHorizontal: sizeHelper.calWp(30),
          }}
          color={theme.colors.white}
          fontFam={fonts.PlusJakartaSans_Bold}
          size={45}
        />
        <CustomText
          text={"Bringing the world closer—one transfer at a time"}
          style={{ textAlign: "center" }}
          color={theme.colors.white}
        />
        <View style={{ flex: 1 }}>
          <Image
            style={{
              width: WINDOW_WIDTH,
              height: "80%",
              alignSelf: "center",
              marginTop: "17%",
            }}
            source={images.money_transfer_img}
          />
        </View>
        <View
          style={{
            gap: sizeHelper.calHp(20),
            paddingBottom: sizeHelper.calHp(60),
          }}
        >
          <CustomButton
            text="Let’s get started"
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
            bgColor={theme.colors.secondary}
            width={"100%"}
          >
            <Image
              source={icons.next_btn}
              style={{
                width: sizeHelper.calWp(30),
                height: sizeHelper.calWp(30),
                resizeMode: "contain",
              }}
            />
          </CustomButton>
          <View
            style={{
              ...appStyles.row,
              gap: sizeHelper.calHp(15),
              alignSelf: "center",
            }}
          >
            <Image
              style={{
                width: sizeHelper.calWp(30),
                height: sizeHelper.calWp(30),
                alignSelf: "center",
                tintColor: theme.colors.white,
              }}
              source={icons.lock}
              resizeMode="contain"
            />
            <CustomText
              text={"Protected by bank-level encryption"}
              color={theme.colors.white}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
 innerContainer:{
  flex: 1,
  paddingHorizontal: sizeHelper.calWp(40),
  gap: sizeHelper.calHp(20),
  paddingTop: sizeHelper.calHp(Platform.OS == "ios" ? 100 : 30),
}
});
