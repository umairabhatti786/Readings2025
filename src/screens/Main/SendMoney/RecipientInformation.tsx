import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Keyboard,
  Platform,
} from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomButton from "../../../components/Button";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import { appStyles } from "../../../utils/GlobalStyles";
import icons from "../../../utils/Constants/icons";
import CustomHeader from "../../../components/Header";
import images from "../../../utils/Constants/images";
import AnimatedProgressBar from "../../../components/AnimatedProgressBar";
import CustomSearch from "../../../components/Search";
import CustomInput from "../../../components/Input";

const RecipientInformation = ({ navigation }: any) => {
  const [isAddNewRecipient, setIsAddNewRecipient] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [contactData, setContactData] = useState([
    { icon: images.user5, name: "Barry Hauck", selected: false },
    { icon: images.user1, name: "Dianna Carroll", selected: false },
    { icon: images.user2, name: "Garry Hagenes", selected: false },

    { icon: images.user7, name: "Lee Cronin", selected: false },
    { icon: images.user6, name: "Bernard Emmerich", selected: false },
    { icon: images.user2, name: "Hope Hane", selected: false },
  ]);

  const RecentContactData = [
    { icon: images.user5, name: "Kobe" },
    { icon: images.user1, name: "Bay" },
    { icon: images.user2, name: "James" },

    { icon: images.user7, name: "Billie" },
    { icon: images.user6, name: "Luke" },
    { icon: images.user2, name: "James" },
  ];

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const RecentContactCard = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={{ alignItems: "center", gap: sizeHelper.calHp(5) }}
      >
        <Image
          style={{
            width: sizeHelper.calWp(90),
            height: sizeHelper.calWp(90),
            borderRadius: sizeHelper.calWp(90),
          }}
          source={item?.icon}
        />

        <CustomText text={item?.name} size={18} />
      </TouchableOpacity>
    );
  };

  const ContactCard = ({ item, onPress }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={appStyles.rowjustify}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPress}
          style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}
        >
          <Image
            style={{
              width: sizeHelper.calWp(75),
              height: sizeHelper.calWp(75),
              borderRadius: sizeHelper.calWp(75),
            }}
            source={item?.icon}
          />

          <CustomText text={item?.name} size={21} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPress}
          style={{
            borderColor: item?.selected
              ? theme.colors.primary
              : theme.colors.input_field_stroke,
            width: sizeHelper.calWp(32),
            height: sizeHelper.calWp(32),
            borderRadius: sizeHelper.calWp(7),
            borderWidth: 1,

            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        >
          <Image
            style={{
              width: "50%",
              height: "50%",
              tintColor: item?.selected
                ? theme.colors.primary
                : theme.colors.input_field_stroke,
            }}
            source={icons.check}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ScreenLayout
        style={{
          flex: 1,
          gap: sizeHelper.calWp(30),
        }}
      >
        <View style={{ flex: 1, gap: sizeHelper.calHp(20) }}>
          <View style={{ gap: sizeHelper.calHp(15) }}>
            <View style={{ paddingHorizontal: sizeHelper.calWp(30) }}>
              <CustomHeader
                textColor={theme.colors.gray100}
                fontWeight="500"
                fontFam={fonts.PlusJakartaSans_Regular}
                label={"1/4 Recipient Information"}
                title={"Send money"}
              />
            </View>
            <AnimatedProgressBar progress={30} />
          </View>

          <View
            style={{
              flex: 1,
              paddingHorizontal: sizeHelper.calWp(30),
              gap: sizeHelper.calHp(20),
            }}
          >
            <CustomText
              text={"Recipient Information"}
              fontWeight="700"
              fontFam={fonts.PlusJakartaSans_Bold}
              size={33}
            />
            <CustomText
              color={theme.colors.gray}
              size={21}
              text={"Pick Recipient to send moneyy"}
            />
            <CustomSearch height={85} placeholder="Search recipient" />
            <View
              style={{
                ...styles.box,
                height: isAddNewRecipient ? "71%" : "65%",
              }}
            >
              {!isAddNewRecipient ? (
                <View style={{ gap: sizeHelper.calHp(20), flex: 1 }}>
                  <View
                    style={{
                      ...appStyles.row,
                      gap: sizeHelper.calWp(20),
                      paddingHorizontal: sizeHelper.calWp(30),
                      paddingTop: sizeHelper.calHp(20),
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setIsAddNewRecipient(true)}
                      style={{
                        ...styles.circle,
                        borderWidth: 1,
                        borderStyle: "dotted",
                        borderColor: theme.colors.primary,
                        backgroundColor: theme.colors.white,
                      }}
                    >
                      <Image
                        style={{
                          width: sizeHelper.calWp(25),
                          height: sizeHelper.calWp(25),
                          tintColor: theme.colors.primary,
                        }}
                        source={icons.plus}
                      />
                    </TouchableOpacity>
                    <CustomText text={"Add New Recipient"} size={23} />
                  </View>

                  <View
                    style={{
                      width: "100%",
                      height: sizeHelper.calHp(1.5),
                      backgroundColor: theme.colors.input_field_stroke,
                    }}
                  />

                  <View style={{ gap: sizeHelper.calHp(20) }}>
                    <View
                      style={{
                        paddingHorizontal: sizeHelper.calWp(30),
                      }}
                    >
                      <CustomText
                        text={"Recent"}
                        color={theme.colors.gray}
                        size={23}
                      />
                    </View>
                    <FlatList
                      data={RecentContactData}
                      horizontal
                      style={{ paddingLeft: sizeHelper.calWp(30) }}
                      contentContainerStyle={{
                        gap: sizeHelper.calWp(30),
                        paddingRight: sizeHelper.calWp(60),
                        // justifyContent: "space-between",
                      }}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }: any) => {
                        return (
                          <>
                            <RecentContactCard item={item} />
                          </>
                        );
                      }}
                    />
                  </View>

                  <View
                    style={{
                      gap: sizeHelper.calHp(20),
                      flex: 1,
                      paddingHorizontal: sizeHelper.calWp(30),
                    }}
                  >
                    <CustomText
                      text={"Recent"}
                      color={theme.colors.gray}
                      size={23}
                    />

                    <FlatList
                      data={contactData}
                      scrollEnabled={true}
                      contentContainerStyle={{
                        gap: sizeHelper.calWp(30),
                        paddingBottom: sizeHelper.calHp(30),
                      }}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item, index }: any) => {
                        return (
                          <>
                            <ContactCard
                              onPress={() => {
                                setContactData((prevData) =>
                                  prevData.map((item, i) =>
                                    i === index
                                      ? { ...item, selected: !item.selected }
                                      : item
                                  )
                                );
                              }}
                              item={item}
                            />
                          </>
                        );
                      }}
                    />
                  </View>
                </View>
              ) : (
                <ScrollView
                  contentContainerStyle={{
                    paddingBottom: sizeHelper.calHp(60),
                  }}
                >
                  <View
                    style={{
                      gap: sizeHelper.calHp(20),
                      padding: sizeHelper.calWp(20),
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setIsAddNewRecipient(false)}
                      style={{
                        ...appStyles.row,
                        gap: sizeHelper.calWp(20),
                      }}
                    >
                      <Image
                        style={{
                          width: sizeHelper.calWp(25),
                          height: sizeHelper.calWp(25),
                        }}
                        source={icons.back}
                        resizeMode="contain"
                      />
                      <CustomText
                        text={"Add New Recipient"}
                        fontWeight="700"
                        fontFam={fonts.PlusJakartaSans_Bold}
                        size={26}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        ...appStyles.row,
                        gap: sizeHelper.calWp(30),
                        padding: sizeHelper.calWp(20),
                        backgroundColor: "#EBF1F6",
                        borderRadius: sizeHelper.calWp(20),
                      }}
                    >
                      <TouchableOpacity style={styles.editImgContainer}>
                        <Image
                          style={{
                            width: sizeHelper.calWp(45),
                            height: sizeHelper.calWp(45),
                          }}
                          source={images.img_placeholder}
                          resizeMode="contain"
                        />

                        <View style={styles.editImgAbsolute}>
                          <Image
                            source={icons.edit}
                            style={{
                              width: sizeHelper.calWp(21),
                              height: sizeHelper.calWp(21),
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                      <View style={{ gap: sizeHelper.calHp(10) }}>
                        <CustomText
                          text={"Upload Profile Picture"}
                          fontWeight="700"
                          fontFam={fonts.PlusJakartaSans_Bold}
                          size={24}
                        />
                        <CustomText
                          text={"JPEG or PNG fromat up to 3MB"}
                          color={theme.colors.gray100}
                        />
                      </View>
                    </View>
                    <CustomInput
                      backgroundColor={theme.colors.white}
                      placeholder="Recipient name"
                    />
                    <CustomInput
                      backgroundColor={theme.colors.white}
                      placeholder="Bank Name"
                    />
                    <CustomInput
                      backgroundColor={theme.colors.white}
                      placeholder="Sort Code"
                    />
                    <CustomInput
                      backgroundColor={theme.colors.white}
                      placeholder="Account number"
                    />
                    <CustomInput
                      backgroundColor={theme.colors.white}
                      placeholder="IBAN (Optional)"
                    />
                  </View>
                </ScrollView>
              )}
            </View>
          </View>
          {!keyboardVisible && (
            <View
              style={{
                paddingHorizontal: sizeHelper.calWp(30),
                paddingBottom: sizeHelper.calHp(50),
              }}
            >
              <CustomButton
                onPress={() => navigation.navigate("DeliveryMethod")}
                text={isAddNewRecipient ? "Add New Recipient" : "Next"}
                width={"100%"}
              />
            </View>
          )}
        </View>
      </ScreenLayout>
    </>
  );
};

export default RecipientInformation;

const styles = StyleSheet.create({
  box: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.input_field_stroke,
    borderRadius: sizeHelper.calWp(30),
    gap: sizeHelper.calHp(20),
    overflow: "hidden",
  },

  circle: {
    height: sizeHelper.calWp(75),
    width: sizeHelper.calWp(75),
    backgroundColor: theme.colors.light_blue,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: sizeHelper.calWp(75),
  },
  editImgAbsolute: {
    position: "absolute",
    bottom: sizeHelper.calHp(-5),
    width: sizeHelper.calWp(45),
    height: sizeHelper.calWp(45),
    borderRadius: sizeHelper.calWp(45),
    backgroundColor: theme.colors.primary,
    borderWidth: sizeHelper.calWp(3),
    right: sizeHelper.calWp(-5),
    borderColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  editImgContainer: {
    width: sizeHelper.calWp(130),
    height: sizeHelper.calWp(130),
    borderRadius: sizeHelper.calWp(130),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: sizeHelper.calWp(5),
    borderColor: theme.colors.white,
    backgroundColor: "#D4E7F7",
  },
});
