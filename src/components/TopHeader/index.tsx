import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appStyles} from '../../utils/AppStyles';
import {images} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../CustomText';
import {font} from '../../utils/font';
import {colors} from '../../utils/colors';
type Props = {
  title?: string;
  rightTitle?: string;
  onRightPress?:any
  rightTitleColor?:any
};

const TopHeader = ({title, rightTitle,onRightPress,rightTitleColor}: Props) => {
  const navigation: any = useNavigation();
  return (
    <View style={appStyles.rowjustify}>
      <View style={{...appStyles.row, gap: scale(3),
      width:rightTitle? "52%":"100%",
      
      }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.box}>
          <Image
            style={{
              width: scale(20),
              height: scale(20),
            }}
            resizeMode="contain"
            source={images.left_arrow}
          />
        </TouchableOpacity>

        <CustomText
          fontWeight="600"
          numberOfLines={1}
          fontFam={font.WorkSans_SemiBold}
          text={title}
          size={20}
        />
      </View>
      {rightTitle && (
        <TouchableOpacity
        activeOpacity={0.5}
        onPress={onRightPress}
        disabled={!onRightPress}
        >
           <CustomText
          fontWeight="500"
          color={ rightTitleColor|| colors.primary}
          fontFam={font.WorkSans_Regular}
          text={rightTitle}
          size={14}
        />

        </TouchableOpacity>
       
      )}
    </View>
  );
};

export default TopHeader;

const styles = StyleSheet.create({
  box: {
    width: scale(30),
    height: scale(30),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
