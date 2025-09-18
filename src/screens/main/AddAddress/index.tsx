import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Keyboard,
  ActivityIndicator,
  Alert,
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
import DropDown from "../../../components/DropDown";
import { CountryData } from "../../../utils/Data";
import CustomCountryPicker from "../../../components/CustomCountryPicker";
import { numericRegex, phoneRegex } from "../../../utils/Regex";
import { ApiServices } from "../../../apis/ApiServices";
import AbsoluateView from "../../../components/AbsoluateView";
import CustomToast from "../../../components/CustomToast";
import { usePermissions } from "../../../utils/Permissions";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthAddress,
  getAuthCity,
  getAuthCountry,
  getAuthData,
  getAuthState,
  getGuestToken,
  getToken,
  getUserLocation,
  setGuestToken,
} from "../../../redux/reducers/authReducer";
import { useIsFocused } from "@react-navigation/native";
import { parsePhoneNumber } from "libphonenumber-js";
import { getFormattedPhoneNumber } from "../../../utils/CommonHooks";
import { GUESTTOKEN, StorageServices } from "../../../utils/StorageService";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddAddressScreen = ({ navigation, route }: any) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [country, setCountry] = useState<any>("92");
  let isEdit = route?.params?.isEdit;
  let data = route?.params?.data;
  console.log("isEditdata", data);

  const parsedNumber = isEdit && getFormattedPhoneNumber(data?.Phone);
  const countryCallingCode =
    isEdit && parsedNumber ? parsedNumber.countryCallingCode : "92";
  const [mapLoading, setMapLoading] = useState(true);

  const [laoding, setlaoding] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const { getLocation } = usePermissions();
  const loaction: any = useSelector(getUserLocation);
  const [authLocation, setAuthLocation] = useState<any>();
  const authAddress = useSelector(getAuthAddress);
  const authCity = useSelector(getAuthCity);
  const authCountry = useSelector(getAuthCountry);
  const authState = useSelector(getAuthState);
  const guestUserToken = useSelector(getGuestToken);

  const token = useSelector(getToken);
  const authData = useSelector(getAuthData);
  console.log("authData", authData);
  const guestToken = useSelector(getGuestToken);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  console.log("guestToken", guestToken);

  const [errors, setErrors] = useState({
    address_error: "",
    phone_error: "",
    first_name_error: "",
    last_name_error: "",
  });

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone: "",
    city: "",
    province: "",
    country: "",
    zipCode: "",
  });

  console.log("Vauedld", values);
  useEffect(() => {
    if (!isEdit) {
      getLocation();
    }
    GetGuestToken();
  }, [isFocused]);
  useEffect(() => {
    //     const fullName = "umair abbas";
    // const [firstName, lastName] = fullName.split(" ");
    setValues({
      ...values,

      address: isEdit ? data?.Address : authAddress,
      city: isEdit ? data?.City : authCity,
      province: isEdit ? data?.Province : "",
      zipCode: isEdit ? data?.PostCode : "",
      phone: isEdit ? (parsedNumber ? parsedNumber.nationalNumber : "") : "",
      first_name: isEdit ? data?.Name : authData?.first_name,
      last_name: isEdit ? data?.last_name : authData?.last_name,
    });
    setCountry(isEdit ? countryCallingCode : "92");
    setSelectedCountry(isEdit ? data?.Country : "Pakistan");

    setAuthLocation(loaction);
  }, [authAddress, loaction, authCity, authState, isEdit]);

  const GetGuestToken = () => {
    if (token == null && !guestUserToken) {
      ApiServices.GetGuestToken(async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.success) {
            console.log("responseresult", result);

            if (!guestUserToken) {
              StorageServices.setItem(GUESTTOKEN, result?.data.token);
              dispatch(setGuestToken(result?.data.token));
            }
          } else {
            Alert.alert("", result?.error);

            // setMessage(result?.error);
            setIsMessage(true);
          }
        } else {
          setMessage("Something went wrong");
        }
      });
    }
  };
  const handleMapReady = () => {
    // Map is ready, hide the loading component
    setMapLoading(false);
  };

  console.log("cjdbcd", data?.Latitude == null);
  const onAddAddress = () => {
    Keyboard.dismiss();
    if (!values.first_name) {
      setMessage("First Name is required");
      setIsMessage(true);

      return;
    }
    if (values.first_name.length < 3) {
      setMessage("First Name should have a minimum length of 3");
      setIsMessage(true);

      return;
    }

    if (!values.last_name) {
      setMessage("Last Name is required");
      setIsMessage(true);

      return;
    }
    if (values.last_name.length < 3) {
      setMessage("Last Name should have a minimum length of 3");
      setIsMessage(true);

      return;
    }
    if (!values.address) {
      setMessage("Address is required");
      setIsMessage(true);

      return;
    }
    if (values.address.length < 3) {
      setMessage("Address should have a minimum length of 3");
      setIsMessage(true);

      return;
    }

    if (!values.city) {
      setMessage("City is required");
      setIsMessage(true);

      return;
    }
    if (!values.province) {
      setMessage("Province Title is required");
      setIsMessage(true);

      return;
    }
    if (!selectedCountry) {
      setMessage("Please select country");
      setIsMessage(true);

      return;
    }
    if (!values.zipCode) {
      setMessage("Zip Code is required");
      setIsMessage(true);

      return;
    }
    if (!values.phone) {
      setMessage("Phone Number is required");
      setIsMessage(true);

      return;
    }

    if (!getFormattedPhoneNumber("+" + country + values.phone)) {
      setMessage("phone number is invalid");
      setIsMessage(true);
      return;
    }
    setlaoding(true);
    var raw = JSON.stringify({
      country: selectedCountry,
      address: values.address,
      zipCode: values.zipCode,
      phone: "+" + country + values.phone,
      firstName: values?.first_name,
      lastName: values?.last_name,

      province: values.province,
      city: values.city,
      latitude: isEdit
        ? data?.Latitude
        : loaction?.latitude
        ? loaction?.latitude
        : "",
      longitude: isEdit
        ? data?.Longitude
        : loaction?.longitude
        ? loaction?.longitude
        : "",
    });
    let params = {
      data: raw,
      token: token != null ? token : guestToken,
      id: isEdit ? data.id : "",
    };

    ApiServices.SaveAddress(
      params,
      async ({ isSuccess, response, guestUserToken }: any) => {
        console.log("jcbdcbdkc", guestUserToken);

        if (isSuccess) {
          // if (guestToken != null && !guestUserToken) {
          //   StorageServices.setItem(GUESTTOKEN, guestToken);
          //   dispatch(setGuestToken(guestToken));
          // }
          let result = JSON.parse(response);
          if (result?.success) {
            setlaoding(false);
            // setIsSuccessModal(true);
            navigation.goBack();
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
      }
    );
  };

  return (
    <>
      <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableAutomaticScroll
          keyboardShouldPersistTaps="handled"
          style={{
            flex: 1,
            backgroundColor: colors.dull_white,
          }}
          contentContainerStyle={{
            backgroundColor: colors.dull_white,
            gap: verticalScale(20),
            paddingBottom: verticalScale(40),
          }}
          enableOnAndroid={true}
          extraScrollHeight={verticalScale(50)} // give some space above keyboard
          >

      <ScreenLayout
        style={{
          paddingHorizontal: scale(20),
          gap: verticalScale(20),

        }}
      >
        <View style={{ paddingBottom: verticalScale(10) }}>
          <TopHeader title={isEdit ? "Edit Address" : "New Address"} />
        </View>

      
          <CustomText
            text={"Enter the new address by filling the following information."}
            size={14}
          />

          <View style={appStyles.rowjustify}>
            <CustomInput
              width={"47%"}
              placeholder="First Name"
              value={values.first_name}
              onChangeText={(value: any) => {
                // First Name should have a minimum length of 3"
                setValues({ ...values, first_name: value });
              }}
            />
            <CustomInput
              width={"47%"}
              placeholder="Last Name"
              value={values.last_name}
              error={errors.last_name_error}
              onChangeText={(value: any) =>
                setValues({ ...values, last_name: value })
              }
            />
          </View>
          <CustomInput
            placeholder="Address"
            multiline={false}
            value={values.address}
            error={errors.address_error}
            onChangeText={(txt: string) => {
              setValues({ ...values, address: txt });
            }}
          />

          <View style={appStyles.rowjustify}>
            <CustomInput
              width={"47%"}
              placeholder="City"
              value={values.city}
              onChangeText={(value: any) => {
                setValues({ ...values, city: value });
              }}
            />
            <CustomInput
              width={"47%"}
              placeholder="State/Province"
              value={values.province}
              onChangeText={(value: any) =>
                setValues({ ...values, province: value })
              }
            />
          </View>
          <DropDown
            placeholder={"Country"}
            label="Download"
            search
            setValue={setSelectedCountry}
            value={selectedCountry}
            onSelect={(it: any) => {
              setSelectedCountry(it?.label);
              setValues({ ...values, country: it?.label });
            }}
            data={CountryData.map((item, _index) => {
              return {
                id: item?.id,
                label: item?.label,
                value: item?.value,
              };
            })}
          />
          <CustomInput
            placeholder="ZIP Code"
            keyboard={"numeric"}
            value={values.zipCode}
            onChangeText={(value: any) =>
              setValues({ ...values, zipCode: value })
            }
          />
         
         
          <CustomCountryPicker
            placeholder="345 123 456 7"
            country={country}
            error={errors.phone_error}
            countryName={parsedNumber ? parsedNumber.country : "PK"}
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
                let isValid = getFormattedPhoneNumber("+" + country + value);
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

          <View style={styles.continueBtnContainer}>
            <CustomButton
              onPress={onAddAddress}
              text="Continue"
              isLoading={laoding}
              style={{ marginTop: verticalScale(20) }}
            />
          </View>
      </ScreenLayout>
      </KeyboardAwareScrollView>

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

export default AddAddressScreen;

const styles = StyleSheet.create({
  continueBtnContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginTop: "25%",
    // marginBottom: verticalScale(10),
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white background
  },
});
