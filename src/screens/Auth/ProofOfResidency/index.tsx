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
import CountryDropdown from "../../../components/CountryDropdown";
import { countryData } from "../../../utils/Data";

const ProofOfResidency = ({ navigation }: any) => {
  const [verificationMethod, setVerificationMethod] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({});
  const VerificationMethodBox = ({ title, selected, onPress }: any) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.verificationBox}>
        <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
          <TouchableOpacity
            onPress={onPress}
            style={{
              borderColor:
                selected == title
                  ? theme.colors.primary
                  : theme.colors.input_field_stroke,
              width: sizeHelper.calWp(32),
              height: sizeHelper.calWp(32),
              borderRadius: sizeHelper.calWp(7),
              borderWidth: 1,

              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
            }}
          >
            <Image
              style={{
                width: "50%",
                height: "50%",
                tintColor:
                  selected == title
                    ? theme.colors.primary
                    : theme.colors.input_field_stroke,
              }}
              source={icons.check}
            />
          </TouchableOpacity>

          <CustomText size={22} text={title} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ScreenLayout
        style={{
          flex: 1,
          paddingHorizontal: sizeHelper.calWp(30),
          gap: sizeHelper.calWp(30),
        }}
      >
        <View style={{ flex: 1, gap: sizeHelper.calHp(20) }}>
          <CustomHeader />
          <View style={{ gap: sizeHelper.calHp(20) }}>
            <CustomText
              text={"Proof of Residency"}
              fontWeight="700"
              // fontFam={fonts.Inter_Bold}
              size={33}
            />
            <CustomText
              color={theme.colors.gray}
              style={{ marginRight: sizeHelper.calWp(30) }}
              size={21}
              text={
                "Take a clear photo of your ID. Make sure all details are visible, and the image is not blurry or cropped."
              }
            />
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ gap: sizeHelper.calWp(25) }}>
              <CountryDropdown
                placeholder={"Select country"}
                value={selectedCountry}
                backgroundColor={theme.colors.white}
                setValue={setSelectedCountry}
                data={countryData}
                label={"Nationality"}
                top={150}
              />

              <View style={{ gap: sizeHelper.calHp(20) }}>
                <CustomText
                  text={"Verification Method"}
                  fontWeight="700"
                  style={{
                    marginBottom: sizeHelper.calHp(10),
                    marginTop: sizeHelper.calHp(25),
                  }}
                  fontFam={fonts.PlusJakartaSans_Bold}
                  size={23}
                />
                <VerificationMethodBox
                  selected={verificationMethod}
                  onPress={() =>
                    setVerificationMethod("National Identity Card")
                  }
                  title={"National Identity Card"}
                />
                <VerificationMethodBox
                  title={"Passport"}
                  selected={verificationMethod}
                  onPress={() => setVerificationMethod("Passport")}
                />
                <VerificationMethodBox
                  title={"Driver License"}
                  selected={verificationMethod}
                  onPress={() => setVerificationMethod("Driver License")}
                />
              </View>
            </View>
          </View>

          <CustomButton
            style={{ bottom: "3%" }}
            onPress={() => navigation.navigate("PassportPhotoInstruction")}
            text="Continue"
            textColor={
              verificationMethod ? theme.colors.white : theme.colors.icon_gray
            }
            bgColor={
              verificationMethod
                ? theme.colors.primary
                : theme.colors.input_field_stroke
            }
            width={"100%"}
          />
        </View>
      </ScreenLayout>
    </>
  );
};

export default ProofOfResidency;

const styles = StyleSheet.create({
  verificationBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: sizeHelper.calWp(25),
    height: sizeHelper.calHp(80),
    alignItems: "center",
    borderColor: theme.colors.input_field_stroke,
    gap: sizeHelper.calWp(10),
    borderWidth: 1,
    borderRadius: sizeHelper.calWp(15),
    backgroundColor: theme.colors.white,
  },
});
