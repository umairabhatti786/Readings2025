import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appStyles} from '../../../utils/AppStyles';
import CustomText from '../../../components/CustomText';
import {colors} from '../../../utils/colors';
import CustomButton from '../../../components/CustomButton';
interface data {
  time?: string;
  notificationDetail?: string;
  des?: string;
  onPress?: () => void;
}
type Props = {
  data: data;
};
const NotificationCard = ({data}: Props) => {
  return (
    <View
      style={{
        ...appStyles.rowjustify,
      }}>
      <View style={{gap: scale(8), width: '65%'}}>
        <CustomText text={data?.des} color={colors.black} size={12} />
        <CustomText text={data?.time} color={colors.grey} size={10} />
      </View>
      <CustomButton
        width={'30%'}
        onPress={data?.onPress}
        text={data?.notificationDetail}
        bgColor={colors.white}
        textColor={colors.primary}
      />
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
});
