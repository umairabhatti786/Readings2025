import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {appStyles} from '../../../utils/AppStyles';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../../utils/colors';
import CustomText from '../../../components/CustomText';
import {font} from '../../../utils/font';
import {images} from '../../../assets/images';

interface Props {
  bottomSheetModalRef: any;
}

const DiscountSheetModal = ({bottomSheetModalRef}: Props) => {
  const discountData = [
    {
      title:
        'Verify if the first 6 or 8 digits of your card match the BIN numbers listed; if they do, you qualify for the specified discount.',
    },
    {
      title:
        'Proceed to the checkout page and add your card details as part of the payment process. Ensure that the card information is accurate to avoid any issues with validation.',
    },
    {
      title:
        'If your card matches the BIN numbers and is valid for the promotion, the system will automatically apply the corresponding discount to your purchase during checkout.',
    },
    {
      title:
        'Note that each card can only be used to avail of this discount once per day, ensuring fair usage of the promotion.',
    },
  ];
  return (
    <View style={{paddingHorizontal: scale(20), gap: verticalScale(20)}}>
      <View style={appStyles.rowjustify}>
        <CustomText
          text={'How to get your discount'}
          color={colors.black}
          fontWeight="600"
          size={20}
          fontFam={font.WorkSans_SemiBold}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => bottomSheetModalRef.current.dismiss()}
          style={styles.box}>
          <Image
            style={{
              width: scale(17),
              height: scale(17),
              tintColor: colors.black,
            }}
            resizeMode="contain"
            source={images.close}
          />
        </TouchableOpacity>
      </View>
      <View style={{gap: verticalScale(15),marginBottom:verticalScale(20)}}>
        {discountData.map((item, index) => {
          return (
            <View
              key={index.toString()}
              style={{flexDirection: 'row', gap: scale(10)}}>
              <View style={styles.countContainer}>
                <CustomText
                  text={index + 1}
                  color={colors.white}
                  fontWeight="600"
                  size={20}
                  fontFam={font.WorkSans_SemiBold}
                />
              </View>
              <CustomText
                text={item.title}
                style={{marginRight: scale(40)}}
                color={colors.black}
                size={14}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: scale(30),
    height: scale(30),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  countContainer: {
    width: scale(29),
    height: scale(29),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(6),
    backgroundColor: colors.orange,
  },
});

export default DiscountSheetModal;
