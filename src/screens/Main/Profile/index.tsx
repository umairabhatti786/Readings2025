import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomButton from "../../../components/Button";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import { appStyles } from "../../../utils/GlobalStyles";
import icons from "../../../utils/Constants/icons";
import CustomHeader from "../../../components/Header";
import images from "../../../utils/Constants/images";
import SwitchToggle from "react-native-switch-toggle";

const ProfileScreen = ({ navigation }: any) => {
  const [isDarkMode, setIsDarkMode] = useState(!false);

  const InfoDetail = ({ icon, title, isLanguage }: any) => {
    return (
      <View style={appStyles.rowjustify}>
        <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
          <Image
            source={icon}
            style={{
              width: sizeHelper.calWp(55),
              height: sizeHelper.calWp(55),
              resizeMode: "contain",
            }}
          />

          <CustomText
            text={title}
            fontWeight="700"
            fontFam={fonts.PlusJakartaSans_Bold}
            size={24}
            color={theme.colors.text_light_black}
          />
        </View>

        <View style={{ ...appStyles.row, gap: sizeHelper.calWp(15) }}>
          {isLanguage && (
            <CustomText
              text={"English"}
              fontWeight="600"
              fontFam={fonts.PlusJakartaSans_Medium}
              size={22}
              color={theme.colors.text_light_black}
            />
          )}
          <Image
            source={icons.next}
            style={{
              width: sizeHelper.calWp(25),
              height: sizeHelper.calWp(25),
              resizeMode: "contain",
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <ScreenLayout
        style={{
          flex: 1,
          paddingHorizontal: sizeHelper.calWp(30),
          gap: sizeHelper.calWp(40),
        }}
      >
        <View style={{ flex: 1, gap: sizeHelper.calHp(25) }}>
          <CustomHeader title={"Profile"} />
          <View style={{ alignSelf: "center", gap: sizeHelper.calHp(30) }}>
            <View>
              <View style={{ alignSelf: "center" }}>
                <Image source={images.user5} style={styles.userImgContainer} />
                <View style={styles.cameraContainer}>
                  <Image
                    source={icons.camera}
                    style={{
                      width: sizeHelper.calWp(27),
                      height: sizeHelper.calWp(27),
                      resizeMode: "contain",
                    }}
                  />
                </View>
              </View>
            </View>

            <View>
              <CustomText
                style={{ textAlign: "center" }}
                text={"Donald Loe"}
                fontWeight="700"
                fontFam={fonts.PlusJakartaSans_Bold}
                size={35}
                color={theme.colors.text_light_black}
              />

              <CustomText
                style={{ textAlign: "center" }}
                text={"#donaldloe44645"}
                color={theme.colors.text_light_black}
              />
            </View>
          </View>
          <View style={styles.line} />
          <View style={appStyles.rowjustify}>
            <CustomText
              text={"Change theme"}
              fontWeight="700"
              color="#10101E"
              fontFam={fonts.PlusJakartaSans_Bold}
              size={27}
            />
            <View style={{ flexDirection: "row", gap: sizeHelper.calWp(20) }}>
              <CustomText
                text={"Dark"}
                color={!isDarkMode ? theme.colors.black : theme.colors.gray100}
                fontFam={
                  !isDarkMode
                    ? fonts.PlusJakartaSans_Bold
                    : fonts.PlusJakartaSans_Regular
                }
                size={25}
              />
              <SwitchToggle
                switchOn={isDarkMode}
                onPress={() => setIsDarkMode(!isDarkMode)}
                circleColorOff="#ffff"
                circleColorOn="#ffff"
                backgroundColorOn="#0063B8"
                backgroundColorOff="#717D88"
                containerStyle={{
                  ...styles.containerStyle,
                  padding: isDarkMode ? 10 : 0,
                }}
                circleStyle={styles.circleStyle}
              />

              <CustomText
                text={"Light"}
                color={isDarkMode ? theme.colors.black : theme.colors.gray100}
                fontFam={
                  isDarkMode
                    ? fonts.PlusJakartaSans_Bold
                    : fonts.PlusJakartaSans_Regular
                }
                size={25}
              />
            </View>
          </View>
          <View style={styles.line} />

          <InfoDetail icon={icons.protection} title={"Account Details"} />
          <View style={styles.line} />
          <InfoDetail icon={icons.documents} title={"Documents"} />
          <View style={styles.line} />
          <InfoDetail icon={icons.language} isLanguage title={"Language"} />
          <View style={styles.line} />
        </View>
        <View style={styles.botttom}>
          <View
            style={{
              ...appStyles.row,
              gap: sizeHelper.calWp(30),
              padding: sizeHelper.calWp(25),
              borderWidth: 1,
              borderColor: theme.colors.primary,
              backgroundColor: "#E9F4FE",
              borderRadius: sizeHelper.calWp(30),
            }}
          >
            <Image
              source={icons.contact_support}
              style={{
                width: sizeHelper.calWp(80),
                height: sizeHelper.calWp(80),
                resizeMode: "contain",
              }}
            />
            <View style={{ gap: sizeHelper.calWp(15) }}>
              <CustomText
                text={"Contact Support!"}
                fontWeight="600"
                fontFam={fonts.PlusJakartaSans_Medium}
                size={22}
                color={theme.colors.primary}
              />
              <CustomText
                text={"Tell us how can we help you?"}
                fontWeight="700"
                fontFam={fonts.PlusJakartaSans_Bold}
                size={26}
                color={theme.colors.text_black}
              />
            </View>
          </View>
          <CustomButton
            onPress={() => navigation.navigate("BottomTab")}
            text="Logout"
            bgColor={theme.colors.red100}
            width={"100%"}
          ></CustomButton>
        </View>
      </ScreenLayout>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  botttom: {
    gap: sizeHelper.calHp(30),
    paddingBottom: sizeHelper.calWp(40),
  },
  biomatric_btn: {
    width: "100%",
    height: sizeHelper.calHp(80),
    backgroundColor: theme.colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: sizeHelper.calHp(18),
    flexDirection: "row",
    gap: sizeHelper.calWp(15),
  },
  line: {
    width: "100%",
    height: sizeHelper.calHp(2),
    backgroundColor: theme?.colors.input_field_stroke,
  },
  containerStyle: {
    width: sizeHelper.calWp(90),
    height: sizeHelper.calHp(43),
    borderRadius: 25,
    // padding: 5,
  },
  circleStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  userImgContainer: {
    width: sizeHelper.calWp(180),
    height: sizeHelper.calWp(180),
    borderRadius: sizeHelper.calWp(180),
    backgroundColor: theme.colors.input_field_stroke,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    position: "absolute",
    bottom: sizeHelper.calHp(-5),
    width: sizeHelper.calWp(65),
    height: sizeHelper.calWp(65),
    borderRadius: sizeHelper.calWp(65),
    backgroundColor: theme.colors.secondary,
    borderWidth: sizeHelper.calWp(5),
    right: sizeHelper.calWp(-5),
    borderColor: theme.colors.light_white,
    alignItems: "center",
    justifyContent: "center",
  },
});
