import React, {useEffect, useState} from 'react';
import { StatusBar } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../utils/Types';
import GetStarted from '../../screens/Auth/GetStarted';
import LoginScreen from '../../screens/Auth/LoginScreen';
import SignupScreen from '../../screens/Auth/SignupScreen';
import YourIdentity from '../../screens/Auth/YourIdentity';
import ProofOfResidency from '../../screens/Auth/ProofOfResidency';
import PassportPhotoInstruction from '../../screens/Auth/PassportPhotoInstruction';
import BottomTab from '../BottomTab';
import AddScreen from '../../screens/Main/Add';
import ProfileScreen from '../../screens/Main/Profile';
import HomeScreen from '../../screens/Main/Home';



const Stack = createNativeStackNavigator<any>();
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} /> 
   

      <Stack.Screen name={'ProfileScreen'} component={ProfileScreen} /> 

      
      
    </Stack.Navigator>
  );
};
export default HomeStack;
