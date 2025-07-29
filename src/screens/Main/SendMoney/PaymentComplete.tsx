import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomButton from "../../../components/Button";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import images from "../../../utils/Constants/images";
import ProgressHeader from "../../../components/SendMoney/ProgressHeader";

const PaymentComplete = ({ navigation }: any) => {
  return (
    <>
      <ScreenLayout
        style={{
          flex: 1,
          gap: sizeHelper.calWp(30),
        }}
      >
        <View style={{ flex: 1, gap: sizeHelper.calHp(20) }}>
          <ProgressHeader label={"Payment Complete"} progress={200} />

          <View
            style={{
              flex: 1,
              gap: sizeHelper.calWp(25),
              paddingHorizontal: sizeHelper.calWp(30),
              paddingTop: "30%",
              alignItems: "center",
            }}
          >
            <Image
              source={images.payment_completed}
              style={{
                width: sizeHelper.calWp(250),
                height: sizeHelper.calWp(250),
              }}
              resizeMode={"contain"}
            />
            <CustomText
              text={"Transfer Sent\nSuccessfully!"}
              fontWeight="700"
              fontFam={fonts.PlusJakartaSans_Bold}
              size={40}
            />

            <CustomText
              color={theme.colors.gray}
              style={{
                marginHorizontal: sizeHelper.calWp(100),
                textAlign: "center",
              }}
              size={25}
              text={"Barry will receive £90.10 within 2 hours."}
            />

            <CustomButton
              onPress={() => navigation.navigate("BottomTab")}
              text="Share Receipt"
              style={{ marginTop: sizeHelper.calHp(50) }}
              width={"100%"}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("BottomTab")}
              style={{ padding: sizeHelper.calWp(20), alignSelf: "center" }}
            >
              <CustomText
                text={"Go to home"}
                fontWeight="600"
                fontFam={fonts.PlusJakartaSans_SemiBold}
                color={theme.colors.gray100}
                size={23}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScreenLayout>
    </>
  );
};

export default PaymentComplete;

const styles = StyleSheet.create({});
