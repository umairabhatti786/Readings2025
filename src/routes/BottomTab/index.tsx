import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomText from '../../components/Text';
import {theme} from '../../utils/Themes';
import sizeHelper from '../../utils/Helpers';
import {fonts} from '../../utils/Themes/fonts';
import {useSelector} from 'react-redux';
import {getToken} from '../../redux/reducers/authReducer';
import HomeScreen from '../../screens/Main/Home';
import icons from '../../utils/Constants/icons';
import WalletScreen from '../../screens/Main/Wallet/iindex';
import ReportScreen from '../../screens/Main/Report';
import SettingsScreen from '../../screens/Main/Settings';
import AddScreen from '../../screens/Main/Add';
import HomeStack from '../HomeStack';

const BottomTab = ({navigation}: any) => {
  const Bottom = createBottomTabNavigator();
  const token = useSelector(getToken);

  const TabItem = ({focused, title, img}: any) => {
    return (
      <View style={[style.itemStyle]}>
       
        <Image
          resizeMode="contain"
          source={img}
          style={{
            ...style.img,
            tintColor: focused ? theme.colors.primary : theme.colors.gray,
          }}
        />
        <CustomText
          text={title}
          // fontFam={fonts.Poppins_SemiBold}
          fontWeight="600"
          size={18}
          color={focused ? theme.colors.primary : theme.colors.gray}
        />
      </View>
    );
  };

  return (
    <Bottom.Navigator
      initialRouteName="HomeStack"
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        animationEnabled: false,
        gestureEnabled: true,
        keyboardHidesTabBar: true,

        cardStyleInterpolator: ({current, next, layouts}: any) => {
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
          backgroundColor: theme.colors.white,
          justifyContent: 'center',
          alignItems: 'center',
          shadowOffset: {width: 0, height: 5},
          shadowOpacity: 1,
          shadowColor: theme.colors.black,
          shadowRadius: 4,
          elevation: 10,
          height: sizeHelper.calHp(140),
          borderTopWidth: -1,
          paddingTop: sizeHelper.calHp(30),
        },

        headerShown: false,
      })}>
      {/* Home Tab */}
      <Bottom.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <TabItem
                title={'Home'}
                colors={theme.colors}
                img={icons.home}
                focused={focused}
              />
            );
          },
        }}
      />
      {/* Calendar Tab */}
      <Bottom.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <TabItem
                colors={theme.colors}
                title={'Wallet'}
                img={
                 icons.wallet
                }
                focused={focused}
              />
            );
          },
        }}
      />
      {/* AddEvent Tab */}

       <Bottom.Screen
        name="AddScreen"
        component={AddScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <TouchableOpacity
              onPress={() => navigation.navigate('AddScreen')}
              style={{
                height: sizeHelper.calHp(80),
                width: sizeHelper.calHp(80),
                borderRadius: sizeHelper.calWp(40),
                backgroundColor: theme.colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom:sizeHelper.calHp(20)
              }}>
              <Image
                resizeMode="contain"
                source={icons.add}
                style={{
                  height: sizeHelper.calHp(40),
                  width: sizeHelper.calHp(40),
                  tintColor: theme.colors.white,
                }}
              />
            </TouchableOpacity>
            );
          },
        }}
      />

       <Bottom.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <TabItem
                colors={theme.colors}
                title={'Report'}
                img={
                 icons.report
                }
                focused={focused}
              />
            );
          },
        }}
      />

<Bottom.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <TabItem
                colors={theme.colors}
                title={'Settings'}
                img={
                 icons.setting
                }
                focused={focused}
              />
            );
          },
        }}
      />
      {/* Contacts Tab */}
      {/* <Bottom.Screen
        name="MyCart"
        component={MyCartScreen}
        options={{
          ...(cartLength === 0
            ? {
                tabBarBadge: '', // shows a small red dot
                tabBarBadgeStyle: {
                  backgroundColor: 'transparent',
                },
              }
            : {
                tabBarBadge: cartLength,
                tabBarBadgeStyle: {
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.white,
                  top: sizeHelper.calHp(-20),
                },
              }),
          tabBarIcon: ({focused}) => {
            return (
              <TabItem
                colors={theme.colors}
                title={'My Cart'}
                img={icons.unfilled_cart}
                focused={focused}
              />
            );
          },
        }}
      /> */}
      {/* profile Tab */}
      {/* <Bottom.Screen
        name="Profile"
        component={token ? ProfileScreen : LoginAndSignupScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <TabItem
                colors={theme.colors}
                title={'Profile'}
                img={icons.unfilled_user}
                focused={focused}
              />
            );
          },
        }}
      /> */}
    </Bottom.Navigator>
  );
};
export default BottomTab;

const style = StyleSheet.create({
  itemStyle: {
    width: sizeHelper.calWp(130),
    backgroundColor: 'transparent', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    gap: sizeHelper.calHp(7),
  },
  img: {
    height: sizeHelper.calHp(33),
    width: sizeHelper.calHp(33),
  },
  tabBarStyle: {},
});
