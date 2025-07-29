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
import images from "../../../utils/Constants/images";
import ProgressHeader from "../../../components/SendMoney/ProgressHeader";
import CustomInput from "../../../components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EnterAmount = ({ navigation }: any) => {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const checkDisable = () => {
    if (!fromAmount) {
      return false;
    }
    if (!toAmount) {
      return false;
    }

    return true;
  };

  return (
    <>
      <ScreenLayout
        style={{
          flex: 1,
          gap: sizeHelper.calWp(30),
        }}
      >
        <KeyboardAwareScrollView style={{ flex: 1, gap: sizeHelper.calHp(20) }}>
          <ProgressHeader label={"2/4 Delivery Method"} progress={100} />

          <View
            style={{
              flex: 1,
              gap: sizeHelper.calWp(20),
              paddingHorizontal: sizeHelper.calWp(30),
            }}
          >
            <CustomText
              text={"Enter amount"}
              fontWeight="700"
              fontFam={fonts.PlusJakartaSans_Bold}
              size={33}
            />
            <CustomText
              color={theme.colors.gray}
              style={{ marginRight: sizeHelper.calWp(30) }}
              size={21}
              text={"Enter the amount you like to send "}
            />
            <View style={{ height: sizeHelper.calHp(10) }} />

            <View
              style={{
                ...styles.box,
                borderWidth: -1,
                paddingBlock: sizeHelper.calWp(30),
              }}
            >
              <View
                style={{
                  ...styles.box,
                  borderRadius: sizeHelper.calWp(20),
                  gap: sizeHelper.calHp(10),
                }}
              >
                <View style={appStyles.rowjustify}>
                  <CustomText
                    color={theme.colors.input_field_stroke}
                    text={"From"}
                  />
                  <CustomText color={theme.colors.black} text={"UK Pound"} />
                  <View style={{ ...appStyles.row, gap: sizeHelper.calWp(5) }}>
                    <Image
                      style={{
                        width: sizeHelper.calWp(30),
                        height: sizeHelper.calWp(30),
                      }}
                      source={images.united_kingdom}
                    />
                    <CustomText color={theme.colors.black} text={"UK"} />
                  </View>
                </View>

                <CustomInput
                  placeholder=""
                  textAlign={"center"}
                  fontWeight={"600"}
                  keyboard={"number-pad"}
                  fontFamily={fonts.PlusJakartaSans_SemiBold}
                  fontSize={25}
                  value={fromAmount}
                  onChangeText={(txt: any) => setFromAmount(txt)}
                  backgroundColor={theme.colors.white}
                />
              </View>
              <View style={styles.switchContainer}>
                <Image
                  source={icons.arrow_switch_vertical}
                  style={{
                    width: sizeHelper.calWp(38),
                    height: sizeHelper.calWp(38),
                  }}
                  resizeMode={"contain"}
                />
              </View>
              <View
                style={{
                  ...styles.box,
                  borderRadius: sizeHelper.calWp(20),
                  gap: sizeHelper.calHp(10),
                }}
              >
                <View style={appStyles.rowjustify}>
                  <CustomText
                    color={theme.colors.input_field_stroke}
                    text={"From"}
                  />
                  <CustomText
                    color={theme.colors.black}
                    text={"Pakistani Rupee"}
                  />
                  <View style={{ ...appStyles.row, gap: sizeHelper.calWp(5) }}>
                    <Image
                      style={{
                        width: sizeHelper.calWp(30),
                        height: sizeHelper.calWp(30),
                      }}
                      source={images.pakistan}
                    />
                    <CustomText color={theme.colors.black} text={"PK"} />
                  </View>
                </View>

                <CustomInput
                  textAlign={"center"}
                  placeholder=""
                  fontWeight={"600"}
                  keyboard={"number-pad"}
                  fontFamily={fonts.PlusJakartaSans_SemiBold}
                  fontSize={25}
                  value={toAmount}
                  onChangeText={(txt: any) => setToAmount(txt)}
                  backgroundColor={theme.colors.white}
                />
              </View>
            </View>

            <View
              style={{
                ...appStyles.rowjustify,
                backgroundColor: theme.colors.green100,
                padding: sizeHelper.calWp(15),
                borderRadius: sizeHelper.calWp(20),
              }}
            >
              <View style={{ flexDirection: "row", gap: sizeHelper.calWp(10) }}>
                <CustomText
                  color={theme.colors.white}
                  size={21}
                  text={"Exchange rate"}
                />
                <Image
                  source={icons.info}
                  style={{
                    width: sizeHelper.calWp(38),
                    height: sizeHelper.calWp(38),
                  }}
                  resizeMode={"contain"}
                />
              </View>

              <CustomText
                color={theme.colors.white}
                size={22}
                fontWeight="700"
                text={"1 GBP = 467.77 PKR"}
              />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: sizeHelper.calWp(30),
              paddingBottom: sizeHelper.calHp(60),
              paddingTop: "60%",
            }}
          >
            <CustomButton
              onPress={() => navigation.navigate("ReviewPaymentDetails")}
              text="Next"
              textColor={
                checkDisable() ? theme.colors.white : theme.colors.icon_gray
              }
              bgColor={
                checkDisable()
                  ? theme.colors.primary
                  : theme.colors.input_field_stroke
              }
              width={"100%"}
            />
          </View>
        </KeyboardAwareScrollView>
      </ScreenLayout>
    </>
  );
};

export default EnterAmount;

const styles = StyleSheet.create({
  box: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.input_field_stroke,
    padding: sizeHelper.calWp(20),
    borderRadius: sizeHelper.calWp(30),
    gap: sizeHelper.calHp(20),
  },
  switchContainer: {
    width: sizeHelper.calWp(70),
    height: sizeHelper.calWp(70),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.input_field_stroke,
    borderRadius: sizeHelper.calWp(70),
    alignSelf: "center",
  },
});
