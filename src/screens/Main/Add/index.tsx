import React, { useState } from "react";
import { View, StyleSheet} from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import ScreenLayout from "../../../components/ScreenLayout";
const AddScreen = ({ navigation }: any) => {
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

export default AddScreen;

const styles = StyleSheet.create({
});
