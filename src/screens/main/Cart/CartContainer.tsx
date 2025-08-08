import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {appStyles} from '../../../utils/AppStyles';
import CustomText from '../../../components/CustomText';
import {font} from '../../../utils/font';
import {colors} from '../../../utils/colors';
import {windowWidth} from '../../../utils/Dimensions';
import {images} from '../../../assets/images';
import { URLS } from '../../../apis/Urls';

interface data {
  title?: string;
  auther?: string;
  listPrice?: string;
  appPrice?: string;
  quantity?: string;
}
type Props = {
  data?: any;
  onPress?:any
  setQuantity?:any
  quantity?:any
};

const CartContainer = ({data,setQuantity,quantity}: Props) => {
  
  return (
    <View
    style={{
      width: "100%",
      flexDirection: "row",
      borderRadius: scale(15),
      overflow: "hidden",
      backgroundColor: colors.white,
    }}
  >
    <ImageBackground
      style={styles.bookImage}
      source={{ uri: `${URLS.IMAGE_URL}/images/${data?.picname}.webp` }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundColor: colors.white,
          opacity: 0.7,
        }}
      />
      <Image
        style={{
          width: scale(60),
          height: verticalScale(80),
          borderRadius: scale(5),
          overflow: "hidden",
        }}
        source={{ uri: `${URLS.IMAGE_URL}/images/${data?.picname}.webp` }}
        resizeMode="contain"
      />
    </ImageBackground>
    <View
      style={{
        padding: scale(10),
        flex: 1,
        gap: verticalScale(5),
      }}
    >
      <View style={{ gap: scale(2), paddingTop: verticalScale(3) }}>
        <CustomText
          text={data?.BOOK_TITLE}
          textTransform={"capitalize"}
          color={colors.black}
          numberOfLines={1}
          fontWeight="600"
          fontFam={font.WorkSans_SemiBold}
          size={14}
        />

        <CustomText
          text={data?.authorName}
          numberOfLines={1}
          textTransform={"capitalize"}
          color={colors.grey}
          size={12}
        />
      </View>
      <View style={{ ...appStyles.rowjustify, paddingTop: verticalScale(5) }}>
        <CustomText text={"List Price"} color={colors.grey} size={13} />
        <CustomText
          textDecorationLine={
            Number(data?.Discount) > 0 ? "line-through" : "nunu"
          }
          text={
            data?.currency == "Rs"
              ? `${data?.currency} ${data?.PRICE}`
              : `${data?.currency} ${data?.PRICE} = ${data?.PAK_PRICE}`
          }
          color={colors.black}
          size={12}
        />
      </View>

      <View style={appStyles.rowjustify}>
        <CustomText text={"Our Price"} color={colors.grey} size={12} />
        <CustomText
          text={`Rs ${
            Number(data?.Discount) > 0
              ? Math.floor(
                  Number(data?.PAK_PRICE) -
                    Number(data?.PAK_PRICE) * (Number(data?.Discount) / 100)
                )
              : data?.PAK_PRICE
          }`}
          color={colors.orange}
          fontWeight="600"
          fontFam={font.WorkSans_SemiBold}
          size={14}
        />
      </View>
      <CustomText
        text={data?.availabilityStatus}
        color={
          data?.availabilityStatus == "In Stock" ? colors.green : colors.red
        }
        size={12}
      />
       <View
          style={{
            ...appStyles.row,
            paddingTop: verticalScale(4),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (quantity != 1) {
                setQuantity((prev)=>prev-1);
              }
            }}
            activeOpacity={0.5}
            style={styles.box}
          >
            <Image
              style={{
                width: scale(15),
                height: scale(15),
                tintColor: colors.white,
              }}
              source={images.decrement}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <CustomText
            style={{ width: scale(35), textAlign: "center" }}
            text={quantity}
            color={colors.black}
            fontWeight="600"
            fontFam={font.WorkSans_SemiBold}
            size={15}
          />

          <TouchableOpacity
            onPress={() => {
              setQuantity((prev)=>prev+1);

              
            }}
            activeOpacity={0.5}
            style={styles.box}
          >
            <Image
              style={{
                width: scale(11),
                height: scale(11),
                tintColor: colors.white,
              }}
              source={images.increment}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
     
    </View>
  </View>
  );
};

export default CartContainer;

const styles = StyleSheet.create({
  box: {
    width: scale(22),
    height: scale(22),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: scale(6),
  },

  bookIcons: {
    width: scale(18),
    height: scale(18),
  },
  bookImage: {
    width: windowWidth / 3.3,
    // height: verticalScale(135),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
