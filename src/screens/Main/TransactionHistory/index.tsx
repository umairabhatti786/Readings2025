import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import { appStyles } from "../../../utils/GlobalStyles";
import icons from "../../../utils/Constants/icons";
import CustomHeader from "../../../components/Header";
import images from "../../../utils/Constants/images";
import CustomSearch from "../../../components/Search";
import { TransactionsHistoryData } from "../../../utils/Data";

const TransactionHistory = ({ navigation }: any) => {
  const [selectedTab, setSelectedTab] = useState(1);

  const TabData = [
    { title: "All", id: 1 },
    { title: "Completed", id: 2 },
    { title: "Failed", id: 3 },
    { title: "Pending", id: 4 },
  ];

  const TabCard = ({ selectedTab, item, onPress }: any) => {
    return (
      <>
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor:
              selectedTab == item?.id ? theme.colors.primary : "transparent",
            alignItems: "center",
            paddingVertical: sizeHelper.calHp(15),

            width: "33%",
            justifyContent: "center",
            borderRadius: sizeHelper.calWp(15),
          }}
        >
          <CustomText
            text={item?.title}
            color={
              selectedTab == item?.id
                ? theme.colors.white
                : theme.colors.black + "50"
            }
            fontWeight="600"
            size={23}
          />
        </TouchableOpacity>
      </>
    );
  };

  const TransactionsHistoryCard = ({ item }: any) => {
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
          <View
            style={{
              width: sizeHelper.calWp(100),
              height: sizeHelper.calWp(100),
              borderRadius: sizeHelper.calWp(100),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#E8EFE8",
            }}
          >
            <Image
              style={{
                width: sizeHelper.calWp(20),
                height: sizeHelper.calWp(20),
                tintColor: "#256B1E",
              }}
              source={icons.request}
            />
          </View>
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
          paddingHorizontal: sizeHelper.calWp(30),
          gap: sizeHelper.calWp(40),
        }}
      >
        <View style={{ flex: 1, gap: sizeHelper.calHp(25) }}>
          <CustomHeader title={"Transaction History"} />
          <View style={{ gap: sizeHelper.calHp(10) }}>
            <CustomSearch placeholder="Search recipient" />

            <View style={styles.tabMain}>
              {TabData.map((ite, index) => {
                return (
                  <TabCard
                    onPress={() => setSelectedTab(ite?.id)}
                    item={ite}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                  />
                );
              })}
            </View>
          </View>

          <FlatList
            data={TransactionsHistoryData}
            contentContainerStyle={{
              gap: sizeHelper.calWp(20),
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }: any) => {
              return (
                <>
                  <TransactionsHistoryCard item={item} />
                </>
              );
            }}
          />
        </View>
      </ScreenLayout>
    </>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  tabMain: {
    width: "100%",
    borderRadius: sizeHelper.calWp(15),
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.input_field_stroke,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: sizeHelper.calHp(5),
  },
});
