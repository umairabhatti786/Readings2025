import {Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import CustomText from '../CustomText';
import {colors} from '../../utils/colors';
import CustomButton from '../CustomButton';
import {scale, verticalScale} from 'react-native-size-matters';
import {images} from '../../assets/images';
import {font} from '../../utils/font';
import {windowWidth} from '../../utils/Dimensions';
import {appStyles} from '../../utils/AppStyles';
const LogoutModal = ({
  modalVisible,
  setModalVisible,
  onCancel,
  onLogout,
}: any) => {
  return (
    <Modal
      isVisible={modalVisible}
      deviceWidth={windowWidth}
      onBackButtonPress={() => setModalVisible?.(false)}
      onBackdropPress={() => setModalVisible?.(false)}
      backdropColor="rgba(0,0,0,0.2)"
      style={{flex: 1}}>
      <View style={styles.Container}>
        <Image
          style={{width: scale(75), height: scale(75)}}
          source={images.logout}
        />
        <View
          style={{
            gap: verticalScale(10),
            alignItems: 'center',
            paddingVertical: verticalScale(10),
          }}>
          <CustomText
            text={'Logout?'}
            fontFam={font.WorkSans_SemiBold}
            fontWeight="600"
            size={20}
          />
          <CustomText
            style={{textAlign: 'center'}}
            lineHeight={18}
            text={
              "Are you sure you want to logout?"
            }
            color={colors.grey}
            size={14}
          />
        </View>
        <View style={{...appStyles.rowjustify, width: '100%'}}>
          <CustomButton width={'45%'} text={'Cancel'} onPress={onCancel} />
          <CustomButton
            width={'45%'}
            bgColor={colors.dull_white}
            textColor={colors.primary}
            text={'Logout'}
            onPress={onLogout}
          />
        </View>
      </View>
    </Modal>
  );
};
export default LogoutModal;
const styles = StyleSheet.create({
  Container: {
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: scale(20),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(25),
    gap: verticalScale(20),
  },
});
