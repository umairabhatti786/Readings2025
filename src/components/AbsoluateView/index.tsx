import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../../utils/colors";

const AbsoluateView = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        zIndex: 999999,
        position: "absolute",
        backgroundColor: 'rgba(0,0,0,.0)',
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    </View>
  );
};

export default AbsoluateView;
