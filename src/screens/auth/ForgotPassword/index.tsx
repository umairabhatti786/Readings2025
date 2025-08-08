import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../../utils/colors";
import TopHeader from "../../../components/TopHeader";
import CustomText from "../../../components/CustomText";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import CustomAlertModal from "../../../components/CustomAlertModal";
import { emailRegex } from "../../../utils/Regex";
import CustomToast from "../../../components/CustomToast";
import { ApiServices } from "../../../apis/ApiServices";
import AbsoluateView from "../../../components/AbsoluateView";

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [isModal, setIsModal] = useState(false);
  const [laoding, setlaoding] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [email_error, setEmail_error] = useState("");

  const onResetPassword = () => {
    Keyboard.dismiss();
    if (!email) {
      setMessage("Email is required");
      setIsMessage(true);
      // Alert.alert("", "Email is required");

      return;
    }
    if (!emailRegex.test(email)) {
      setMessage("Invalid Email Address");
      setIsMessage(true);
      return;
    }

    setlaoding(true);
    let data = {
      email: email,
    };
    var raw = JSON.stringify(data);

    ApiServices.ForgotPassswordEmail(
      raw,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.redirectUrl) {
            setlaoding(false);
            setIsModal(true);
          } else {
            setlaoding(false);
            setMessage(result?.error);
            setIsMessage(true);
          }
        } else {
          setlaoding(false);
          setMessage("Something went wrong");
          setIsMessage(true);
        }
      }
    );
  };
  return (
    <>
      <ScreenLayout
        style={{
          paddingHorizontal: scale(20),
          gap: verticalScale(20),
        }}
      >
        <KeyboardAvoidingView
          behavior={"height"}
          // keyboardVerticalOffset={  20}
          style={{ flex: 1, gap: verticalScale(20) }}
        >
          <TopHeader title="Forgot Password" />

          <CustomText
            text={
            "Enter your email address to reset your password"
            }
            size={14}
          />
          <CustomInput
            value={email}
            error={email_error}
            onChangeText={(txt: string) => {
              setEmail(txt);
              let isValid = emailRegex.test(txt);
              if (!txt) {
                setEmail_error("");
                return;
              }
              if (!isValid) {
                setEmail_error("Invalid Email Address");
              } else if (isValid) {
                setEmail_error("");
              }
            }}
            placeholder="Email Address"
          />

          <View style={styles.socialBtnContainer}>
            <CustomButton
              onPress={onResetPassword}
              isLoading={laoding}
              disable={email_error.length > 0}
              text="Reset Password"
              style={{ marginBottom: verticalScale(10) }}
            />
          </View>
        </KeyboardAvoidingView>
      </ScreenLayout>
      {laoding && <AbsoluateView />}

      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        color={colors.white}
      />

      <CustomAlertModal
        modalVisible={isModal}
        setModalVisible={setIsModal}
        onPress={() => {
          setIsModal(false);
          setTimeout(() => {
            navigation.goBack();
          }, 500);
        }}
      />
    </>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  line: { flex: 1, height: 1, backgroundColor: colors.dull_half_white },
  socialBtnContainer: {
    gap: verticalScale(17),
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingBottom: verticalScale(35),
  },
  orContainer: {
    gap: scale(20),
    alignSelf: "center",
    marginTop: verticalScale(40),
  },
});
