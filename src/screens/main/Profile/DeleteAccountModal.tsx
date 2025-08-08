import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import Modal from "react-native-modal";
import { scale, verticalScale } from "react-native-size-matters";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import CustomButton from "../../../components/CustomButton";
import { images } from "../../../assets/images";
import { font } from "../../../utils/font";
import { windowWidth } from "../../../utils/Dimensions";
import { appStyles } from "../../../utils/AppStyles";
import CustomInput from "../../../components/CustomInput";

const DeleteAccountModal = ({
  modalVisible,
  setModalVisible,
  onCancel,
  onDelete,
  deletetText,
  setDeleteText,
}: any) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [error, setError] = useState("");

  return (
    <Modal
      isVisible={modalVisible}
      deviceWidth={windowWidth}
      onBackButtonPress={() => setModalVisible?.(false)}
      onBackdropPress={() => setModalVisible?.(false)}
      backdropColor="rgba(0,0,0,0.2)"
      style={{ flex: 1 }}
    >
      <View
        style={{
          width: "85%",
          alignSelf: "center",
          alignItems: "center",
          backgroundColor: colors.white,
          borderRadius: scale(20),
          paddingHorizontal: scale(20),
          paddingVertical: verticalScale(25),
          gap: verticalScale(20),
        }}
      >
        <Image
          style={{ width: scale(75), height: scale(75) }}
          source={images.delete_user}
        />
        <View
          style={{
            gap: verticalScale(20),
            alignItems: "center",
          }}
        >
          <CustomText
            text={"Confirm Deletion"}
            fontFam={font.WorkSans_SemiBold}
            fontWeight="600"
            size={20}
          />
          <CustomInput
            placeholder="Type ‘delete’ to continue"
            borderWidth={1}
            value={deletetText}
            error={error}
            onChangeText={(txt: any) => {
              setDeleteText(txt);
              if (txt != "delete") {
                setError("Invalid");
              } else {
                setError("");
              }
            }}
          />
        </View>
        <View style={{ ...appStyles.rowjustify, width: "100%" }}>
          <CustomButton width={"45%"} text={"Cancel"} onPress={onCancel} />
          <CustomButton
            width={"45%"}
            disable={!!error}
            bgColor={colors.dull_white}
            textColor={colors.red}
            text={"Delete"}
            onPress={onDelete}
          />
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccountModal;

const styles = StyleSheet.create({
  imgContainer: {
    width: 160,
    height: 160,
    borderRadius: 999,
    // backgroundColor: colors.grey400,
    alignItems: "center",
    justifyContent: "center",
  },
});
