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
import { windowWidth } from "../../utils/Dimensions";
import { colors } from "../../utils/colors";
import { images } from "../../assets/images";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import { appStyles } from "../../utils/AppStyles";
import CustomButton from "../CustomButton";

  const ActionModal = ({
    modalVisible,
    setModalVisible,
    onCancel,
    onDelete,
    title,
    des,
  }: any) => {
    const [isEnabled, setIsEnabled] = useState(true);
  
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
              gap: verticalScale(10),
              alignItems: "center",
              paddingVertical: verticalScale(10),
            }}
          >
            <CustomText
              text={title||"Delete Account"}
              fontFam={font.WorkSans_SemiBold}
              fontWeight="600"
              size={20}
            />
            <CustomText
              style={{ textAlign: "center" }}
              lineHeight={18}
              text={
                des||"You are about to delete your account. All your saved information will be lost permanently."
              }
              color={colors.dark_grey}
              size={14}
            />
          </View>
          <View style={{ ...appStyles.rowjustify, width: "100%" }}>
            <CustomButton width={"45%"} text={"Cancel"} onPress={onCancel} />
            <CustomButton
              width={"45%"}
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
  
  export default ActionModal;
  
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
  