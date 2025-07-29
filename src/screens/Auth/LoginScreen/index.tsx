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
import CustomInput from "../../../components/Input";
import { appStyles } from "../../../utils/GlobalStyles";
import icons from "../../../utils/Constants/icons";
import CustomHeader from "../../../components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginScreen = ({ navigation }: any) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <ScreenLayout style={appStyles.screenLayout}>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, gap: sizeHelper.calHp(20) }}>
            <CustomHeader />
            <View style={{ gap: sizeHelper.calHp(20) }}>
              <CustomText text={"Login"} fontWeight="700" size={33} />
              <CustomText
                color={theme.colors.gray}
                style={{ marginRight: sizeHelper.calWp(30) }}
                size={21}
                text={
                  "Login to access your account and take control of your finances"
                }
              />
            </View>

            <View style={{ flex: 1 }}>
              <View style={{ gap: sizeHelper.calWp(25) }}>
                <CustomInput
                  label={"Email"}
                  value={values.email}
                  leftSource={icons.email}
                  placeholder="Email address"
                  focusedInput={focusedInput}
                  onChangeText={(txt: string) =>
                    setValues({ ...values, email: txt })
                  }
                  setFocusedInput={setFocusedInput}
                  inputKey="email"
                />
                <View>
                  <CustomInput
                    label={"Password"}
                    value={values.password}
                    placeholder="Password"
                    leftSource={icons.lock}
                    rightSource={showPassword ? icons.eye : icons.eye_off}
                    secureTextEntry={showPassword}
                    rightIconPress={() => setShowPassword(!showPassword)}
                    onChangeText={(txt: string) =>
                      setValues({ ...values, password: txt })
                    }
                    focusedInput={focusedInput}
                    setFocusedInput={setFocusedInput}
                    inputKey="password"
                  />

                  <TouchableOpacity
                    onPress={() => navigation.navigate("EnterEmailScreen")}
                    style={{
                      flexDirection: "row",
                      alignSelf: "flex-end",
                      paddingVertical: sizeHelper.calHp(5),
                    }}
                  >
                    <CustomText
                      text={"Forgot Password?"}
                      fontWeight="600"
                      fontFam={fonts.PlusJakartaSans_SemiBold}
                      color={theme.colors.gray}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.botttom}>
              <CustomButton
                onPress={() => navigation.navigate("BottomTab")}
                text="Login"
                width={"100%"}
              />

              <CustomText
                text={"Or login with"}
                color={theme.colors.gray100}
                style={{ textAlign: "center" }}
              />
              <TouchableOpacity style={styles.biomatric_btn}>
                <Image
                  source={icons.fingerpint}
                  style={{
                    width: sizeHelper.calWp(50),
                    height: sizeHelper.calWp(50),
                    resizeMode: "contain",
                  }}
                />
                <CustomText
                  text={"Biometric"}
                  fontWeight="600"
                  fontFam={fonts.PlusJakartaSans_SemiBold}
                  color={theme.colors.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignupScreen")}
                style={{
                  ...appStyles.row,
                  gap: sizeHelper.calWp(10),
                  alignSelf: "center",
                }}
              >
                <CustomText
                  text={"Don't have an account?"}
                  fontWeight="600"
                  fontFam={fonts.PlusJakartaSans_Medium}
                />
                <CustomText
                  text={"Register"}
                  fontWeight="700"
                  fontFam={fonts.PlusJakartaSans_Bold}
                  textDecorationLine="underline"
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScreenLayout>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  botttom: {
    gap: sizeHelper.calHp(20),
    paddingTop: Platform.OS == "ios" ? "67%" : "70%",
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
});
