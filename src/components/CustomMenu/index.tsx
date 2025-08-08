import React, { useState } from "react";
import {
  useWindowDimensions,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import { scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { images } from "../../assets/images";
import { useSelector } from "react-redux";
import {  getToken,} from "../../redux/reducers/authReducer";
interface Props {
  isModalVisible?: boolean;
  setModalVisible?: any;
  modalBackgroundColor?: any;
  setIsLogoutVisible?: any;
}

const CustomMenu: React.FC<Props> = ({
  isModalVisible,
  setModalVisible,
  modalBackgroundColor,
  setIsLogoutVisible,
}) => {
  const windowWidth = useWindowDimensions().width;
  const navigation: any = useNavigation();
  const token = useSelector(getToken);
  const menuData = [
    {
      title: "High Discounts",
      onPress: () => {
        setModalVisible(false);
        setTimeout(() => {
          navigation.navigate("HighDiscountsScreen");
        }, 300);
      },
    },
    {
      title: "Card Discounts",
      onPress: () => {
        setModalVisible(false);
        setTimeout(() => {
          navigation.navigate("DiscountsScreen");
        }, 300);
      },
    },
    // {
    //   title: "Send a gift",
    //   onPress: () => {
    //     setModalVisible(false);
    //     setTimeout(() => {
    //       navigation.navigate("SendGiftScreen");
    //     }, 300);
    //   },
    // },
    {
      title: "Request a book",
      onPress: () => {
        setModalVisible(false);
        setTimeout(() => {
          navigation.navigate("BookRequestScreen");
        }, 300);
      },
    },
    {
      title: "About",
      onPress: () => {
        setModalVisible(false);
        setTimeout(() => {
          navigation.navigate("About");
        }, 300);
      },
    },
    {
      title: "Terms of Use",
      onPress: () => {
        setModalVisible(false);
        setTimeout(() => {
          navigation.navigate("TermsAndCondirtions");
        }, 300);
      },
    },
    {
      title: "Privacy Policy",
      onPress: () => {
        setModalVisible(false);
        setTimeout(() => {
          navigation.navigate("PrivacyPolicy");
        }, 300);
      },
    },
    {
      title: "Help & Support",
      onPress: () => {
        setModalVisible(false);
        setTimeout(() => {
          navigation.navigate("HelpAndSupportScreen");
        }, 300);
      },
    },
  ];
  return (
    <>
      <Modal
        style={{
          flex: 1,
          margin: 0,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: modalBackgroundColor,
        }}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
          // Helps with gesture propagation when swiping the carousel
      propagateSwipe
      // These options usually make Android behave better
      useNativeDriver
      useNativeDriverForBackdrop
      statusBarTranslucent
      coverScreen
        deviceWidth={windowWidth}
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible?.(false)}
        onBackdropPress={() => setModalVisible?.(false)}
        backdropColor="transparent"
        customBackdrop={
          <Pressable
            style={{ height: "100%", width: "100%" }}
            onPress={() => setModalVisible?.(false)}
          ></Pressable>
        }
      >
        
        <View style={styles.container}>
          <View
            style={{ alignItems: "center", flex: 1, gap: verticalScale(30),paddingTop:verticalScale(Platform.OS=="ios" ? token? 10:40:30) }}
          >
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);

                setTimeout(() => {
                  navigation.navigate(token ? "ProfileScreen" : "Login");
                }, 500);
              }}
              activeOpacity={0.5}
              style={{
                width: "60%",
                alignItems: "center",
                height: verticalScale(25),
              }}
            >
              <CustomText
                text={token ? "My Profile" : "Sign Up / Login"}
                color={colors.primary}
                size={14}
              />
            </TouchableOpacity>

            {menuData.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={item.onPress}
                  activeOpacity={0.5}
                  style={{
                    width: "60%",
                    alignItems: "center",
                    height: verticalScale(25),
                  }}
                >
                  <CustomText
                    text={item?.title}
                    color={colors.primary}
                    size={14}
                  />
                </TouchableOpacity>
              );
            })}
            {token && (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setTimeout(() => {
                    setIsLogoutVisible(true);
                  }, 1000);
                }}
                activeOpacity={0.5}
                style={{
                  width: "60%",
                  alignItems: "center",
                  height: verticalScale(25),
                }}
              >
                <CustomText text={"Logout"} color={colors.primary} size={14} />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setModalVisible(false)}
            style={styles.circle}
          >
            <Image
              style={{ width: "50%", height: "50%" }}
              resizeMode="contain"
              source={images.close}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingTop: "22%",
    backgroundColor: colors.dull_white,
    gap: verticalScale(15),
    paddingBottom: verticalScale(50),
  },
  circle: {
    width: scale(40),
    height: scale(40),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    alignSelf: "center",
    borderRadius: 999,
  },
});

export default CustomMenu;
