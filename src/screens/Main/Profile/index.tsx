import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../../utils/colors";
import TopHeader from "../../../components/TopHeader";
import CustomText from "../../../components/CustomText";
import { images } from "../../../assets/images";
import { font } from "../../../utils/font";
import CustomButton from "../../../components/CustomButton";
import { appStyles } from "../../../utils/AppStyles";
import AddressCard from "../../../components/AddressCard";
import PaymentCard from "../../../components/PaymentCard";
import DeleteAccountModal from "./DeleteAccountModal";
import { ApiServices } from "../../../apis/ApiServices";
import { useDispatch, useSelector } from "react-redux";
import {
  getToken,
  setAuthData,
  setAuthToken,
} from "../../../redux/reducers/authReducer";
import { useIsFocused } from "@react-navigation/native";
import { ProfileLayout } from "../../../utils/Loyout/ProfileLayout";
import CustomToast from "../../../components/CustomToast";
import {
  AUTHDATA,
  StorageServices,
  TOKEN,
} from "../../../utils/StorageService";
import { sessionCheck } from "../../../utils/CommonHooks";
import ActionModal from "../../../components/ActionModal";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { windowWidth } from "../../../utils/Dimensions";
const ProfileScreen = ({ navigation }: any) => {
  const [isAccountDeleteModal, setIsAccountDeleteModal] = useState(false);
  const [isDeleteAdddressModal, setIsDeleteAdddressModal] = useState(false);
  const [isConfirmDeleteModal, setIsConfirmDeleteModal] = useState(false);

  const [userAddresses, setUserAddresses] = useState<any>();
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const token = useSelector(getToken);
  const isFocused = useIsFocused();
  const [profile, setProfile] = useState<any>();
  const [laoding, setlaoding] = useState(false);
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState<any>();
  const [deletetText, setDeleteText] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [paymentMethodLoading, setPaymentMethodLoading] = useState(false);
  const [paymentMethod, setPaymentMethods] = useState([]);

  console.log("token", token);

  // useEffect(() => {
  //   getUserAddresses();
  //   getUserProfile();
  // }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      // Code to run when the screen is focused
      getUserAddresses();
      getUserProfile();
      getPaymentMethod();
      // Perform any other actions or fetch data
    } else {
      // Code to run when the screen is unfocused (if needed)
    }
  }, [isFocused]);
  const getUserAddresses = () => {
    setlaoding(true);
    ApiServices.GetAddress(token, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        console.log("AddressRes", result);

        if (result?.data) {
          setUserAddresses(result?.data?.addresses);
          setlaoding(false);
        } else {
          if (result?.error == "Invalid token") {
            sessionCheck(dispatch, navigation);

            return;
          }
          setlaoding(false);
          setMessage(result?.error);
          setIsMessage(true);
        }
      } else {
        setlaoding(false);
        setMessage("Something went wrong");
        setIsMessage(true);
      }
    });
  };

  const getUserProfile = () => {
    setProfileLoading(true);
    ApiServices.GetProfile(token, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.data) {
          setProfileLoading(false);

          setProfile(result?.data?.user);
          StorageServices.setItem(AUTHDATA, result?.data?.user);
          dispatch(setAuthData(result?.data?.user));
        } else {
          setProfileLoading(false);
          setMessage(result?.error);
          setIsMessage(true);
        }
      } else {
        setProfileLoading(false);

        setMessage("Something went wrong");
        setIsMessage(true);
      }
    });
  };

  const getPaymentMethod = () => {
    setPaymentMethodLoading(true);
    let param = {
      token: token,
      isGuest: false,
    };
    ApiServices.GetPaymentMethod(
      param,
      async ({ isSuccess, response }: any) => {
        console.log("Payemntresponse", response);
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.success) {
            console.log("Payemnresult", result?.data);
            setPaymentMethods(result?.data?.paymentMethods);
            setPaymentMethodLoading(false);
          } else {
            setPaymentMethodLoading(false);
            setIsMessage(true);
            setMessage(result?.error);
          }
        } else {
          setPaymentMethodLoading(false);
          Alert.alert("", "Something went wrong");
        }
      }
    );
  };

  const deleteUserAddress = () => {
    let params = {
      id: selectedAddress?.id,
      token: token,
    };

    ApiServices.DeleteAddresses(
      params,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.success) {
            setMessage(result?.message);
            let filterAddress = userAddresses?.filter(
              (it: any) => it.id != selectedAddress?.id
            );
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

  const onDeleteAccount = () => {
    ApiServices.DeleteAccount(token, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        // console.log("result",result?.error)
        if (result?.success) {
          setMessage(result?.message);
          setIsMessage(true);

          dispatch(setAuthData(null));
          dispatch(setAuthToken(null));
          StorageServices.removeItem(TOKEN);
          StorageServices.removeItem(AUTHDATA);
          navigation.goBack();
        } else {
          setIsAccountDeleteModal(false);
          setMessage(result?.error);
          setIsMessage(true);
        }
      } else {
        setIsAccountDeleteModal(false);

        setMessage("Something went wrong");
        setIsMessage(true);
      }
    });
  };

  const OnDeleteCard = (data: any) => {
    let filterPayment = paymentMethod?.filter((it: any) => it?.id != data?.id);
    setPaymentMethods(filterPayment);
    let params = {
      token: token,
      id: data?.id,
    };

    ApiServices.DeletePaymentcard(
      params,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.success) {
          } else {
            Alert.alert("", result?.error);
          }
        } else {
          Alert.alert("", "Something went wrong");
        }
      }
    );
  };
  return (
    <>
      <ScreenLayout>
        {laoding ? (
          <ProfileLayout />
        ) : (
          <>
            <View
              style={{
                paddingHorizontal: scale(20),
                paddingBottom: verticalScale(10),
              }}
            >
              <TopHeader
                title="Profile"
                rightTitleColor={colors.red}
                rightTitle="Delete Account"
                onRightPress={() => {
                  setIsAccountDeleteModal(true);
                }}
              />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                backgroundColor: colors.dull_white,
                flex: 1,
              }}
              contentContainerStyle={{
                backgroundColor: colors.dull_white,
                gap: verticalScale(20),
              }}
            >
              <View style={{ paddingHorizontal: scale(20) }}>
                <View
                  style={{
                    width: "100%",
                    backgroundColor: colors.white,
                    padding: scale(15),
                    borderRadius: scale(10),
                    gap: verticalScale(15),
                    marginTop: verticalScale(10),
                  }}
                >
                  <View style={{ ...appStyles.rowjustify }}>
                    <CustomText color={colors.grey} text={"Name"} size={14} />
                    {profileLoading ? (
                      <SkeletonPlaceholder
                        // speed={00}
                        highlightColor="rgb(222, 226, 230)"
                        backgroundColor="#e9ecef" // Set the main background color of the skeleton
                      >
                        <View
                          style={{
                            borderRadius: scale(5),
                            width: scale(100),
                            height: verticalScale(10),
                          }}
                        ></View>
                      </SkeletonPlaceholder>
                    ) : (
                      <CustomText
                        style={styles.profileTextContainer}
                        color={colors.black}
                        text={`${profile?.first_name} ${profile?.last_name}`}
                        size={14}
                      />
                    )}
                  </View>
                  <View style={{ ...appStyles.rowjustify }}>
                    <CustomText color={colors.grey} text={"Email"} size={14} />
                    {profileLoading ? (
                      <SkeletonPlaceholder
                        // speed={00}
                        highlightColor="rgb(222, 226, 230)"
                        backgroundColor="#e9ecef" // Set the main background color of the skeleton
                      >
                        <View
                          style={{
                            borderRadius: scale(5),
                            width: scale(120),
                            height: verticalScale(10),
                          }}
                        ></View>
                      </SkeletonPlaceholder>
                    ) : (
                      <CustomText
                        color={colors.black}
                        style={styles.profileTextContainer}
                        text={`${profile?.email}`}
                        size={14}
                      />
                    )}
                  </View>

                  <View style={{ ...appStyles.rowjustify }}>
                    <CustomText
                      color={colors.grey}
                      text={"Phone number"}
                      size={14}
                    />
                    {profileLoading ? (
                      <SkeletonPlaceholder
                        // speed={00}
                        highlightColor="rgb(222, 226, 230)"
                        backgroundColor="#e9ecef" // Set the main background color of the skeleton
                      >
                        <View
                          style={{
                            borderRadius: scale(5),
                            width: scale(100),
                            height: verticalScale(10),
                          }}
                        ></View>
                      </SkeletonPlaceholder>
                    ) : (
                      <CustomText
                        color={colors.black}
                        text={profile?.phone ? profile?.phone : "-"}
                        size={14}
                      />
                    )}
                  </View>
                </View>
                <View
                  style={{
                    ...appStyles.rowjustify,
                    marginTop: verticalScale(8),
                  }}
                >
                  <CustomButton
                    width={"48%"}
                    onPress={() => navigation.navigate("ChangePasswordScreen")}
                    text="Change Password"
                    bgColor={colors.white}
                    textColor={colors.primary}
                  />
                  <CustomButton
                    onPress={() =>
                      navigation.navigate("EditProfileScreen", {
                        data: profile,
                      })
                    }
                    width={"48%"}
                    text="Edit Info"
                    bgColor={colors.white}
                    textColor={colors.primary}
                  />
                </View>
              </View>
              <View>
                <CustomText
                  text={"Saved Addresses"}
                  color={colors.black}
                  fontWeight="600"
                  style={{
                    marginLeft: scale(20),
                    marginBottom: verticalScale(5),
                    marginTop: verticalScale(5),
                  }}
                  fontFam={font.WorkSans_SemiBold}
                  size={18}
                />
                {userAddresses?.length > 0 && (
                  <>
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
                        };
                        return (
                          <View>
                            <AddressCard
                              isProfile={true}
                              data={data}
                              onEditAddress={() =>
                                navigation.navigate("AddAddressScreen", {
                                  isEdit: true,
                                  data: item,
                                })
                              }
                              onDeleteAddress={() => {
                                setIsDeleteAdddressModal(true);
                                setSelectedAddress(item);
                              }}
                            />
                          </View>
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
                    marginTop: verticalScale(
                      userAddresses?.length > 0 ? 15 : 20
                    ),
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
              {paymentMethodLoading ? (
                <SkeletonPlaceholder
                  // speed={00}
                  highlightColor="rgb(222, 226, 230)"
                  backgroundColor="#e9ecef" // Set the main background color of the skeleton
                >
                  <View
                    style={{
                      marginLeft: scale(20),
                      marginTop: verticalScale(5),
                      marginBottom: verticalScale(5),
                      gap: verticalScale(15),
                    }}
                  >
                    <View
                      style={{
                        borderRadius: scale(4),
                        width: scale(110),
                        height: verticalScale(13),
                        marginBottom: verticalScale(-2),
                      }}
                    />

                    <View
                      style={{
                        ...appStyles.row,
                        marginTop: verticalScale(-5),
                        gap: scale(15),
                      }}
                    >
                      {[1, 2].map((item, index) => {
                        return (
                          <View key={index.toString()}>
                            <View
                              style={{
                                width: windowWidth / 1.4,
                                height: verticalScale(50),
                                marginBottom: 30,
                                borderRadius: scale(10),
                              }}
                            />
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </SkeletonPlaceholder>
              ) : (
                <View>
                  <CustomText
                    text={"Payment Methods"}
                    color={colors.black}
                    fontWeight="600"
                    style={{
                      marginLeft: scale(20),
                      marginBottom: verticalScale(5),
                      marginTop: verticalScale(5),
                    }}
                    fontFam={font.WorkSans_SemiBold}
                    size={18}
                  />
                  <FlatList
                    data={paymentMethod}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingLeft: scale(20) }}
                    contentContainerStyle={{
                      paddingRight: scale(40),
                      gap: scale(15),
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }: any) => {
                      return (
                        <View>
                          <PaymentCard
                            onDelete={() => {
                              Alert.alert(
                                "Alert!",
                                "Are You Sure You Want To Delete This Card?",
                                [
                                  {
                                    text: "OK",
                                    onPress: async () => {
                                      OnDeleteCard(item);
                                    },
                                  },
                                  {
                                    text: "Cancel",
                                    onPress: async () => {},
                                  },
                                ]
                              );
                            }}
                            item={item}
                            info={true}
                          />
                        </View>
                      );
                    }}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>{

                      if(Platform.OS=="android"){
                        Alert.alert("Alert","This option will be available soon")
                        
          
                        return
          
          
                      }

                      navigation.navigate("AddPaymentMethod", {
                        disableSkip: true,
                      })
                    }
                     
                    }
                    style={{
                      ...appStyles.row,
                      gap: scale(10),
                      marginHorizontal: scale(20),
                      marginTop: verticalScale(15),
                    }}
                  >
                    <CustomText
                      text={"Add New Payment Method"}
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
              )}
            </ScrollView>
          </>
        )}
      </ScreenLayout>
      <DeleteAccountModal
        deletetText={deletetText}
        setDeleteText={setDeleteText}
        modalVisible={isConfirmDeleteModal}
        setModalVisible={setIsConfirmDeleteModal}
        onCancel={() => {
          setIsConfirmDeleteModal(false);
        }}
        onDelete={() => {
          setIsConfirmDeleteModal(false);

          onDeleteAccount();
        }}
      />

      <ActionModal
        modalVisible={isAccountDeleteModal}
        setModalVisible={setIsAccountDeleteModal}
        onCancel={() => {
          setIsAccountDeleteModal(false);
        }}
        onDelete={() => {
          setIsAccountDeleteModal(false);

          setTimeout(() => {
            setIsConfirmDeleteModal(true);
          }, 1000);
          // onDeleteAccount();
        }}
      />

      <ActionModal
        modalVisible={isDeleteAdddressModal}
        title={"Delete Address"}
        des={"You Are About To Delete Your Address"}
        setModalVisible={setIsDeleteAdddressModal}
        onCancel={() => {
          setIsDeleteAdddressModal(false);
        }}
        onDelete={() => {
          setIsDeleteAdddressModal(false);

          deleteUserAddress();
          // onDeleteAccount();
        }}
      />

      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
      />
    </>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  profileTextContainer: {
    width: "82%",
    textAlign: "right",
  },
});
