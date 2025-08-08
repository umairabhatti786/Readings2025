import {View, StyleSheet, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../utils/colors';
import CustomText from '../CustomText';
import * as Animatable from 'react-native-animatable';
import {scale, verticalScale} from 'react-native-size-matters';

type Props = {
  orderStatu?: string;
};
function OrderTracking({orderStatus = 'Dispatched'}: Props) {
  const levels = [
    {level: 'Received', left: '5%'},
    {level: 'Dispatched', left: '34%'},
    {level: 'Delivering', left: '64%'},
    {level: 'Received', left: '92%'},
  ];
  // get current status
  const currentIndex = levels.findIndex(item => item.level === orderStatus);
  const currentLevel = levels.find(item => item.level === orderStatus);
  const renderLevels = () => {
    return levels?.map((levelObj, index) => {
      return (
        <View key={index} style={{...styles.levelMarker, left: levelObj.left}}>
          <View style={{...styles.circleContainer}}>
            <View
              style={{
                ...styles.circle,
                backgroundColor:
                  index <= currentIndex ? colors.green : colors.dull_half_white,
              }}>
              {levelObj.level == orderStatus && (
                <View
                  style={{
                    width: scale(5),
                    height: scale(5),
                    borderRadius: 999,
                    backgroundColor: colors.white,
                  }}
                />
              )}
            </View>

            <CustomText
              text={levelObj.level}
              size={9.5}
              fontWeight="400"
              color={colors.green}
              style={{marginTop: verticalScale(5), marginLeft: scale(-15)}}
            />
          </View>
        </View>
      );
    });
  };
  return (
    <View
      style={styles.main}>
      <View
        style={{
          height: verticalScale(1.6),
          width: '100%',
          borderRadius: 9999,
          overflow: 'hidden',
          backgroundColor: colors.dull_half_white,
        }}>
        <Animatable.View
          animation="slideInLeft"
          style={[
            {
              backgroundColor: colors.green,
              height: 3,
              borderRadius: 9999,
            },
            {width: currentLevel?.left},
          ]}></Animatable.View>
      </View>
      {renderLevels()}
    </View>
  );
}
export const styles = StyleSheet.create({
  main:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingTop: verticalScale(10),
    height: verticalScale(40),
    width: '90%',
    alignSelf: 'center',
  },
  circle: {
    width: scale(9),
    height: scale(9),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    top: 0,
    width: scale(50),
  },
  levelMarker: {
    position: 'absolute',
    top: verticalScale(7),
    zIndex: 1,
  },
});

export {OrderTracking};
