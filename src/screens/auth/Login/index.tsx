import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Keyboard,
  Pressable,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../../utils/colors";
import TopHeader from "../../../components/TopHeader";
import CustomText from "../../../components/CustomText";
import CustomInput from "../../../components/CustomInput";
import { images } from "../../../assets/images";
import { font } from "../../../utils/font";
import CustomButton from "../../../components/CustomButton";
import { appStyles } from "../../../utils/AppStyles";
import SocialButton from "../../../components/SocialButton";
import { useDispatch } from "react-redux";


import { emailRegex } from "../../../utils/Regex";
import { ApiServices } from "../../../apis/ApiServices";
import CustomToast from "../../../components/CustomToast";
import AbsoluateView from "../../../components/AbsoluateView";
import {
  AUTHDATA,
  StorageServices,
  TOKEN,
} from "../../../utils/StorageService";
import { CommonActions } from "@react-navigation/native";
import { setAuthData, setAuthToken } from "../../../redux/reducers/authReducer";

const LoginScreen = ({ navigation }: any) => {
  const [showPassword, setShowPassword] = useState(true);
  const [laoding, setlaoding] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    email_error: "",
    password_error: "",
  });

  const [values, setValues] = useState({
    email: "",
    password: "",
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

  // const _onGoogleLogin = async () => {
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

  const onLogin = () => {
    Keyboard.dismiss();

    if (!values.email) {
      setMessage("Email is required");
      setIsMessage(true);
      // Alert.alert("", "Email is required");

      return;
    }
    if (!emailRegex.test(values.email)) {
      setMessage("Invalid Email Address");
      setIsMessage(true);
      return;
    }
    if (!values.password) {
      setMessage("Passowrd is required");
      setIsMessage(true);
      // Alert.alert("", "Passowrd is required");

      return;
    }

    setlaoding(true);
    let data = {
      email: values.email,
      password: values.password,
    };
    var raw = JSON.stringify(data);

    ApiServices.UserLogin(raw, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.success) {
          setlaoding(false);
          dispatch(setAuthToken(result?.data.token));
          StorageServices.setItem(TOKEN, result?.data.token);
          dispatch(setAuthData(result?.data?.user));
          StorageServices.setItem(AUTHDATA, result?.data?.user);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "BottomTab" }],
            })
          );

          // navigation.navigate("BottomTab");
        } else {
          setlaoding(false);
          setMessage(result?.error);
          setIsMessage(true);
        }
      } else {
        setlaoding(false);
        setMessage("Something went wrong");
        console.log("response",response)
        setIsMessage(true);
      }
    });
  };
  // const onAppleLogin = async () => {
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
      <ScreenLayout>
        <Pressable
          onPress={() => Keyboard.dismiss()}
          style={{
            paddingHorizontal: scale(20),
            gap: verticalScale(20),
            flex: 1,
            backgroundColor: colors.dull_white,
          }}
        >
          <TopHeader title="Login" />

          <CustomText
            text={"Enter your email address and password to login."}
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
          <CustomInput
            value={values.password}
            error={errors.password_error}
            secureTextEntry={showPassword}
            onShowPassword={() => setShowPassword(!showPassword)}
            onChangeText={(txt: any) => {
              setValues({ ...values, password: txt });
            }}
            placeholder="Password"
            rightSource={images.eye}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ width: "50%" }}
            onPress={() => navigation.navigate("ForgotPasswordScreen")}
          >
            <CustomText
              fontWeight="600"
              fontFam={font.WorkSans_SemiBold}
              color={colors.primary}
              text={"Forgot password?"}
              size={14}
            />
          </TouchableOpacity>

          <CustomButton
            onPress={onLogin}
            text="Login"
            isLoading={laoding}
            style={{ marginTop: verticalScale(20) }}
          />

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Login")}
            style={{ ...appStyles.row, gap: scale(4), width: "65%" }}
          >
            <CustomText text={"Don’t have an account?"} size={14} />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("SignupScreen")}
            >
              <CustomText
                color={colors.primary}
                textDecorationLine="underline"
                text={"Sign Up"}
                size={14}
              />
            </TouchableOpacity>
          </TouchableOpacity>

          {/* <View style={styles.socialBtnContainer}>
            <View style={{ ...appStyles.row, gap: scale(4) }}>
              <CustomText text={"Don’t have an account?"} size={14} />
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate("SignupScreen")}
              >
                <CustomText
                  color={colors.primary}
                  textDecorationLine="underline"
                  text={"Sign Up"}
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
                onPress={_onGoogleLogin}
                icon={images.google}
                text="Continue with Google"
              />
              <SocialButton
                onPress={() => {
                  dispatch(setUserLogin(true));
                  navigation.navigate("BottomTab");
                }}
                icon={images.facebook}
                text="Continue with facebook"
              />
              {Platform.OS == "ios" && (
                <SocialButton
                  onPress={onAppleLogin}
                  icon={images.apple}
                  text="Continue with Apple ID"
                />
              )}
            </View>
          </View> */}
        </Pressable>
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

export default LoginScreen;

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
