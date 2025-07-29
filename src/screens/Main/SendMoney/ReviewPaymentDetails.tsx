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
import ProgressHeader from "../../../components/SendMoney/ProgressHeader";

const ReviewPaymentDetails = ({ navigation }: any) => {
  const TransferDetailsData = [
    { title: "Amount Sent", des: "PKR 25,000" },
    { title: "Amount will Receive", des: "GBP £90.10" },
    { title: "Delivery Method", des: "Wise" },
    { title: "Fee", des: "PKR 800" },
    { title: "Exchange Rate", des: "0.0036 GBP" },
    { title: "Estimated Delivery", des: "2 hours" },
  ];

  const TransferDetails = ({ item }: any) => {
    return (
      <View style={appStyles.rowjustify}>
        <CustomText
          text={item?.title}
          size={23}
          color={theme.colors.light_black}
        />
        <CustomText
          text={item?.des}
          color={theme.colors.light_black}
          size={23}
        />
      </View>
    );
  };

  const PaymentSendContainer = () => {
    return (
      <View
        style={{
          padding: sizeHelper.calWp(20),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: theme.colors.white,
          borderRadius: sizeHelper.calWp(35),
          borderWidth: 1,
          borderColor: theme.colors.input_field_stroke,
        }}
      >
        <View style={{ flexDirection: "row", gap: sizeHelper.calWp(25) }}>
          <View
            style={{
              width: sizeHelper.calWp(100),
              height: sizeHelper.calWp(100),
              borderRadius: sizeHelper.calWp(100),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FBD9E4",
            }}
          >
            <Image
              style={{
                width: sizeHelper.calWp(27),
                height: sizeHelper.calWp(27),
              }}
              source={icons.up_arrow}
            />
          </View>
          <View style={{ gap: sizeHelper.calHp(5) }}>
            <CustomText
              text={"Sending to"}
              size={25}
              color={theme.colors.text_gray100}
            />
            <CustomText
              text={"Barry Hauck"}
              fontWeight="700"
              size={25}
              fontFam={fonts.PlusJakartaSans_Bold}
            />
          </View>
        </View>
        <View style={{ alignItems: "flex-end", gap: sizeHelper.calHp(10) }}>
          <CustomText
            text={"PKR 25,000"}
            size={23}
            color={theme.colors.gray100}
          />
          <CustomText
            text={"- GBP £90.10"}
            fontWeight="700"
            size={25}
            color={theme.colors.warning}
            fontFam={fonts.PlusJakartaSans_SemiBold}
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
          gap: sizeHelper.calWp(30),
        }}
      >
        <View style={{ flex: 1, gap: sizeHelper.calHp(20) }}>
          <ProgressHeader label={"3/4 Review & Confirm"} progress={150} />

          <View
            style={{
              flex: 1,
              gap: sizeHelper.calWp(20),
              paddingHorizontal: sizeHelper.calWp(30),
            }}
          >
            <CustomText
              text={"Review payment details"}
              fontWeight="700"
              fontFam={fonts.PlusJakartaSans_Bold}
              size={33}
            />
            <CustomText
              color={theme.colors.gray}
              style={{ marginRight: sizeHelper.calWp(30) }}
              size={21}
              text={"Review your transition details before you send"}
            />
            <View style={{ height: sizeHelper.calHp(10) }} />
            <PaymentSendContainer />

            <View
              style={{
                ...styles.box,
                borderWidth: -1,
                paddingBlock: sizeHelper.calWp(30),
              }}
            >
              <View style={{ gap: sizeHelper.calHp(20) }}>
                <View style={appStyles.rowjustify}>
                  <CustomText
                    text={"Transfer details"}
                    fontWeight="700"
                    size={27}
                    fontFam={fonts.PlusJakartaSans_Bold}
                  />
                  <CustomText
                    color={theme.colors.primary}
                    textDecorationLine="underline"
                    size={23}
                    text={"Change"}
                  />
                </View>
                <View
                  style={{
                    width: "100%",
                    height: sizeHelper.calHp(1.5),
                    backgroundColor: theme.colors.input_field_stroke,
                  }}
                />
              </View>
              {TransferDetailsData.map((item, index) => {
                return <TransferDetails item={item} />;
              })}
            </View>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: sizeHelper.calWp(30),
            paddingBottom: sizeHelper.calHp(60),
          }}
        >
          <CustomButton
            onPress={() => navigation.navigate("PaymentComplete")}
            text="Confirm and Send"
            width={"100%"}
          />
          <TouchableOpacity
            style={{ padding: sizeHelper.calWp(20), alignSelf: "center" }}
          >
            <CustomText
              text={"Cancel Payment"}
              color={theme.colors.gray100}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </ScreenLayout>
    </>
  );
};

export default ReviewPaymentDetails;

const styles = StyleSheet.create({
  box: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.input_field_stroke,
    padding: sizeHelper.calWp(20),
    borderRadius: sizeHelper.calWp(30),
    gap: sizeHelper.calHp(20),
  },
});
