import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import sizeHelper from "../../../utils/Helpers";
import ScreenLayout from "../../../components/ScreenLayout";
const SettingsScreen = ({ navigation }: any) => {
  return (
    <>
      <ScreenLayout
        style={{
          flex: 1,
          paddingHorizontal: sizeHelper.calWp(30),
          gap: sizeHelper.calWp(30),
        }}
      >
        <View style={{ flex: 1, gap: sizeHelper.calHp(20) }}></View>
      </ScreenLayout>
    </>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
