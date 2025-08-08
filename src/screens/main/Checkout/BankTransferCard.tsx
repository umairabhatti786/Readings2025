import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {appStyles} from '../../../utils/AppStyles';
import CustomText from '../../../components/CustomText';
import {font} from '../../../utils/font';
import {colors} from '../../../utils/colors';
import {images} from '../../../assets/images';

type Props = {};

const BankTransferCard = ({}: Props) => {
  return (
    <View style={styles.main}>
      <CustomText
        text={'Allied Bank'}
        fontFam={font.WorkSans_SemiBold}
        fontWeight="600"
        color={colors.black}
        size={18}
      />

      <View style={{...appStyles.rowjustify, width: '100%'}}>
        <CustomText text={'Title of Account'} color={colors.grey} size={12} />
        <CustomText
          text={'Elan Vital Private Limited'}
          color={colors.black}
          size={12}
        />
      </View>
      <View style={{...appStyles.rowjustify, width: '100%'}}>
        <CustomText text={'Account No'} color={colors.grey} size={12} />
        <View style={{...appStyles.row, gap: scale(7)}}>
          <Image source={images.copy} style={styles.copyImage} />
          <CustomText
            text={'02160010070305740013'}
            color={colors.black}
            size={12}
          />
        </View>
      </View>
      <View style={{...appStyles.rowjustify, width: '100%'}}>
        <CustomText text={'IBAN No'} color={colors.grey} size={12} />
        <View style={{...appStyles.row, gap: scale(7)}}>
          <Image source={images.copy} style={styles.copyImage} />
          <CustomText
            text={'PK19ABPA0010070305740013'}
            color={colors.black}
            size={12}
          />
        </View>
      </View>
      <View style={{...appStyles.rowjustify, width: '100%'}}>
        <CustomText text={'Branch'} color={colors.grey} size={12} />
        <View style={{...appStyles.row, gap: scale(7)}}>
          <Image source={images.copy} style={styles.copyImage} />
          <CustomText
            text={'Main Market Gulberg Branch, Lahore'}
            color={colors.black}
            size={12}
          />
        </View>
      </View>
    </View>
  );
};

export default BankTransferCard;

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.white,
    padding: scale(15),
    borderRadius: scale(10),
    gap: verticalScale(8),
    marginTop: verticalScale(-7),
  },
  copyImage: {
    width: scale(15),
    height: scale(15),
  },
});
