import React, {version} from 'react';
import {View, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters'; // If using for scaling
import {colors} from '../../../utils/colors';
import CustomText from '../../../components/CustomText';
import {font} from '../../../utils/font';
import {OrderTracking} from '../../../components/OrderTracking';

const OrderTrackingCard = ({}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={{
          gap: verticalScale(8),
          paddingHorizontal: scale(15),
          paddingTop: verticalScale(15),
        }}>
        <CustomText
          fontWeight="600"
          fontFam={font.WorkSans_SemiBold}
          text={'ORDER123456'}
          color={colors.black}
          size={14}
        />
        <View style={styles.header}>
          <CustomText text={'ETA'} color={colors.grey} size={12} />
          <CustomText
            text={'2 days (Approximately)'}
            color={colors.black}
            size={12}
          />
        </View>
      </View>
      {/* Status Row */}
      <OrderTracking />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: scale(10),
    gap: verticalScale(8),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle: {
    width: scale(8),
    height: scale(8),
    borderRadius: 999,
    backgroundColor: '#ddd',
  },
});

export default OrderTrackingCard;
