import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../../utils/colors";
import LottieView from "lottie-react-native";
import { scale, verticalScale } from "react-native-size-matters";

const ScreenLoader = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        zIndex: 999999,
        position: "absolute",
        backgroundColor: 'rgba(0,0,0,.3)',
        justifyContent: "center",
        alignItems: "center",
      }}
    >
            <LottieView
          style={{ width: scale(70), height: verticalScale(40) }}
          source={require("../../assets/json/laoding.json")}
          renderMode="HARDWARE"
          speed={1.2}
          autoPlay
        />
      {/* <ActivityIndicator size="large" color={colors.primary} /> */}
    </View>
  );
};

export default ScreenLoader;
