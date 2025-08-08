import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import CustomText from '../../../components/CustomText';
import {colors} from '../../../utils/colors';

const ProgressBar = ({currentStep}: any) => {
  // Sample data for the steps
  const steps = [
    {label: 'Received', icon: require('../../../assets/images/apple.png')},
    {label: 'Dispatched', icon: require('../../../assets/images/apple.png')},
    {label: 'Delivering', icon: require('../../../assets/images/apple.png')},
    {label: 'Delivered', icon: require('../../../assets/images/apple.png')},  ];

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View
            style={[
              styles.circle,
              index <= currentStep
                ? styles.circleActive
                : styles.circleInactive,
            ]}></View>
          {index > 0 && (
            <View
              style={[
                styles.progressLine,
                index <= currentStep
                  ? styles.progressLineActive
                  : styles.progressLineInactive,
              ]}
            />
          )}

          {/* Step Label */}
          <CustomText
            text={step.label}
            size={9.5}
            fontWeight="400"
            color={colors.green}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  stepContainer: {
    alignItems: 'center',
  },
  progressLine: {
    position: 'absolute',
    width: scale(100),
    height: 4,
    top: '11%',
    left: scale(-60), // Adjust this for line placement
    zIndex: -1,
  },
  progressLineActive: {
    backgroundColor: '#4CAF50',
  },
  progressLineInactive: {
    backgroundColor: '#E0E0E0',
  },
  circle: {
    width: scale(9),
    height: scale(9),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActive: {
    backgroundColor: '#007ACB',
  },
  circleInactive: {
    backgroundColor: '#E0E0E0',
  },



});

export default ProgressBar;
