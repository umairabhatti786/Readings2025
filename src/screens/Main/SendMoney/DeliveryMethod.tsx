import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform, Keyboard } from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomButton from "../../../components/Button";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import CountryDropdown from "../../../components/CountryDropdown";
import images from "../../../utils/Constants/images";
import ProgressHeader from "../../../components/SendMoney/ProgressHeader";
import CustomInput from "../../../components/Input";

const DeliveryMethod = ({ navigation }: any) => {
  const [selectedMethod, setSelectedMethod] = useState({});
  const [accountName, setAccountName] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const MethodData = [
    { icon: images.bank_transfer, name: "Bank Transfer", id: 1 },
    { icon: images.wise, name: "Wise", id: 1 },
    { icon: images.taptap_send, name: "Taptap Send", id: 1 },
    { icon: images.ace_money, name: "ACE Money Transfer", id: 1 },
  ];

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardVisible(false)
    );
  
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const checkDisable = () => {
    if (!accountEmail) {
      return false;
    }
    if (!accountName) {
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
        <View style={{ flex: 1, gap: sizeHelper.calHp(20) }}>
          <ProgressHeader label={"2/4 Delivery Method"} progress={100} />

          <View
            style={{
              flex: 1,
              gap: sizeHelper.calWp(20),
              paddingHorizontal: sizeHelper.calWp(30),
            }}
          >
            <CustomText
              text={"Delivery Method"}
              fontWeight="700"
              fontFam={fonts.PlusJakartaSans_Bold}
              size={33}
            />
            <CustomText
              color={theme.colors.gray}
              style={{ marginRight: sizeHelper.calWp(30) }}
              size={21}
              text={"Select a method you like to payout"}
            />
            <View style={{ height: sizeHelper.calHp(10) }} />
            <CountryDropdown
              iconSize={70}
              placeholder={"Choose a delivery method"}
              value={selectedMethod}
              backgroundColor={theme.colors.white}
              setValue={setSelectedMethod}
              data={MethodData}
            />
            {Object.keys(selectedMethod).length > 0 && (
              <View
                style={{
                  backgroundColor: theme.colors.white,
                  borderWidth: 1,
                  borderColor: theme.colors.input_field_stroke,
                  padding: sizeHelper.calWp(20),
                  borderRadius: sizeHelper.calWp(30),
                  gap: sizeHelper.calHp(20),
                }}
              >
                <CustomText
                  color={theme.colors.black}
                  size={27}
                  fontWeight="700"
                  fontFam={fonts.PlusJakartaSans_Bold}
                  text={"Wise account details"}
                />
                <View style={{ gap: sizeHelper.calWp(20) }}>
                  <CustomInput
                    placeholder="Name"
                    value={accountName}
                    onChangeText={(txt: any) => setAccountName(txt)}
                    backgroundColor={theme.colors.white}
                  />
                  <CustomInput
                    placeholder="Email"
                    onChangeText={(txt: any) => setAccountEmail(txt)}
                    backgroundColor={theme.colors.white}
                  />
                </View>
              </View>
            )}
          </View>
          <View
            style={{
              paddingHorizontal: sizeHelper.calWp(30),
              paddingBottom: sizeHelper.calHp(keyboardVisible?30 :60),
            }}
          >
            <CustomButton
              onPress={() => navigation.navigate("EnterAmount")}
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
        </View>
      </ScreenLayout>
    </>
  );
};

export default DeliveryMethod;

const styles = StyleSheet.create({

});
