import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import CustomHeader from "../../../components/Header";
import { Camera, useCameraDevice } from "react-native-vision-camera";

const PhotoIDCard = ({ navigation }: any) => {
  const camera = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice("back");

  useEffect(() => {
    Camera.requestCameraPermission().then((status) => {
      setHasPermission(status === "granted");
    });
  }, []);

  const takePhoto = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      setTimeout(() => {
        navigation.navigate("CapturedIDCard", { photo: photo });
      }, 500);
    }
  };

  if (!hasPermission || device == null) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
        <View style={styles.overlay}>
          <View style={{ gap: sizeHelper.calHp(20) }}>
            <CustomHeader />
            <CustomText
              text={"Photo ID Cardy"}
              fontWeight="700"
              color={theme.colors.white}
              fontFam={fonts.PlusJakartaSans_Bold}
              size={30}
            />
            <CustomText
              color={theme.colors.input_field_stroke}
              size={21}
              text={
                "Please point the camera at the ID card. Position it inside the frame. Make sure it is clear enough"
              }
            />
          </View>
          <View style={styles.captureImgContainer}></View>
          <CustomText
            text={"Take Front page"}
            fontWeight="600"
            style={{ textAlign: "center" }}
            color={theme.colors.white}
            fontFam={fonts.PlusJakartaSans_SemiBold}
            size={25}
          />
        </View>
        <TouchableOpacity onPress={takePhoto} style={styles.captureButton} />
      </View>
    </>
  );
};

export default PhotoIDCard;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    alignSelf: "center",
    paddingTop: sizeHelper.calHp(40),
    paddingHorizontal: sizeHelper.calWp(30),
    backgroundColor: "rgba(0,0,0,0.1)",
    width: "100%",
    height: "100%",
  },
  captureButton: {
    position: "absolute",
    bottom: sizeHelper.calHp(80),
    alignSelf: "center",
    width: sizeHelper.calWp(140),
    height: sizeHelper.calWp(140),
    borderRadius: sizeHelper.calWp(140),
    backgroundColor: theme.colors.primary,
    borderWidth: 4,
    borderColor: theme.colors.white,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.black, // Optional: black background during load
  },
  captureImgContainer: {
    width: "100%",
    height: sizeHelper.calHp(300),
    borderWidth: sizeHelper.calWp(4),
    borderColor: theme.colors.white + "30",
    borderRadius: sizeHelper.calWp(20),
    marginTop: sizeHelper.calHp(50),
    marginBottom: sizeHelper.calHp(30),
  },
});
