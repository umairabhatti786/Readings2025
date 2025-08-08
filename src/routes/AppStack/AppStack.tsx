import React, { useEffect, useState } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from "@react-navigation/stack";
import BottomTab from "../BottomTab";
import NotificationsScreen from "../../screens/main/Notifications";
import PrivacyPolicyScreen from "../../screens/main/PrivacyPolicy";
import TermsAndCondirtionsScreen from "../../screens/main/TermsAndCondirtions";
import AboutScreen from "../../screens/main/About";
import LoginScreen from "../../screens/auth/Login";
import SignupScreen from "../../screens/auth/Signup";
import ForgotPasswordScreen from "../../screens/auth/ForgotPassword";
import PaymentInfoScreen from "../../screens/auth/PaymentInfo";
import PersonalInfoScreen from "../../screens/auth/PersonalInfo";
import BookRequestScreen from "../../screens/main/BookRequest";
import SendGiftScreen from "../../screens/main/SendGift";
import FilterScreen from "../../screens/main/Filter";
import BusinessScreen from "../../screens/main/Business";
import AllSubCategoriesScreen from "../../screens/main/AllSubCategories";
import DiscountsScreen from "../../screens/main/Discounts";
import BookDetail from "../../screens/main/BookDetail";
import ChangePasswordScreen from "../../screens/main/ChangePassword";
import EditProfileScreen from "../../screens/main/EditProfile";
import ProfileScreen from "../../screens/main/Profile";
import CheckoutScreen from "../../screens/main/Checkout";
import AddAddressScreen from "../../screens/main/AddAddress";
import BookReviewScreen from "../../screens/main/BookReview";
import SearchResultScreen from "../../screens/main/SearchResult";
import TrackingScreen from "../../screens/main/Tracking";
import OrderDetailScreen from "../../screens/main/OrderDetail";
import RecommendedScreen from "../../screens/main/Recommended";
import HelpAndSupportScreen from "../../screens/main/HelpAndSupport";
import ChooseAddressScreen from "../../screens/main/ChooseAddress";
import ChoosePaymentScreen from "../../screens/main/ChoosePayment";
import CategoriesScreen from "../../screens/main/Categories";
import SplashScreen from "../../screens/auth/Spash";
import HighDiscountsScreen from "../../screens/main/HighDiscounts";
import {
  AUTHDATA,
  GUESTTOKEN,
  StorageServices,
  TOKEN,
} from "../../utils/StorageService";
import { useDispatch } from "react-redux";
import {
  setAuthData,
  setAuthToken,
  setGuestToken,
} from "../../redux/reducers/authReducer";
import { windowWidth } from "../../utils/Dimensions";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StationeryAndArt from "../../screens/main/StationeryAndArt";
import { Linking, Platform } from "react-native";
import { extractTypeAndId } from "../../utils/CommonHooks";
import { navigate, resetAndNavigate } from "../../utils/NavigationUtil";
import AddPaymentMethod from "../../screens/main/AddPaymentMethod";
import StationeryBooks from "../../screens/main/StationeryBooks";
import LiveOrderTrackingScreen from "../../screens/main/LiveOrderTracking";

const AppStack = ({ navigation }: any) => {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();

  const TransitionScreenOptions = {
    headerShown: false,
    animation: "slide_from_bottom",
    presentation: "card",
    gestureEnabled:Platform.OS=="ios"? true:false,
    // gestureDirection: "horizontal", // Default direction

    animationEnabled: true, // Optional: For smooth transitions

    gestureResponseDistance:Platform.OS=="ios"?  800:0,

    // gestureResponseDistance: {horizontal: 150 },
    ...TransitionPresets.SlideFromRightIOS,
  };
  const handleDeepLink = async (event: any, deepLinkType: string) => {
    const { url } = event;
    if (!url) {
      handleNoUrlCase(deepLinkType);
      return;
    }
    const { type, id } = extractTypeAndId(url);

    setTimeout(() => {
      if (deepLinkType !== "RESUME") {
        resetAndNavigate("BottomTab");
      }
      navigate("BookDetailScreen", { Book_id: id });
      
    }, 2500);

   
  };

  const handleNoUrlCase = (deepLinkType: string) => {
    if (deepLinkType !== "RESUME") {
      // resetAndNavigate('BottomTab');
    }
  };

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      handleDeepLink({ url }, "CLOSE");
    });

    Linking.addEventListener("url", (event) => handleDeepLink(event, "RESUME"));
  }, []);

  useEffect(() => {
    // DeepLinking()
    getUserInfo();
  }, []);
  // const DeepLinking=()=>{
  //   Linking.getInitialURL().then(url=>{

  //   })
  // }

  const getUserInfo = async () => {
    const token = await StorageServices.getItem(TOKEN);
    const guestToken = await StorageServices.getItem(GUESTTOKEN);
console.log("guestToken",guestToken)
    const authData = await StorageServices.getItem(AUTHDATA);
    if (token != null) {
      dispatch(setAuthToken(token));
      dispatch(setAuthData(authData));
    } else if (guestToken != null) {
      dispatch(setGuestToken(guestToken));
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={TransitionScreenOptions}
        // screenOptions={{
        //     headerShown: false,

        //     // cardStyleInterpolator: ({ current: { progress } }) => {
        //     //   return {
        //     //     cardStyle: {
        //     //       opacity: progress,
        //     //     },
        //     //   };
        //     // },
        //   }}
      >
        <Stack.Screen name={"SplashScreen"} component={SplashScreen} />

        <Stack.Screen name={"BottomTab"} component={BottomTab} />
        <Stack.Screen name={"Notifications"} component={NotificationsScreen} />
        <Stack.Screen name={"StationeryAndArt"} component={StationeryAndArt} />
        <Stack.Screen name={"StationeryBooks"} component={StationeryBooks} />
        <Stack.Screen name={"LiveOrderTrackingScreen"} component={LiveOrderTrackingScreen} />

        
        
        <Stack.Screen name={"PrivacyPolicy"} component={PrivacyPolicyScreen} />
        <Stack.Screen
          name={"TermsAndCondirtions"}
          component={TermsAndCondirtionsScreen}
        />
        <Stack.Screen name={"About"} component={AboutScreen} />
        <Stack.Screen name={"Login"} component={LoginScreen} />
        <Stack.Screen name={"SignupScreen"} component={SignupScreen} />
        <Stack.Screen
          name={"ForgotPasswordScreen"}
          component={ForgotPasswordScreen}
        />
         <Stack.Screen
          name={"AddPaymentMethod"}
          component={AddPaymentMethod}
        />
        <Stack.Screen
          name={"PaymentInfoScreen"}
          component={PaymentInfoScreen}
        />

        <Stack.Screen
          name={"PersonalInfoScreen"}
          component={PersonalInfoScreen}
        />
        <Stack.Screen
          name={"BookRequestScreen"}
          component={BookRequestScreen}
        />
        <Stack.Screen name={"SendGiftScreen"} component={SendGiftScreen} />
        <Stack.Screen name={"FilterScreen"} component={FilterScreen} />
        <Stack.Screen name={"BusinessScreen"} component={BusinessScreen} />
        <Stack.Screen
          name={"AllSubCategoriesScreen"}
          component={AllSubCategoriesScreen}
        />
        <Stack.Screen name={"DiscountsScreen"} component={DiscountsScreen} />
        <Stack.Screen name={"BookDetailScreen"} component={BookDetail} />
        <Stack.Screen
          name={"BookMoreDetailScreen"}
          options={{
            // headerShown: true,
            // headerTitle: "User Profile",
            animationTypeForReplace: "push", // Customize transition animation
          }}
          component={BookDetail}
        />

        <Stack.Screen
          name={"ChangePasswordScreen"}
          component={ChangePasswordScreen}
        />
        <Stack.Screen
          name={"EditProfileScreen"}
          component={EditProfileScreen}
        />
        <Stack.Screen name={"ProfileScreen"} component={ProfileScreen} />
        <Stack.Screen name={"CheckoutScreen"} component={CheckoutScreen} />
        <Stack.Screen name={"AddAddressScreen"} component={AddAddressScreen} />
        <Stack.Screen name={"BookReviewScreen"} component={BookReviewScreen} />
        <Stack.Screen
          name={"SearchResultScreen"}
          component={SearchResultScreen}
        />
        <Stack.Screen name={"TrackingScreen"} component={TrackingScreen} />
        <Stack.Screen
          name={"OrderDetailScreen"}
          component={OrderDetailScreen}
        />
        <Stack.Screen
          name={"RecommendedScreen"}
          component={RecommendedScreen}
        />
        <Stack.Screen
          name={"HelpAndSupportScreen"}
          component={HelpAndSupportScreen}
        />
        <Stack.Screen
          name={"ChooseAddressScreen"}
          component={ChooseAddressScreen}
        />
        <Stack.Screen
          name={"ChoosePaymentScreen"}
          component={ChoosePaymentScreen}
        />
        <Stack.Screen
          name={"HighDiscountsScreen"}
          component={HighDiscountsScreen}
        />

        <Stack.Screen name={"CategoriesScreen"} component={CategoriesScreen} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};
export default AppStack;
