import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Keyboard } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../../utils/colors";
import TopHeader from "../../../components/TopHeader";
import CustomText from "../../../components/CustomText";
import CustomInput from "../../../components/CustomInput";
import { images } from "../../../assets/images";
import CustomButton from "../../../components/CustomButton";
import CustomCountryPicker from "../../../components/CustomCountryPicker";
import CustomAlertModal from "../../../components/CustomAlertModal";
import { emailRegex, numericRegex, phoneRegex } from "../../../utils/Regex";
import AbsoluateView from "../../../components/AbsoluateView";
import CustomToast from "../../../components/CustomToast";
import { ApiServices } from "../../../apis/ApiServices";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AUTHDATA, StorageServices } from "../../../utils/StorageService";
import { parsePhoneNumber } from "libphonenumber-js";
import { useSelector } from "react-redux";
import { getAuthData } from "../../../redux/reducers/authReducer";
import { getFormattedPhoneNumber } from "../../../utils/CommonHooks";

const BookRequestScreen = ({ navigation }: any) => {
  const [isSuccessModal, setIsSuccessModal] = useState(false);


  const authData=useSelector(getAuthData)
  const parsedNumber:any = authData?.phone ? getFormattedPhoneNumber(authData?.phone) : null;

  const countryCallingCode = parsedNumber && parsedNumber.countryCallingCode;
  const [country, setCountry] = useState<any>(
    countryCallingCode ? countryCallingCode : "92"
  );
  console.log("authData",authData)
  const[countryName,setCountryName]=useState("PK")
  const [laoding, setlaoding] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [errors, setErrors] = useState({
    email_error: "",
    contact_No_error: "",
  });
  const [values, setValues] = useState({
    Contact_Name: authData?.first_name?authData?.first_name+" "+ authData?.last_name:"",
    Contact_No:parsedNumber?.nationalNumber?parsedNumber?.nationalNumber: "",
    Email:authData?.email?authData?.email: "",
    Additional_Information: "",
    Author: "",
    Title: "",
  });
  // console.log("values",)

//   useEffect(() => {
//     getAuthUser();
//   },[]);

//   const getAuthUser = async () => {
//     const authData = await StorageServices.getItem(AUTHDATA);

//     console.log('authData',authData)

//     if (authData != null) {
   
// console.log("countryCallingCode",parsedNumber?.country)
//       setCountryName(parsedNumber?.country)
//       setCountry(countryCallingCode)

//       setValues({...values,Contact_Name:authData?.first_name+" "+ authData?.last_name,Email:authData?.email,Contact_No:parsedNumber?.nationalNumber})
//     }
//   };

  const onBookRequest = () => {
    Keyboard.dismiss();
    if (!values.Contact_Name) {
      setMessage("Name is required");
      setIsMessage(true);

      return;
    }
    if (!values.Email) {
      setMessage("Email Name is required");
      setIsMessage(true);

      return;
    }
    if (!emailRegex.test(values.Email)) {
      setMessage("Invalid Email Address");
      setIsMessage(true);

      return;
    }

    if (!values.Contact_No) {
      setMessage("Phone Number is required");
      setIsMessage(true);

      return;
    }

      if (!getFormattedPhoneNumber("+" + country+values.Contact_No)) {
        setMessage("phone number is invalid");
      setIsMessage(true);
      return;
    }

    if (!values.Title) {
      setMessage("Book Title is required");
      setIsMessage(true);

      return;
    }
    if (!values.Author) {
      setMessage("Book Title is required");
      setIsMessage(true);

      return;
    }
    setlaoding(true);
    let data = {
      Contact_Name: values.Contact_Name,
      Contact_No: "+" + country + values.Contact_No,
      Email: values.Email,
      Additional_Information: values.Additional_Information
        ? values.Additional_Information
        : "",
      Author: values.Author,
      Title: values.Title,
    };
    var raw = JSON.stringify(data);

    ApiServices.BookRequest(raw, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.success) {
          setlaoding(false);
          setIsSuccessModal(true);
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
  return (
    <>
      <ScreenLayout>
        <View
          style={{
            paddingHorizontal: scale(20),
            paddingBottom: verticalScale(10),
          }}
        >
          <TopHeader title="Request a Book" />
        </View>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: colors.dull_white,
            flex: 1,
            paddingHorizontal: scale(20),
            paddingTop: verticalScale(10),
          }}
          contentContainerStyle={{
            backgroundColor: colors.dull_white,
            gap: verticalScale(20),
          }}
        >
          <CustomText
            text={
              "Enter the following details about the book you want to request."
            }
            size={14}
          />
          <CustomInput
            value={values.Contact_Name}
            onChangeText={(txt: any) => {
              setValues({ ...values, Contact_Name: txt });
            }}
            placeholder="Your Name"
          />
          <CustomInput
            placeholder="Email"
            value={values.Email}
            error={errors.email_error}
            onChangeText={(txt: string) => {
              setValues({ ...values, Email: txt });
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
          />

          <CustomCountryPicker
            placeholder="345 123 456 7"
            country={country}
            countryName={parsedNumber?.country?parsedNumber?.country:"PK" }
            error={errors.contact_No_error}
            setCountry={setCountry}
            value={values.Contact_No}
            onChangeText={(value: any) => {
              if (value.length == 0) {
                setErrors({ ...errors, contact_No_error: "" });
                setValues({ ...values, Contact_No: "" });
              }
              if (value.length > 0) {
                if (!numericRegex.test(value)) {
                  return;
                }
                setValues({ ...values, Contact_No: value });
                let isValid =getFormattedPhoneNumber("+" + country+value);
                if (isValid) {
                  setErrors({ ...errors, contact_No_error: "" });
                  setValues({ ...values, Contact_No: value });
                } else {
                  setErrors({
                    ...errors,
                    contact_No_error: "phone number is invalid",
                  });
                }
              }
            }}
          />

          <CustomInput
            value={values.Title}
            onChangeText={(txt: any) => {
              setValues({ ...values, Title: txt });
            }}
            placeholder="Book Title"
            rightSourceSize={30}
          />
          <CustomInput
            value={values.Author}
            onChangeText={(txt: any) => {
              setValues({ ...values, Author: txt });
            }}
            placeholder="Author Name"
          />
          <CustomInput
            height={150}
            multiline={true}
            textAlignVertical={"top"}
            value={values.Additional_Information}
            onChangeText={(txt: any) => {
              setValues({ ...values, Additional_Information: txt });
            }}
            paddingTop={verticalScale(10)}
            placeholder="Additional Info"
          />
          <View style={styles.continueBtnContainer}>
            <CustomButton
              onPress={onBookRequest}
              isLoading={laoding}
              text="Send Request"
              style={{ marginTop: verticalScale(10) }}
            />
          </View>
        </KeyboardAwareScrollView>
      </ScreenLayout>
      <CustomAlertModal
        buttonTitle={"Back to Home"}
        modalVisible={isSuccessModal}
        icon={images.congrat}
        title={"Request Received"}
        des={
          "We have received your request for the book. We will find it as soon as possible and notify you as it’s available"
        }
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
        color={colors.white}
      />
    </>
  );
};

export default BookRequestScreen;

const styles = StyleSheet.create({
  continueBtnContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: verticalScale(30),
  },
});
