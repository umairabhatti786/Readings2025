import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import sizeHelper from "../../../utils/Helpers";
import ScreenLayout from "../../../components/ScreenLayout";
import { appStyles } from "../../../utils/GlobalStyles";

const ReportScreen = ({ navigation }: any) => {
  return (
    <>
      <ScreenLayout style={appStyles.screenLayout}>
        <View style={{ flex: 1, gap: sizeHelper.calHp(20) }}></View>
      </ScreenLayout>
    </>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({});
