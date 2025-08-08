import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import TopHeader from "../../../components/TopHeader";
import CustomText from "../../../components/CustomText";
import CustomInput from "../../../components/CustomInput";
import { images } from "../../../assets/images";
import CustomButton from "../../../components/CustomButton";
import CustomAlertModal from "../../../components/CustomAlertModal";
import AbsoluateView from "../../../components/AbsoluateView";
import CustomToast from "../../../components/CustomToast";
import { ApiServices } from "../../../apis/ApiServices";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../redux/reducers/authReducer";
import { sessionCheck } from "../../../utils/CommonHooks";

const ChangePasswordScreen = ({ navigation }: any) => {
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const token = useSelector(getToken);
  const [laoding, setlaoding] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    new_password_error: "",
    new_confirm_password_error: "",
  });

  const [values, setValues] = useState({
    current_password: "",
    new_password: "",
    new_confirm_password: "",
    show_current_password: true,
    show_new_password: true,
    show_new_confirm_password: true,
  });

  const onChangePassword = () => {
    Keyboard.dismiss();
    if (!values.current_password) {
      setMessage("Current Passowrd is required");
      setIsMessage(true);

      return;
    }
    if (!values.new_password) {
      setMessage("New Passowrd is required");
      setIsMessage(true);
      return;
    }
    if (values.new_password.length < 8) {
      setMessage("New password must be at least 8 characters");
      setIsMessage(true);

      return;
    }
    if (!values.new_confirm_password) {
      setMessage("Confirm Passowrd is required");
      setIsMessage(true);
      return;
    }
    if (values.new_password != values.new_confirm_password) {
      setMessage("Confirm Passowrd not match");
      setIsMessage(true);
      return;
    }

    let data = {
      current_password: values.current_password,
      new_password: values.new_password,
      new_confirm_password: values.new_confirm_password,
    };

    var raw = JSON.stringify(data);

    let params = {
      data: raw,
      token: token,
    };
    setlaoding(true);

    ApiServices.ChangePassword(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.success) {
          setlaoding(false);
          setIsSuccessModal(true);
        } else {
          if (result?.error == "Invalid token") {
            sessionCheck(dispatch, navigation);
            setlaoding(false);

            return;
          }
          setlaoding(false);
          setMessage(result?.error);
          setIsMessage(true);
          // Alert.alert("", result?.errors);
        }
      } else {
        setlaoding(false);
        setMessage("Something went wrong");
        setIsMessage(true);

        console.log("Response", response);
      }
    });
  };
  return (
    <>
      <ScreenLayout
        style={{
          paddingHorizontal: scale(20),
          gap: verticalScale(20),
        }}
      >
        <Pressable
          onPress={() => Keyboard.dismiss()}
          style={{ flex: 1, gap: verticalScale(20) }}
        >
          <TopHeader title="Change Password" />
          <View style={{ flex: 1, gap: verticalScale(20) }}>
            <CustomText
              text={
                "To update your password, please enter your current password and your new password."
              }
              size={14}
            />
            <CustomInput
              value={values.current_password}
              secureTextEntry={values.show_current_password}
              onShowPassword={() =>
                setValues({
                  ...values,
                  show_current_password: !values.show_current_password,
                })
              }
              onChangeText={(txt: any) => {
                setValues({ ...values, current_password: txt });
              }}
              placeholder="Current Password"
              rightSource={images.eye}
            />
            <CustomInput
              value={values.new_password}
              error={errors.new_password_error}
              secureTextEntry={values.show_new_password}
              onShowPassword={() =>
                setValues({
                  ...values,
                  show_new_password: !values.show_new_password,
                })
              }
              onChangeText={(txt: any) => {
                setValues({ ...values, new_password: txt });
                if (!txt) {
                  setErrors({ ...errors, new_password_error: "" });
                  return;
                }
                if (txt.length < 8) {
                  setErrors({
                    ...errors,
                    new_password_error:
                      "password must be at least 8 characters",
                  });
                } else {
                  setErrors({ ...errors, new_password_error: "" });
                }
              }}
              placeholder="New Password"
              rightSource={images.eye}
            />
            <CustomInput
              placeholder="Confirm New Password"
              secureTextEntry={values.show_new_confirm_password}
              onShowPassword={() =>
                setValues({
                  ...values,
                  show_new_confirm_password: !values.show_new_confirm_password,
                })
              }
              rightSource={images.eye}
              onChangeText={(txt: any) => {
                setValues({ ...values, new_confirm_password: txt });
              }}
            />
          </View>

          <View style={styles.continueBtnContainer}>
            <CustomButton
              onPress={onChangePassword}
              isLoading={laoding}
              text="Change Password"
            />
          </View>
        </Pressable>
      </ScreenLayout>

      <CustomAlertModal
        buttonTitle={"Great!"}
        icon={images.check}
        modalVisible={isSuccessModal}
        title={"Password Changed"}
        des={"Your password has been updated successfully"}
        setModalVisible={setIsSuccessModal}
        onPress={() => {
          setIsSuccessModal(false);
          setTimeout(() => {
            navigation.goBack();
          }, 500);
        }}
      />

      {laoding && <AbsoluateView />}
      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        // color={colors.white}
      />
    </>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  continueBtnContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: verticalScale(40),
  },
});
