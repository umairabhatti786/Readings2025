import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import ScreenLayout from '../../../components/ScreenLayout';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../../utils/colors';
import TopHeader from '../../../components/TopHeader';
import CustomText from '../../../components/CustomText';
import CustomInput from '../../../components/CustomInput';
import {images} from '../../../assets/images';
import {font} from '../../../utils/font';
import CustomButton from '../../../components/CustomButton';
import {appStyles} from '../../../utils/AppStyles';
import {useDispatch} from 'react-redux';
import {setUserLogin} from '../../../redux/reducers/authReducer';
import AddressCard from '../../../components/AddressCard';

const PaymentInfoScreen = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  let disableSkip = route?.params?.disableSkip;

  return (
    <ScreenLayout>
      <View
        style={{
          paddingBottom: verticalScale(10),

          paddingHorizontal: scale(20),
        }}>
        <TopHeader title="Payment Info" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: colors.dull_white, flex: 1}}
        contentContainerStyle={{
          backgroundColor: colors.dull_white,
          gap: verticalScale(20),
          paddingTop: verticalScale(10),
          flex: 1,
        }}>
        <View
          style={{
            paddingHorizontal: scale(20),
            gap: verticalScale(20),
          }}>
          <CustomText
            text={
              'Add your optional payment method to save for future purchases.'
            }
            size={14}
          />
          <CustomInput
            placeholder="Card Nuumber"
            rightSource={images.visa}
            rightSourceSize={30}
          />
          <CustomInput placeholder="Card Holder Name" />
          <View style={appStyles.rowjustify}>
            <CustomInput
              width={'47%'}
              textAlign="center"
              placeholder="07 / 27"
            />
            <CustomInput width={'47%'} placeholder="CVC" />
          </View>
        </View>

        <View>
          <CustomText
            text={'Billing Addresses'}
            color={colors.black}
            fontWeight="600"
            style={{
              marginLeft: scale(20),
              marginBottom: verticalScale(5),
              marginTop: verticalScale(5),
            }}
            fontFam={font.WorkSans_SemiBold}
            size={18}
          />

          <FlatList
            data={[1, 2, 3]}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{paddingLeft: scale(20)}}
            contentContainerStyle={{
              paddingRight: scale(40),
              gap: scale(7),
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}: any) => {
              return (
                <View>
                  <AddressCard />
                </View>
              );
            }}
          />

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('AddAddressScreen')}
            style={{
              ...appStyles.row,
              gap: scale(10),
              marginHorizontal: scale(20),
              marginTop: verticalScale(15),
            }}>
            <CustomText
              text={'Add Biling Address'}
              size={14}
              color={colors.primary}
              fontWeight="600"
              fontFam={font.WorkSans_SemiBold}
            />
            <Image
              source={images.plus}
              resizeMode="contain"
              style={{
                width: scale(15),
                height: scale(15),
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.continueBtnContainer}>
          {!disableSkip && (
            <TouchableOpacity
              onPress={() => {
                dispatch(setUserLogin(true));
                navigation.navigate('BottomTab');
              }}
              activeOpacity={0.5}>
              <CustomText
                fontWeight="600"
                fontFam={font.WorkSans_SemiBold}
                color={colors.primary}
                text={'Skip'}
                size={14}
              />
            </TouchableOpacity>
          )}

          <CustomButton
            onPress={() => {
              dispatch(setUserLogin(true));
              navigation.navigate('BottomTab');
            }}
            text="Continue"
            style={{marginTop: verticalScale(20)}}
          />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

export default PaymentInfoScreen;

const styles = StyleSheet.create({
  continueBtnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: verticalScale(30),
    paddingHorizontal: scale(20),
  },
});
