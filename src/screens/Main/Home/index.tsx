import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import { appStyles } from "../../../utils/GlobalStyles";
import icons from "../../../utils/Constants/icons";
import images from "../../../utils/Constants/images";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import {
  ExchangeRateData,
  LatestTransactionsData,
  QuickSendData,
} from "../../../utils/Data";

const HomeScreen = ({ navigation }: any) => {
  const Header = () => {
    return (
      <View
        style={{
          ...appStyles.rowjustify,
          paddingHorizontal: sizeHelper.calWp(30),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfileScreen")}
          style={{ ...appStyles.row, gap: sizeHelper.calWp(25) }}
        >
          <Image
            style={{
              width: sizeHelper.calWp(105),
              height: sizeHelper.calWp(105),
              borderRadius: sizeHelper.calWp(105),
            }}
            source={images.user5}
          />
          <View>
            <CustomText
              text={"Hey, Donald"}
              fontWeight="700"
              size={30}
              fontFam={fonts.PlusJakartaSans_Bold}
            />
            <CustomText
              text={"Welcome back!"}
              size={22}
              color={theme.colors.text_gray100}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={()=>navigation.navigate("TransactionHistory")}
          style={{
            width: sizeHelper.calWp(80),
            height: sizeHelper.calWp(80),
            borderRadius: sizeHelper.calWp(80),
            backgroundColor: theme.colors.input_field_stroke,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <Image
              style={{
                width: sizeHelper.calWp(35),
                height: sizeHelper.calWp(35),
              }}
              source={icons.norification}
            />
            <View
              style={{
                position: "absolute",
                top: sizeHelper.calHp(-5),
                width: sizeHelper.calWp(20),
                height: sizeHelper.calWp(20),
                borderRadius: sizeHelper.calWp(20),
                backgroundColor: theme.colors.secondary,
                borderWidth: sizeHelper.calWp(5),
                right: sizeHelper.calWp(-5),
                borderColor: theme.colors.light_white,
              }}
            ></View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const AvailablebBalance = () => {
    return (
      <View
        style={{
          backgroundColor: theme.colors.primary,
          borderRadius: sizeHelper.calWp(40),
          padding: sizeHelper.calWp(25),
          gap: sizeHelper.calHp(20),
          marginHorizontal: sizeHelper.calWp(30),
        }}
      >
        <View style={appStyles.rowjustify}>
          <View
            style={{
              ...appStyles.row,
              backgroundColor: theme.colors.light_blue,
              paddingHorizontal: sizeHelper.calWp(18),
              paddingVertical: sizeHelper.calHp(10),
              borderRadius: 999,
            }}
          >
            <TouchableOpacity
              style={{ ...appStyles.row, gap: sizeHelper.calWp(12) }}
            >
              <CustomText
                text={"US Dollar"}
                fontWeight="600"
                size={23}
                color={theme.colors.white}
                fontFam={fonts.PlusJakartaSans_SemiBold}
              />
              <Image
                style={{
                  width: sizeHelper.calWp(23),
                  height: sizeHelper.calWp(23),
                  tintColor: theme.colors.white,
                  marginTop: sizeHelper.calHp(5),
                }}
                resizeMode="contain"
                source={icons.down_arrow}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ ...styles.circle }}>
            <Image
              style={{
                width: sizeHelper.calWp(40),
                height: sizeHelper.calWp(40),
                tintColor: theme.colors.white,
              }}
              // resizeMode="contain"
              source={icons.eye_off}
            />
          </TouchableOpacity>
        </View>

        <View>
          <CustomText text={"Available balance"} size={23} color={"#6AA5D8"} />

          <CustomText
            text={"$365,654.64"}
            fontWeight="700"
            size={55}
            color={theme.colors.white}
            fontFam={fonts.PlusJakartaSans_Bold}
          />
          <View
            style={{
              width: "100%",
              height: sizeHelper.calHp(1.3),
              backgroundColor: theme.colors.white + "40",
              marginTop: sizeHelper.calHp(10),
            }}
          />
        </View>
        <View
          style={{
            ...appStyles.rowjustify,
            paddingHorizontal: sizeHelper.calWp(40),
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("SendMoneyScreen")}
            style={{ alignItems: "center", gap: sizeHelper.calHp(5) }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("SendMoneyScreen")}
              style={{
                ...styles.circle,
                borderWidth: 1,
                borderColor: theme.colors.white,
              }}
            >
              <Image style={styles.balanceActionIcon} source={icons.transfer} />
            </TouchableOpacity>

            <CustomText
              text={"Transfer"}
              color={theme.colors.white}
              size={18}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: "center", gap: sizeHelper.calHp(5) }}
          >
            <TouchableOpacity
              style={{
                ...styles.circle,
                borderWidth: 1,
                borderColor: theme.colors.white,
              }}
            >
              <Image style={styles.balanceActionIcon} source={icons.request} />
            </TouchableOpacity>

            <CustomText text={"Request"} color={theme.colors.white} size={18} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: "center", gap: sizeHelper.calHp(5) }}
          >
            <TouchableOpacity
              style={{
                ...styles.circle,
                borderWidth: 1,
                borderColor: theme.colors.white,
              }}
            >
              <Image
                style={{
                  width: sizeHelper.calWp(30),
                  height: sizeHelper.calWp(30),
                }}
                source={icons.arrow_switch_horizontal}
              />
            </TouchableOpacity>

            <CustomText
              text={"Exchange"}
              color={theme.colors.white}
              size={18}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: "center", gap: sizeHelper.calHp(5) }}
          >
            <TouchableOpacity
              style={{
                ...styles.circle,
                borderWidth: 1,
                borderColor: theme.colors.white,
              }}
            >
              <Image
                style={{
                  width: sizeHelper.calWp(25),
                  height: sizeHelper.calWp(25),
                  tintColor: theme.colors.white,
                }}
                source={icons.plus}
              />
            </TouchableOpacity>

            <CustomText text={"Add"} color={theme.colors.white} size={18} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const ExchangeRateCard = ({ item }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          backgroundColor: theme.colors.white,
          width: WINDOW_WIDTH / 3,
          borderRadius: sizeHelper.calWp(40),
          gap: sizeHelper.calHp(10),
          padding: sizeHelper.calWp(20),
        }}
      >
        <Image
          style={{
            width: sizeHelper.calWp(75),
            height: sizeHelper.calWp(75),
            borderRadius: sizeHelper.calWp(75),
          }}
          source={item?.icon}
        />
        <View style={{ gap: sizeHelper.calHp(5) }}>
          <CustomText
            text={item?.name}
            numberOfLines={1}
            color={theme.colors.light_black}
            fontFam={fonts.PlusJakartaSans_SemiBold}
          />

          <CustomText
            text={item?.rate}
            size={30}
            color={theme.colors.black}
            fontWeight="700"
            fontFam={fonts.PlusJakartaSans_Bold}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const QuickSendCard = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={{ alignItems: "center", gap: sizeHelper.calHp(5) }}
      >
        <Image
          style={{
            width: sizeHelper.calWp(95),
            height: sizeHelper.calWp(95),
            borderRadius: sizeHelper.calWp(95),
          }}
          source={item?.icon}
        />

        <CustomText text={"Transfer"} size={18} />
      </TouchableOpacity>
    );
  };

  const LatestTransactionsCard = ({ item }: any) => {
    return (
      <View
        style={{
          padding: sizeHelper.calWp(25),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: theme.colors.white,
          borderRadius: sizeHelper.calWp(30),
        }}
      >
        <View style={{ ...appStyles.row, gap: sizeHelper.calWp(25) }}>
          <Image
            style={{
              width: sizeHelper.calWp(80),
              height: sizeHelper.calWp(80),
              borderRadius: sizeHelper.calWp(80),
            }}
            source={item?.icon}
          />
          <View style={{ gap: sizeHelper.calHp(5) }}>
            <CustomText
              text={item?.name}
              fontWeight="700"
              size={25}
              fontFam={fonts.PlusJakartaSans_Bold}
            />
            <CustomText
              text={item?.date}
              size={19}
              color={theme.colors.text_gray100}
            />
          </View>
        </View>
        <View style={{ alignItems: "flex-end", gap: sizeHelper.calHp(10) }}>
          <CustomText
            text={item?.price}
            fontWeight="700"
            size={25}
            color={
              item?.status == "failed"
                ? theme.colors.warning
                : theme.colors.green
            }
            fontFam={fonts.PlusJakartaSans_SemiBold}
          />

          <TouchableOpacity
            style={{
              ...appStyles.row,
              gap: sizeHelper.calWp(20),
              backgroundColor:
                item?.status == "completed"
                  ? "#E8EFE8"
                  : item?.status == "pending"
                  ? "#E8E7F5"
                  : item?.status == "failed"
                  ? "#F4E7E7"
                  : theme.colors.primary,
              paddingHorizontal: sizeHelper.calWp(25),
              paddingVertical: sizeHelper.calHp(8),
              borderRadius: sizeHelper.calWp(18),
            }}
          >
            <Image
              style={{
                width: sizeHelper.calWp(33),
                height: sizeHelper.calWp(33),
                tintColor:
                  item?.status == "completed"
                    ? theme.colors.dark_green
                    : item?.status == "pending"
                    ? theme.colors.dark_blue
                    : item?.status == "failed"
                    ? theme.colors.dark_red
                    : theme.colors.primary,
                marginTop: sizeHelper.calHp(5),
              }}
              resizeMode="contain"
              source={
                item?.status == "completed"
                  ? icons.check
                  : item?.status == "pending"
                  ? icons?.clock
                  : item?.status == "failed"
                  ? icons.cross
                  : icons?.check
              }
            />
            <CustomText
              text={
                item?.status == "completed"
                  ? "Completed"
                  : item?.status == "pending"
                  ? "Pending"
                  : item?.status == "failed"
                  ? "Failed"
                  : "Status"
              }
              fontWeight="600"
              size={21}
              color={
                item?.status == "completed"
                  ? theme.colors.dark_green
                  : item?.status == "pending"
                  ? theme.colors.dark_blue
                  : item?.status == "failed"
                  ? theme.colors.dark_red
                  : theme.colors.primary
              }
              fontFam={fonts.PlusJakartaSans_SemiBold}
            />
          </TouchableOpacity>
        </View>
      </View>
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
        <View
          style={{
            flex: 1,
            gap: sizeHelper.calHp(30),
            backgroundColor: theme.colors.background,
          }}
        >
          <Header />
          <ScrollView
            contentContainerStyle={{
              gap: sizeHelper.calHp(30),
              backgroundColor: theme.colors.background,
              paddingBottom: sizeHelper.calHp(30),
            }}
          >
            {/* <View style=> */}
            <AvailablebBalance />

            {/* </View> */}
            <View style={{ gap: sizeHelper.calHp(20) }}>
              <View
                style={{
                  ...appStyles.rowjustify,
                  paddingHorizontal: sizeHelper.calWp(30),
                }}
              >
                <CustomText
                  text={"Exchange rate"}
                  fontWeight="700"
                  size={28}
                  fontFam={fonts.PlusJakartaSans_Bold}
                />

                <CustomText
                  text={"View all"}
                  size={22}
                  color={theme.colors.text_gray200}
                />
              </View>
              <FlatList
                data={ExchangeRateData}
                horizontal
                style={{ paddingLeft: sizeHelper.calWp(30) }}
                contentContainerStyle={{
                  gap: sizeHelper.calWp(20),
                  paddingRight: sizeHelper.calWp(60),
                  // justifyContent: "space-between",
                }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }: any) => {
                  return (
                    <>
                      <ExchangeRateCard item={item} />
                    </>
                  );
                }}
              />
            </View>
            {/* Quick send */}
            <View style={{ gap: sizeHelper.calHp(20) }}>
              <View
                style={{
                  paddingHorizontal: sizeHelper.calWp(30),
                }}
              >
                <CustomText
                  text={"Quick send"}
                  fontWeight="700"
                  size={28}
                  fontFam={fonts.PlusJakartaSans_Bold}
                />
              </View>
              <FlatList
                data={QuickSendData}
                horizontal
                ListHeaderComponent={() => {
                  return (
                    <View
                      style={{
                        gap: sizeHelper.calWp(20),
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          alignItems: "center",
                          gap: sizeHelper.calHp(15),
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            ...styles.circle,
                            borderWidth: 1,
                            borderStyle: "dotted",
                            borderColor: theme.colors.black,
                            backgroundColor: theme.colors.white,
                            height: sizeHelper.calWp(80),
                            width: sizeHelper.calWp(80),
                          }}
                        >
                          <Image
                            style={{
                              width: sizeHelper.calWp(30),
                              height: sizeHelper.calWp(30),
                              tintColor: theme.colors.black,
                            }}
                            source={icons.plus}
                          />
                        </TouchableOpacity>

                        <CustomText text={"Add"} size={18} />
                      </TouchableOpacity>

                      <View
                        style={{
                          width: sizeHelper.calWp(2),
                          height: sizeHelper.calHp(100),
                          backgroundColor: theme.colors.black + "20",
                        }}
                      />
                    </View>
                  );
                }}
                style={{ paddingLeft: sizeHelper.calWp(30) }}
                contentContainerStyle={{
                  gap: sizeHelper.calWp(30),
                  paddingRight: sizeHelper.calWp(60),
                }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }: any) => {
                  return (
                    <>
                      <QuickSendCard item={item} />
                    </>
                  );
                }}
              />
            </View>

            <View
              style={{
                gap: sizeHelper.calHp(20),
                paddingHorizontal: sizeHelper.calWp(30),
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("TransactionHistory")}
                style={{
                  ...appStyles.rowjustify,
                }}
              >
                <CustomText
                  text={"Latest Transactions"}
                  fontWeight="700"
                  size={28}
                  fontFam={fonts.PlusJakartaSans_Bold}
                />

                <CustomText
                  text={"View all"}
                  size={22}
                  color={theme.colors.text_gray200}
                />
              </TouchableOpacity>
              <FlatList
                data={LatestTransactionsData}
                contentContainerStyle={{
                  gap: sizeHelper.calWp(20),
                }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }: any) => {
                  return (
                    <>
                      <LatestTransactionsCard item={item} />
                    </>
                  );
                }}
              />
            </View>
          </ScrollView>
        </View>
      </ScreenLayout>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  circle: {
    height: sizeHelper.calWp(70),
    width: sizeHelper.calWp(70),
    backgroundColor: theme.colors.light_blue,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: sizeHelper.calWp(70),
  },
  balanceActionIcon: {
    width: sizeHelper.calWp(20),
    height: sizeHelper.calWp(20),
    tintColor: theme.colors.white,
  },
});
