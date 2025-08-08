import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../../utils/colors";
import TopHeader from "../../../components/TopHeader";
import CustomText from "../../../components/CustomText";
import { images } from "../../../assets/images";
import { font } from "../../../utils/font";
import { appStyles } from "../../../utils/AppStyles";
import AddressCard from "../../../components/AddressCard";
import { ApiServices } from "../../../apis/ApiServices";
import { useDispatch, useSelector } from "react-redux";
import {
  getGuestToken,
  getToken,
  setBuyNowEmail,
} from "../../../redux/reducers/authReducer";
import { sessionCheck } from "../../../utils/CommonHooks";
import { ChooseAddressLayout } from "../../../utils/Loyout/ChooseAddressLayout";
import CustomToast from "../../../components/CustomToast";
import {
  BILLING_ADDRESS,
  Buy_NOW_EMAIL,
  DISPATCH_ADDRESS,
  StorageServices,
} from "../../../utils/StorageService";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import { emailRegex } from "../../../utils/Regex";
const ChooseAddressScreen = ({ navigation, route }: any) => {
  const isBillingAddress = route?.params?.isBillingAddress;
  const isBuyNow = route?.params?.isBuyNow;
  const [laoding, setlaoding] = useState(false);
  const [userAddresses, setUserAddresses] = useState<any>();
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const token = useSelector(getToken);
  const guestToken = useSelector(getGuestToken);
  const [values, setValues] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email_error: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserAddresses();
     getBuyNowEmail()

    });

    return unsubscribe; // Cleanup the listener
  }, []);

  const getBuyNowEmail= async()=>{

    const email = await StorageServices.getItem(Buy_NOW_EMAIL);
    setValues({...values,email: email != null ? email : ""})
   
  }

  const getUserAddresses = () => {
    setlaoding(true);
    ApiServices.GetAddress(
      token != null ? token : guestToken,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);

          if (result?.data) {
            setUserAddresses(result?.data?.addresses);
            const dispatchAddress = await StorageServices.getItem(
              DISPATCH_ADDRESS
            );
            console.log("dispatchAddress", dispatchAddress);
            setSelectedAddress(dispatchAddress);

            setlaoding(false);
          } else {
            if (result?.error == "Invalid token") {
              sessionCheck(dispatch, navigation);

              return;
            }
            setlaoding(false);
            if (token) {
              setMessage(result?.error);
              setIsMessage(true);
            }
          }
        } else {
          setlaoding(false);
          setMessage("Something went wrong");
          setIsMessage(true);
        }
      }
    );
  };

  const deleteUserAddress = (id: any) => {
    let params = {
      id: id,
      token: token,
    };

    ApiServices.DeleteAddresses(
      params,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.success) {
            setMessage(result?.message);
            let filterAddress = userAddresses?.filter((it: any) => it.id != id);
            setUserAddresses(filterAddress);
            setIsMessage(true);
          } else {
            setMessage(result?.error);
            setIsMessage(true);
          }
        } else {
          setMessage("Something went wrong");
          setIsMessage(true);
        }
      }
    );
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
          <TopHeader title="Choose Address" />
        </View>

        {laoding ? (
          <ChooseAddressLayout />
        ) : (
          <>
            <View
              style={{
                backgroundColor: colors.dull_white,
                flex: 1,
              }}
            >
              <View style={{ width: "100%", alignItems: "center" }}>
                {token == null && (
                  <>
                    {isBuyNow && (
                      <CustomInput
                        value={values?.email}
                        width={"90%"}
                        error={errors.email_error}
                        onChangeText={(txt: string) => {
                          setValues({ ...values, email: txt });

                          let isValid = emailRegex.test(txt);
                          if (!txt) {
                            setErrors({ ...errors, email_error: "" });
                            return;
                          }
                          if (!isValid) {
                            setErrors({
                              ...errors,
                              email_error: "Invalid Email Address",
                            });
                          } else if (isValid) {
                            setErrors({ ...errors, email_error: "" });
                          }
                        }}
                        placeholder="Enter Email"
                      />
                    )}
                  </>
                )}
              </View>

              <View style={{ marginTop: verticalScale(10) }}>
                {userAddresses?.length > 0 && (
                  <>
                    <CustomText
                      text={"Saved Addresses"}
                      color={colors.black}
                      fontWeight="600"
                      style={{
                        marginLeft: scale(20),
                        marginBottom: verticalScale(10),
                      }}
                      fontFam={font.WorkSans_SemiBold}
                      size={18}
                    />

                    <FlatList
                      data={userAddresses}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={{ paddingLeft: scale(20) }}
                      contentContainerStyle={{
                        paddingRight: scale(40),
                        gap: scale(7),
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item, index }: any) => {
                        let data = {
                          Address: item?.Address,
                          City: item?.City,
                          Country: item?.Country,
                          Phone: item?.Phone,
                          PostCode: item?.PostCode,
                          id: item?.id,
                        };
                        return (
                          <TouchableOpacity
                            activeOpacity={0.5}
                            style={{ zIndex: 999 }}
                            onPress={() => {
                              setSelectedAddress(item);
                            }}
                          >
                            <AddressCard
                              onSelectAddress={() => {
                                setSelectedAddress(item);
                              }}
                              isSelectedAddress={true}
                              selectedAddress={selectedAddress}
                              data={data}
                              onEditAddress={() =>
                                navigation.navigate("AddAddressScreen", {
                                  isEdit: true,
                                  data: item,
                                })
                              }
                              onDeleteAddress={() => deleteUserAddress(item.id)}
                            />
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </>
                )}

                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate("AddAddressScreen")}
                  style={{
                    ...appStyles.row,
                    gap: scale(10),
                    marginHorizontal: scale(20),
                    marginTop: verticalScale(15),
                  }}
                >
                  <CustomText
                    text={"Add New Address"}
                    size={14}
                    color={colors.primary}
                    fontWeight="600"
                    fontFam={font.WorkSans_SemiBold}
                  />
                  <Image
                    source={images.plus}
                    resizeMode="contain"
                    style={{
                      width: scale(15),
                      height: scale(15),
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.continueBtnContainer}>
              <CustomButton
                text="Save Changes"
                disable={selectedAddress == null}
                onPress={() => {
                  if (token == null) {
                    if (isBuyNow) {
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
                      } else {
                        StorageServices.setItem(Buy_NOW_EMAIL, values?.email);
                      }
                    }
                  } 
                   if (isBillingAddress) {
                    StorageServices.setItem(BILLING_ADDRESS, selectedAddress);
                  } else {
                    StorageServices.setItem(DISPATCH_ADDRESS, selectedAddress);
                  }

                  navigation.goBack();
                }}
                // isLoading={laoding}
                // onPress={onEditProfile}
                // style={{marginTop: verticalScale(20)}}
              />
            </View>
          </>
        )}
      </ScreenLayout>

      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
      />
    </>
  );
};
export default ChooseAddressScreen;

const styles = StyleSheet.create({
  continueBtnContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: verticalScale(40),
    paddingHorizontal: scale(20),
  },
});
