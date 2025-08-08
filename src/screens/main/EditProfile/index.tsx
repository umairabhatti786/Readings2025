import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Keyboard, Pressable } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import TopHeader from "../../../components/TopHeader";
import CustomText from "../../../components/CustomText";
import CustomInput from "../../../components/CustomInput";
import { images } from "../../../assets/images";
import CustomButton from "../../../components/CustomButton";
import CustomCountryPicker from "../../../components/CustomCountryPicker";
import { appStyles } from "../../../utils/AppStyles";
import { numericRegex, phoneRegex } from "../../../utils/Regex";
import { ApiServices } from "../../../apis/ApiServices";
import { useDispatch, useSelector } from "react-redux";
import { getToken, setAuthData } from "../../../redux/reducers/authReducer";
import AbsoluateView from "../../../components/AbsoluateView";
import CustomToast from "../../../components/CustomToast";
import { parsePhoneNumber,isValidPhoneNumber } from "libphonenumber-js";
import { getFormattedPhoneNumber, sessionCheck } from "../../../utils/CommonHooks";
import { AUTHDATA, StorageServices } from "../../../utils/StorageService";

const EditProfileScreen = ({ navigation, route }: any) => {
  const profile = route?.params?.data;
  console.log("profile", profile);
  const [laoding, setlaoding] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const token = useSelector(getToken);
  const dispatch=useDispatch()
  const [errors, setErrors] = useState({
    email_error: "",
    phone_error: "",
  });
  const parsedNumber:any = profile?.phone ? getFormattedPhoneNumber(profile?.phone) : null;
  const countryCallingCode = parsedNumber && parsedNumber.countryCallingCode;
  const [country, setCountry] = useState<any>(
    countryCallingCode ? countryCallingCode : "92"
  );

  console.log("parsedNumber",profile?.phone)
  const [values, setValues] = useState({
    first_name: profile?.first_name,
    last_name: profile?.last_name,
    phone: parsedNumber ? parsedNumber.nationalNumber : "",
  });

  const onEditProfile = () => {
    Keyboard.dismiss();
    if (!values.first_name) {
      setMessage("First Name is required");
      setIsMessage(true);

      return;
    }
    if (!values.last_name) {
      setMessage("Last Name is required");
      setIsMessage(true);

      return;
    }

    if (!values.phone) {
      setMessage("Phone Number is required");
      setIsMessage(true);

      return;
    }
    if (!getFormattedPhoneNumber("+" + country+values.phone)) {
      setMessage("phone number is invalid");
      setIsMessage(true);
      return;
    }

    setlaoding(true);
    let data = {
      phone: "+" + country + values.phone,
      first_name: values.first_name,
      last_name: values.last_name,
    };
    var raw = JSON.stringify(data);
    let params = {
      data: raw,
      token: token,
    };

    ApiServices.EditProfile(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.success) {
          console.log("result",result)
          dispatch(setAuthData(result?.data?.user));
          StorageServices.setItem(AUTHDATA,result?.data?.user)
          setlaoding(false);
          navigation.goBack();
        } else {
          if (result?.error == "Invalid token") {
            sessionCheck(dispatch, navigation);
            setlaoding(false);


            return;
          }
          setlaoding(false);
          setMessage(result?.error);
          setIsMessage(true);
          console.log("result", result);
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
        <KeyboardAvoidingView
          behavior={"height"}
          // keyboardVerticalOffset={10}
          style={{ ...appStyles.main, gap: verticalScale(20) }}
        >
          <TopHeader title="Edit Profile" />
          <Pressable 
          onPress={()=>Keyboard.dismiss()}
          style={{ flex: 1, gap: verticalScale(20)}}>
            <CustomText
              text={
                "You can edit your name and phone number below."
              }
              size={14}
            />
            <View style={appStyles.rowjustify}>
              <CustomInput
                value={values.first_name}
                width={"47%"}
                placeholder="First Name"
                onChangeText={(txt: any) => {
                  setValues({ ...values, first_name: txt });
                }}
              />
              <CustomInput
                value={values.last_name}
                width={"47%"}
                placeholder="Last Name"
                onChangeText={(txt: any) => {
                  setValues({ ...values, last_name: txt });
                }}
              />
            </View>
            <CustomCountryPicker
              placeholder="345 123 456 7"
              country={country}
              countryName={parsedNumber? parsedNumber.country : "PK"}
              error={errors.phone_error}
              setCountry={setCountry}
              value={values.phone}
              onChangeText={(value: any) => {
                if (value.length == 0) {
                  setErrors({ ...errors, phone_error: "" });
                  setValues({ ...values, phone: "" });
                }
                if (value.length > 0) {
                  if (!numericRegex.test(value)) {
                    return;
                  }
                  setValues({ ...values, phone: value });
                  let isValid =getFormattedPhoneNumber("+" + country+value);
                  if (isValid) {
                    setErrors({ ...errors, phone_error: "" });
                    setValues({ ...values, phone: value });
                  } else {
                    setErrors({
                      ...errors,
                      phone_error: "phone number is invalid",
                    });
                  }
                }
              }}
            />
          </Pressable>

          <View style={styles.continueBtnContainer}>
            <CustomButton
              text="Save Info"
              isLoading={laoding}
              onPress={onEditProfile}
              // style={{marginTop: verticalScale(20)}}
            />
          </View>
        </KeyboardAvoidingView>
      </ScreenLayout>
      {laoding && <AbsoluateView />}
      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
      />
    </>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  continueBtnContainer: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: verticalScale(40),
  },
});
