import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import ScreenLayout from '../../../components/ScreenLayout';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../../utils/colors';
import TopHeader from '../../../components/TopHeader';
import {Image} from 'react-native-animatable';
import {images} from '../../../assets/images';
import CustomText from '../../../components/CustomText';
import {font} from '../../../utils/font';
const TrackingScreen = () => {
  return (
    <>
      <ScreenLayout style={{}}>
        <View
          style={{
            paddingHorizontal: scale(20),
            paddingBottom: verticalScale(10),
          }}>
          <TopHeader title="Live Tracking" />
        </View>

        <View
          style={{
            gap: verticalScale(8),
            height: '81%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ImageBackground
            style={styles.riderContainre}
            resizeMode="contain"
            source={images.map_rider}>
            <CustomText
              color={colors.black}
              style={{marginBottom: verticalScale(45)}}
              text={'Delivering your book...'}
              size={12}
            />
          </ImageBackground>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: scale(15),
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', gap: scale(10)}}>
              <Image
                style={{
                  width: scale(36),
                  height: scale(36),
                  borderRadius: scale(8),
                }}
                resizeMode="contain"
                source={images.rider_user}
              />
              <View
                style={{gap: verticalScale(4), paddingTop: verticalScale(2)}}>
                <CustomText
                  fontWeight="600"
                  fontFam={font.WorkSans_SemiBold}
                  text={'ORDER123'}
                  size={14}
                />
                <CustomText
                  color={colors.orange}
                  text={'Rs. 4,000'}
                  size={12}
                />
              </View>
            </View>
            <TouchableOpacity>
              <Image
                style={{
                  width: scale(18),
                  height: scale(18),
                }}
                resizeMode="contain"
                source={images.call}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScreenLayout>

      <View
        style={styles.deliveryPopup}>
        <View style={{flexDirection: 'row', gap: scale(10)}}>
          <View
            style={{
              width: scale(40),
              height: scale(40),
              borderRadius: scale(8),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.white,
            }}>
            <Image
              style={{
                width: scale(20),
                height: scale(20),
              }}
              resizeMode="contain"
              source={images.rider}
            />
          </View>

          <View style={{gap: verticalScale(4), paddingTop: verticalScale(2)}}>
            <CustomText
              fontWeight="600"
              fontFam={font.WorkSans_SemiBold}
              color={colors.white}
              text={'Delivering to your doorstep'}
              size={14}
            />
            <CustomText
              color={colors.grey}
              text={'Expected: 14:00 - 16:00'}
              size={12}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default TrackingScreen;

const styles = StyleSheet.create({
  riderContainre: {
    width: scale(300),
    height: verticalScale(300),
    alignItems: 'flex-end',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  deliveryPopup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(12),
    alignItems: 'center',
    borderRadius: scale(15),
    backgroundColor: colors.black,
    position: 'absolute',
    width: '90%',
    alignSelf: 'center',
    top: verticalScale(Platform.OS == 'ios' ? 100 : 60),
  }
});

// we will used this if add map tracking

{
  /* <MapView
zoomControlEnabled={false}
showsBuildings={true}
initialRegion={{
  latitude: 31.5291,
  longitude: 74.3497,
  latitudeDelta: 0.019330183268125069,
  longitudeDelta: 0.005962757229776571,
}}
style={{
  height: '100%',
  width: '100%',
}}>
<Marker
  coordinate={{
    latitude: 31.5321,

    longitude: 74.3497,
  }}>
  <View style={{gap: verticalScale(2), alignItems: 'center'}}>
    <Image
      style={{
        width: scale(36),
        height: scale(36),
        borderRadius: 999,
        borderWidth: 2.5,
        borderColor: colors.white,
      }}
      resizeMode="contain"
      source={images.rider_user}
    />

    <View
      style={{
        width: scale(8),
        height: scale(8),
        backgroundColor: colors.black,
        borderRadius: 999,
      }}></View>
  </View>

</Marker>

<Marker
  coordinate={{
    latitude: 31.5321,

    longitude: 74.3447,
  }}>
  <View></View>

  <View
    style={{
      gap: verticalScale(5),
      alignItems: 'center',
      backgroundColor: colors.orange + '20',
      borderRadius: 999,
      width: scale(50),
      height: scale(50),
    }}>
    <View
      style={{
        width: scale(11),
        height: scale(11),
        backgroundColor: colors.white,
        borderRadius: 999,
        borderWidth: 3.5,
        borderColor: colors.black,
      }}
    />

    <View
      style={{
        width: scale(10),
        height: scale(10),
        backgroundColor: colors.orange,
        borderRadius: 999,
      }}
    />
  </View>

</Marker>
</MapView> */
}
