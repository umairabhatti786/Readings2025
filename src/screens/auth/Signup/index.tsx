import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../../utils/colors";
import TopHeader from "../../../components/TopHeader";
import CustomText from "../../../components/CustomText";
import CustomInput from "../../../components/CustomInput";
import { images } from "../../../assets/images";
import CustomButton from "../../../components/CustomButton";
import { appStyles } from "../../../utils/AppStyles";
import SocialButton from "../../../components/SocialButton";
import CheckBox from "../../../components/CheckBox";

import { emailRegex } from "../../../utils/Regex";
import { ApiServices } from "../../../apis/ApiServices";
import { useDispatch } from "react-redux";
import { setAuthData, setAuthToken } from "../../../redux/reducers/authReducer";
import CustomToast from "../../../components/CustomToast";
import AbsoluateView from "../../../components/AbsoluateView";
import {
  AUTHDATA,
  StorageServices,
  TOKEN,
} from "../../../utils/StorageService";

const SignupScreen = ({ navigation }: any) => {
  const [isAgree, setIsAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [laoding, setlaoding] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    email_error: "",
    password_error: "",
    password_confirmation_error: "",
    first_name_error: "",
    last_name_error: "",
  });

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // useEffect(() => {
  //   const configureGoogleSignIn = async () => {
  //     GoogleSignin.configure({
  //       webClientId:
  //         "236607339802-kal9e840h3mhhuvprhcqgb40jglpkj5l.apps.googleusercontent.com",
  //       offlineAccess: false, // if you want to access Google API on behalf of the user from your server
  //     });
  //     // /
  //   };
  //   configureGoogleSignIn();
  // }, []);
  // const _onGoogleSignup = async () => {
  //   GoogleSignin.configure();
  //   (await GoogleSignin.isSignedIn()) && (await GoogleSignin.signOut());
  //   try {
  //     await GoogleSignin.hasPlayServices({
  //       showPlayServicesUpdateDialog: true,
  //     });
  //     const userInfo = await GoogleSignin.signIn();

  //     if (userInfo) {
  //       const getToken = await GoogleSignin.getTokens();

  //       const googleCredential = auth.GoogleAuthProvider.credential(
  //         getToken?.idToken
  //       );
  //       const userCredential = await auth().signInWithCredential(
  //         googleCredential
  //       );

  //       // navigation.navigate("PersonalInfoScreen");
  //       // respanseData(userInfo);
  //     }
  //   } catch (error: any) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log("user cancelled the login flow");
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.log("operation (e.g. sign in) is in progress already");
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log("play services not available or outdated");
  //     } else {
  //       console.log("some other error happened", error.message);
  //     }
  //     // respanseData(null);
  //   }
  // };

  const onSignup = () => {
    Keyboard.dismiss();
    if (!values.email) {
      setMessage("Email is required");
      setIsMessage(true);

      return;
    }
    if (!emailRegex.test(values.email)) {
      setMessage("Invalid Email Address");
      setIsMessage(true);
      return;
    }
    if (!values.first_name) {
      setMessage("First Name is required");
      setIsMessage(true);

      return;
    }

    if (!values.last_name) {
      setMessage("last Name is required");
      setIsMessage(true);

      return;
    }
    if (!values.password) {
      setMessage("Passowrd is required");
      setIsMessage(true);

      return;
    }
    if (values.password.length < 8) {
      setMessage("password must be at least 8 characters");
      setIsMessage(true);

      return;
    }

    if (!values.password_confirmation) {
      setMessage("Confirm Passowrd is required");
      setIsMessage(true);
      return;
    }
    if (values.password != values.password_confirmation) {
      setMessage("Confirm Passowrd not match");
      setIsMessage(true);
      return;
    }
    if (!isAgree) {
      setMessage("Please agree Terms of Service");
      setIsMessage(true);
      return;
    }
    setlaoding(true);
    let data = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };
    var raw = JSON.stringify(data);

    ApiServices.Register(raw, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.success) {
          setlaoding(false);
          StorageServices.setItem(TOKEN, result?.data.token);
          dispatch(setAuthToken(result?.data.token));
          StorageServices.setItem(TOKEN, result?.data.token);
          dispatch(setAuthData(result?.data?.user));
          StorageServices.setItem(AUTHDATA, result?.data?.user);
          navigation.navigate("BottomTab");
        } else {
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

  // const onAppleSignup = async () => {
  //   const appleAuthRequestResponse = await appleAuth.performRequest({
  //     requestedOperation: appleAuth.Operation.LOGIN,
  //     requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //   });

  //   const credentialState = await appleAuth.getCredentialStateForUser(
  //     appleAuthRequestResponse.user
  //   );

  //   if (credentialState === appleAuth.State.AUTHORIZED) {
  //     const { email, fullName, user } = appleAuthRequestResponse;
  //     const { identityToken, nonce } = appleAuthRequestResponse;
  //     const appleCredential = auth.AppleAuthProvider.credential(
  //       identityToken,
  //       nonce
  //     );
  //     const firebaseUserCredential = await auth().signInWithCredential(
  //       appleCredential
  //     );
  //   }
  // };

  return (
    <>
      <ScreenLayout
        style={{
          paddingHorizontal: scale(20),
          // gap: verticalScale(20),
        }}
      >
        <View
          style={{
            paddingBottom: verticalScale(10),
          }}
        >
          <TopHeader title="Sign Up" />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: colors.dull_white, flex: 1 }}
          contentContainerStyle={{
            backgroundColor: colors.dull_white,
            gap: verticalScale(20),
            paddingTop: verticalScale(10),
          }}
        >
          <CustomText
            text={"Enter the following details to create an account"}
            size={14}
          />
          <CustomInput
            value={values.email}
            error={errors.email_error}
            onChangeText={(txt: string) => {
              setValues({ ...values, email: txt });
              let isValid = emailRegex.test(txt);
              if (!txt) {
                setErrors({ ...errors, email_error: "" });
                return;
              }
              if (!isValid) {
                setErrors({ ...errors, email_error: "Invalid Email Address" });
              } else if (isValid) {
                setErrors({ ...errors, email_error: "" });
              }
            }}
            placeholder="Email Address"
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
          <CustomInput
            value={values.password}
            error={errors.password_error}
            secureTextEntry={showPassword}
            onShowPassword={() => setShowPassword(!showPassword)}
            onChangeText={(txt: any) => {
              setValues({ ...values, password: txt });
              if (!txt) {
                setErrors({ ...errors, password_error: "" });
                return;
              }
              if (txt.length < 8) {
                setErrors({
                  ...errors,
                  password_error: "password must be at least 8 characters",
                });
              } else {
                setErrors({ ...errors, password_error: "" });
              }
            }}
            placeholder="Password"
            rightSource={images.eye}
          />
          <CustomInput
            placeholder="Confirm Password"
            error={errors.password_confirmation_error}
            value={values.password_confirmation}
            secureTextEntry={showConfirmPassword}
            onShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
            onChangeText={(txt: any) => {
              setValues({ ...values, password_confirmation: txt });
            }}
            rightSource={images.eye}
          />
          <View>
            <View
              style={{
                flexDirection: "row",
                gap: scale(10),
                // marginTop: verticalScale(8),
              }}
            >
              <CheckBox setIsActive={setIsAgree} isActive={isAgree} />
              <View style={{ marginTop: verticalScale(-3) }}>
              {/* By selecting this, you agree to our Terms of Service & Privacy Policy  */}
              <View style={{ ...appStyles.row, gap: scale(4) }}>
                <CustomText
                  text={"By selecting this, you agree to our"}
                  size={12}
                />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate("TermsAndCondirtions")}
                  >
                    <CustomText
                      color={colors.primary}
                      textDecorationLine="underline"
                      text={"Terms of Service"}
                      size={12}
                    />
                  </TouchableOpacity>
                 
                </View>

                <View style={{ ...appStyles.row, gap: scale(4) }}>
               
                  <CustomText text={"&"} size={12} />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate("PrivacyPolicy")}
                  >
                    <CustomText
                      color={colors.primary}
                      textDecorationLine="underline"
                      text={"Privacy Policy"}
                      size={12}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <CustomButton onPress={onSignup} isLoading={laoding} text="Sign Up" />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Login")}
            style={{ ...appStyles.row, gap: scale(4), width: "65%" }}
          >
            <CustomText text={"Already have an account?"} size={14} />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Login")}
            >
              <CustomText
                color={colors.primary}
                textDecorationLine="underline"
                text={"Login"}
                size={14}
              />
            </TouchableOpacity>
          </TouchableOpacity>

          {/* <View style={styles.socialBtnContainer}>
            <View style={{ ...appStyles.row, gap: scale(4) }}>
              <CustomText text={"Already have an account?"} size={14} />
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate("Login")}
              >
                <CustomText
                  color={colors.primary}
                  textDecorationLine="underline"
                  text={"Login"}
                  size={14}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...appStyles.row,
                ...styles.orContainer,
              }}
            >
              <View style={styles.line} />
              <CustomText text={"OR"} color={colors.grey} size={12} />
              <View style={styles.line} />
            </View>

            <View
              style={{
                gap: verticalScale(17),
              }}
            >
              <SocialButton
                onPress={_onGoogleSignup}
                icon={images.google}
                text="Continue with Google"
              />
              <SocialButton
                onPress={() => navigation.navigate("PersonalInfoScreen")}
                icon={images.facebook}
                text="Continue with facebook"
              />
              {Platform.OS == "ios" && (
                <SocialButton
                  icon={images.apple}
                  onPress={onAppleSignup}
                  text="Continue with Apple ID"
                />
              )}
            </View>
          </View> */}
        </ScrollView>
      </ScreenLayout>
      {laoding && <AbsoluateView />}
      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        color={colors.white}
      />
    </>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  line: { flex: 1, height: 1, backgroundColor: colors.dull_half_white },
  socialBtnContainer: {
    gap: verticalScale(17),
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: verticalScale(30),
  },
  orContainer: {
    gap: scale(20),
    alignSelf: "center",
  },
});
