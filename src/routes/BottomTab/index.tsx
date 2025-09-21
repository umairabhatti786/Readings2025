import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Platform, StyleSheet, View} from 'react-native';
import {colors} from '../../utils/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import {images} from '../../assets/images';
import CustomText from '../../components/CustomText';
import {font} from '../../utils/font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../../screens/Main/Home';
import CategoriesScreen from '../../screens/Main/Categories';
import OrdersScreen from '../../screens/Main/Orders';
import CartScreen from '../../screens/Main/Cart';
import LikedScreen from '../../screens/Main/Liked';

const BottomTab = ({}: any) => {
  const Bottom = createBottomTabNavigator();
  const insets = useSafeAreaInsets();
  console.log("ckbcd",insets )

  const TabItem = ({focused, title, img}: any) => {
    return (
      <View
        style={{
          width: scale(50),
          backgroundColor: "transparent", // Semi-transparent background
          paddingTop:verticalScale(Platform.OS=="ios"? 30:25),
          justifyContent: 'center',
          alignItems: 'center',
          gap: verticalScale(4),

        }}>
        <Image
          resizeMode="contain"
          source={img}
          style={{
            ...style.img,
            tintColor: focused ? colors.black : colors.grey,
          }}
        />
        <CustomText
          text={title}
          fontWeight="400"
          fontFam={font.WorkSans_Light}
          size={10}
          color={focused ? colors.black : colors.grey}
        />
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

    <Bottom.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        animationEnabled: false,
        gestureEnabled: Platform.OS=="ios"?true:false,
        keyboardHidesTabBar: true,
        cardStyleInterpolator: ({ current, next, layouts }:any) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(243, 245, 247, 0.9)', // Semi-transparent background
          justifyContent: 'center',
          alignItems: 'center',
          borderTopWidth: 1,
          borderTopColor: colors.dull_half_white,
          bottom: Platform.OS=="ios"?0: insets.bottom,
          height: Platform.OS == 'ios'?verticalScale( 75):72,
          paddingHorizontal:scale(20)
        },
        headerShown: false,
      })}>

<Bottom.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <TabItem
                title={'Home'}
                img={focused ? images.fill_home : images.unfill_home}
                focused={focused}
              />
            );
          },
        }}
      />
      
      <Bottom.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <TabItem
                title={'Categories'}
                img={focused ? images.fill_add : images.add_unfill}
                focused={focused}
              />
            );
          },
        }}
      />
      <Bottom.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <TabItem
                title={'Orders'}
                img={focused ? images.fill_box : images.unfill_box}
                focused={focused}
              />
            );
          },
        }}
      />

      <Bottom.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <TabItem
                title={'Cart'}
                img={focused ? images.fill_cart : images.unfill_cart}
                focused={focused}
              />
            );
          },
        }}
      />
      <Bottom.Screen
        name="Liked"
        component={LikedScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <TabItem
                title={'Liked'}
                img={focused ? images.fill_heart : images.unfill_heart}
                focused={focused}
              />
            );
          },
        }}
      />
    </Bottom.Navigator>

    </GestureHandlerRootView>

  );
};
export default BottomTab;

const style = StyleSheet.create({
  itemStyle: {
    width: scale(50),
    backgroundColor: "transparent", // Semi-transparent background
    paddingTop:verticalScale(Platform.OS=="ios"? 30:35),
    // paddingBottom:verticalScale(Platform.OS=="ios"? 0:5),
    justifyContent: 'center',
    alignItems: 'center',
    gap: verticalScale(4),
    
    
  },

  img: {
    height: scale(19),
    width: scale(19),
  },
});
