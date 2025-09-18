import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
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
import DropDown from '../../../components/DropDown';
import {CountryData} from '../../../utils/Data';
import CustomCountryPicker from '../../../components/CustomCountryPicker';

const PersonalInfoScreen = ({navigation}: any) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [country, setCountry] = useState<any>("92");

  return (
    <ScreenLayout
      style={{
        paddingHorizontal: scale(20),
        // gap: verticalScale(20),
      }}>
      <View
        style={{
          paddingBottom: verticalScale(10),
        }}>
        <TopHeader title="Personal Info" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: colors.dull_white, flex: 1}}
        contentContainerStyle={{
          backgroundColor: colors.dull_white,
          gap: verticalScale(20),
          paddingTop: verticalScale(10),
        }}>
        <CustomText
          text={
            'You know plenty about readings. It’s our turn to know a little about you.'
          }
          size={14}
        />
        <CustomInput placeholder="Name" />
        <CustomInput placeholder="Address" />
        <View style={appStyles.rowjustify}>
          <CustomInput width={'47%'} placeholder="City" />
          <CustomInput width={'47%'} placeholder="State/Province" />
        </View>
        <DropDown
          placeholder={'Country'}
          // dropWidth={'100%'}
          label="Download"
          setValue={setSelectedCountry}
          value={selectedCountry}
          onSelect={(it: any) => {
            setSelectedCountry(it?.value);
          }}
          data={CountryData.map((item, _index) => {
            return {
              id: item?.id,
              label: item?.label,
              value: item?.value,
            };
          })}
        />
        <CustomInput placeholder="ZIP Code" />

        {/* <CustomCountryPicker/> */}

        <CustomCountryPicker 
        country={country}
        setCountry={setCountry}
        placeholder="345 123 456 7" />
        {/* <View
          style={{
            width: '100%',
            height: verticalScale(150),
            backgroundColor: colors.white,
            borderRadius: scale(10),
            overflow: 'hidden',
          }}>
          <MapView
            zoomControlEnabled={false}
            showsBuildings={true}
            style={{
              height: '100%',
              width: '100%',
            }}></MapView>
          <TouchableOpacity
            style={{
              width: scale(30),
              height: scale(30),
              borderRadius: 999,
              backgroundColor: colors.white,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-end',
              position: 'absolute',
              bottom: verticalScale(10),
              right: scale(10),
            }}>
            <Image
              style={{width: scale(13), height: scale(13)}}
              source={images.location_center}
            />
          </TouchableOpacity>
        </View> */}

        <View style={styles.continueBtnContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('PaymentInfoScreen')}>
            <CustomText
              fontWeight="600"
              fontFam={font.WorkSans_SemiBold}
              color={colors.primary}
              text={'Skip'}
              size={14}
            />
          </TouchableOpacity>

          <CustomButton
            onPress={() => navigation.navigate('PaymentInfoScreen')}
            text="Continue"
            style={{marginTop: verticalScale(20)}}
          />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

export default PersonalInfoScreen;

const styles = StyleSheet.create({
  continueBtnContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: verticalScale(30),
  },
});
