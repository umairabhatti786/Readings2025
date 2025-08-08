import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/CustomText";
import { scale, verticalScale } from "react-native-size-matters";
import TopHeader from "../../../components/TopHeader";
import { colors } from "../../../utils/colors";
import { WebView } from 'react-native-webview';

const LiveOrderTrackingScreen = ({route}:any) => {
  const tracking_id=route?.params?.tracking_id
console.log("tracking_id",tracking_id)
  return (
    <ScreenLayout
      style={{
        paddingHorizontal: scale(20),
        // backgroundColor:colors.white

      }}
    >
      <View
        style={{
          paddingBottom: verticalScale(10),
        }}
      >
        <TopHeader title="Live Tracking" />
      </View>

      <WebView
      source={{ uri: `https://ep.gov.pk/emtts/EPTrack_Live.aspx?ArticleIDz=${tracking_id}` }}
      scalesPageToFit={true} // For Android
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        style={{ flex: 1 }}
        // Inject CSS to increase font size
        injectedJavaScript={`
          const style = document.createElement('style');
          style.innerHTML = \`
            body {
              font-size: 150%;
              background-color: #f0f0f0;  /* Change this to your desired color */

            }
          \`;
          document.head.appendChild(style);
          true; // Required for Android
        `}
        allowsFullscreenVideo={true}
        // Enable zoom controls for Android
        androidHardwareAccelerationDisabled={false}
        androidZoomEnabled={true}
      />
      {/* <WebView 
        scalesPageToFit={true} // For Android
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      source={{ uri: 'https://ep.gov.pk/emtts/EPTrack_Live.aspx?ArticleIDz=RGL144341689' }} /> */}

      {/* <ScrollView
        style={{ flex: 1, backgroundColor: colors.dull_white }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: colors.dull_white,
          paddingBottom: verticalScale(20),
          gap: verticalScale(10),
          paddingTop: verticalScale(10),
        }}
      >
      

        <CustomText
          text={
            'Please make sure to report any issues promptly and adhere to the guidelines for a smooth returns or refund process. For further assistance, feel free to reach out to us.'
          }
          color={colors.black}
          size={14}
        />
        <CustomText
          text={'Cant find what you re looking for? Were Here for You!'}
          color={colors.grey}
          size={14}
        />
        <View style={{...styles.detailConainer, gap: verticalScale(15)}}>
          <CustomText
            text={
              'Our offices are open Monday to Saturday from 9:00 AM to 5:00 PM.'
            }
            color={colors.orange}
            size={12}
          />

          <View style={{gap: verticalScale(2)}}>
            <CustomText
              text={`Contact Us:\n* Phone: 042-35292627 (Available during office hours)`}
              color={colors.black}
              size={12}
            />
            <CustomText
              text={'* WhatsApp: 0300-0450227 (Available during office hours)'}
              color={colors.black}
              size={12}
            />
            <CustomText
              text={'* Email: orders@readings.com.pk'}
              color={colors.black}
              size={12}
            />
          </View>

          <CustomText
            text={
              'Feel free to reach out to us during working hours. We re happy to assist you!'
            }
            color={colors.black}
            size={12}
          />
        </View>
      </ScrollView> */}
    </ScreenLayout>
  );
};

export default LiveOrderTrackingScreen;

const styles = StyleSheet.create({
  detailConainer: {
    width: "100%",
    borderRadius: scale(10),
    padding: scale(15),
  
    backgroundColor: colors.white,
  },
});
