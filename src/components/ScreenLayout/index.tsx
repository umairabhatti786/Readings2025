import React from 'react';
import {View, Text, Image, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyles} from '../../utils/AppStyles';
import {verticalScale} from 'react-native-size-matters';
const ScreenLayout = ({children, edges, style}: any) => {
  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={appStyles.main}>
      <View
        style={[
          {
            ...appStyles.main,
            paddingTop: verticalScale(Platform.OS == 'ios' ? 7 : 14),
          },

          style,
        ]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default ScreenLayout;
