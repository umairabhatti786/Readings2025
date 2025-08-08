import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {appStyles} from '../../../utils/AppStyles';
import CustomText from '../../../components/CustomText';
import {font} from '../../../utils/font';
import {colors} from '../../../utils/colors';
import {windowWidth} from '../../../utils/Dimensions';
import {images} from '../../../assets/images';
import Stars from 'react-native-stars';

interface data {
  title?: string;
  auther?: string;
  listPrice?: string;
  appPrice?: string;
  quantity?: string;
}
type Props = {
  data?: any;
  onPress?: any;
};

const BookReviewCard = ({data, onPress}: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={styles.main}>
      <View style={{
            gap: verticalScale(7),

      }}>
      <View style={{...appStyles.rowjustify}}>
        <CustomText
          text={data?.first_name}
          style={{width:"70%",}}
          fontWeight="600"
          numberOfLines={1}
          fontFam={font.WorkSans_SemiBold}
          color={colors.black}
          size={12}
        />
        <Stars
          default={data?.rating}
          count={5}
          disabled={true}
          spacing={scale(2)}
          starSize={scale(10)}
          fullStar={images.fill_star}
          emptyStar={images.unfill_star}
        />
      </View>

      <CustomText
        numberOfLines={4}
        style={{textAlign: 'justify'}}
        text={data?.review }
        lineHeight={22}
        color={colors.grey}
        size={13}
      />

      </View>
    
      <View style={{...appStyles.row, gap: scale(7)}}>
        <Image
          source={images.like}
          style={{width: scale(20), height: scale(20)}}
          resizeMode="contain"
        />
        <CustomText text={0} color={colors.black} size={12} />
      </View>
    </TouchableOpacity>
  );
};

export default BookReviewCard;

const styles = StyleSheet.create({
  main: {
    width: windowWidth / 1.4,
    height:verticalScale(115),
    borderRadius: scale(10),
    overflow: 'hidden',
    backgroundColor: colors.white,
    padding: scale(15),
    gap: verticalScale(7),
    justifyContent:"space-between"
  },
});
