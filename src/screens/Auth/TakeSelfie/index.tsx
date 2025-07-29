import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import icons from "../../../utils/Constants/icons";
import CustomHeader from "../../../components/Header";
import { Camera, useCameraDevice } from "react-native-vision-camera";

const TakeSelfie = ({ navigation }: any) => {
  const camera = useRef<Camera>(null);
  const [position, setPosition] = useState<"front" | "back">("front"); // use state to toggle
  const [hasPermission, setHasPermission] = useState(false);
  const devices: any = useCameraDevice(position);
  useEffect(() => {
    Camera.requestCameraPermission().then((status) => {
      setHasPermission(status === "granted");
    });
  }, []);

  const takePhoto = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      setTimeout(() => {
        navigation.navigate("CapturedYourImage", { photo: photo });
      }, 500);
    }
  };

  if (!hasPermission || devices == null) {
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
          device={devices}
          isActive={true}
          photo={true}
        />
        <View style={styles.overlay}>
          <View style={{ gap: sizeHelper.calHp(20) }}>
            <CustomHeader />
            <CustomText
              text={"Now Take a Selfie"}
              fontWeight="700"
              color={theme.colors.white}
              fontFam={fonts.PlusJakartaSans_Bold}
              size={30}
            />
            <CustomText
              color={theme.colors.input_field_stroke}
              size={21}
              text={
                "Make sure you’re in a well-lit space. Look straight at the camera and remove hats, glasses, or face coverings"
              }
            />
          </View>
          <View style={styles.captureCircle}></View>
        </View>
        <View style={styles.AbsoluteBottomView}>
          <View />
          <TouchableOpacity
            onPress={takePhoto}
            style={styles.captureButton}
          ></TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setPosition((prev) => (prev === "front" ? "back" : "front"))
            }
            style={{
              width: sizeHelper.calWp(70),
              height: sizeHelper.calWp(70),
              borderRadius: sizeHelper.calWp(70),
              backgroundColor: theme.colors.white,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={icons.refresh}
              style={{
                width: sizeHelper.calWp(40),
                height: sizeHelper.calWp(40),
              }}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default TakeSelfie;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    alignSelf: "center",
    paddingTop: sizeHelper.calHp(40),
    paddingHorizontal: sizeHelper.calWp(30),
    backgroundColor: "rgba(0,0,0,0.2)",
    width: "100%",
    height: "100%",
  },

  AbsoluteBottomView: {
    position: "absolute",
    bottom: sizeHelper.calHp(80),
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: sizeHelper.calWp(60),
  },
  captureButton: {
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
  captureCircle: {
    width: sizeHelper.calHp(250),
    height: sizeHelper.calHp(400),
    borderWidth: sizeHelper.calWp(4),
    borderColor: theme.colors.white,
    borderRadius: 9999,
    marginTop: "30%",
    marginBottom: sizeHelper.calHp(30),
    alignSelf: "center",
  },
});
