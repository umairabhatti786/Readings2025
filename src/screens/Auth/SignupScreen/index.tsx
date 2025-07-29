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

const SignupScreen = ({ navigation }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <ScreenLayout
        style={appStyles.screenLayout}
      >
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, gap: sizeHelper.calHp(20) }}>
            <CustomHeader />
            <View style={{ gap: sizeHelper.calHp(20) }}>
              <CustomText
                text={"Create Your Free Account"}
                fontWeight="700"
                size={33}
              />
              <CustomText
                color={theme.colors.gray}
                style={{ marginRight: sizeHelper.calWp(30) }}
                size={21}
                text={
                  "Send money in minutes. Safe, secure, and trusted worldwide."
                }
              />
            </View>

            <View style={{ flex: 1 }}>
              <View style={{ gap: sizeHelper.calWp(25) }}>
                <CustomInput
                  label={"Name"}
                  value={values.email}
                  leftSource={icons.user}
                  placeholder="Full name"
                  onChangeText={(txt: string) =>
                    setValues({ ...values, email: txt })
                  }
                />
                <CustomInput
                  label={"Email"}
                  value={values.email}
                  leftSource={icons.email}
                  placeholder="Email address"
                  onChangeText={(txt: string) =>
                    setValues({ ...values, email: txt })
                  }
                />
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
                />
                <CustomInput
                  label={"Re-type password"}
                  value={values.password}
                  placeholder="Password"
                  leftSource={icons.lock}
                  rightSource={showPassword ? icons.eye : icons.eye_off}
                  secureTextEntry={showPassword}
                  rightIconPress={() => setShowPassword(!showPassword)}
                  onChangeText={(txt: string) =>
                    setValues({ ...values, password: txt })
                  }
                />
              </View>
            </View>

            <View style={styles.botttom}>
              <CustomButton
                onPress={() => navigation.navigate("YourIdentity")}
                text="Signup"
                width={"100%"}
              />

              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
                style={{
                  ...appStyles.row,
                  gap: sizeHelper.calWp(10),
                  alignSelf: "center",
                }}
              >
                <CustomText
                  text={"Already have an account?"}
                  fontWeight="600"
                  fontFam={fonts.PlusJakartaSans_Medium}
                />
                <CustomText
                  text={"Login"}
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

export default SignupScreen;

const styles = StyleSheet.create({
  botttom: {
    gap: sizeHelper.calHp(20),
    paddingTop: Platform.OS == "ios" ? "50%" : "55%",
  },
});
