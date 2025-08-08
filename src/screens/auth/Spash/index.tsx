import React, {useEffect} from 'react';
import {Linking, View} from 'react-native';
import ScreenLayout from '../../../components/ScreenLayout';
import {scale,} from 'react-native-size-matters';
import {colors} from '../../../utils/colors';
import LottieView from 'lottie-react-native';
import { extractTypeAndId } from '../../../utils/CommonHooks';
import { navigate, resetAndNavigate } from '../../../utils/NavigationUtil';
const SplashScreen = ({navigation}: any) => {


  // const handleDeepLink = async (event: any, deepLinkType: string) => {
  //   const { url } = event;
  //   if (!url) {
  //     handleNoUrlCase(deepLinkType);
  //     return;
  //   }
  //   const { type, id } = extractTypeAndId(url);

  //   if (deepLinkType !== "RESUME") {
  //     resetAndNavigate("BottomTab");
  //   }
  //   console.log("ckdnckdnc",id)

  //   navigate("BookDetailScreen", { Book_id: id });
  // };

  // const handleNoUrlCase = (deepLinkType: string) => {
  //   if (deepLinkType !== "RESUME") {
  //     // resetAndNavigate('BottomTab');
  //   }
  // };

  // useEffect(() => {
  //   Linking.getInitialURL().then((url) => {
  //     handleDeepLink({ url }, "CLOSE");
  //   });

  //   Linking.addEventListener("url", (event) => handleDeepLink(event, "RESUME"));
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0, // Start the stack at the Details screen
        routes: [{ name: 'BottomTab' }], // Define the new stack with the Details screen
      });
      // navigation.navigate('BottomTab');
    }, 5000);
  }, []);
  return (
    <>
   
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',
                  backgroundColor: colors.white,

      }}>
          <LottieView
            style={{width: '80%', height: '80%'}}
            source={require('../../../assets/json/splash.json')}
            renderMode="HARDWARE"
            speed={1}
            autoPlay
            loop={false}
          />
        </View>
      
    </>
  );
};

export default SplashScreen;
