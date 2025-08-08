import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/CustomText";
import { scale, verticalScale } from "react-native-size-matters";
import TopHeader from "../../../components/TopHeader";
import { colors } from "../../../utils/colors";
import { font } from "../../../utils/font";

const TermsAndCondirtionsScreen = () => {
  return (
    <ScreenLayout
      style={{
        paddingHorizontal: scale(20),
      }}
    >
      <View
        style={{
          paddingBottom: verticalScale(10),
        }}
      >
        <TopHeader title="Terms & Conditions" />
      </View>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.dull_white }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: colors.dull_white,
          paddingBottom: verticalScale(40),
          paddingTop: verticalScale(10),
          gap: verticalScale(10),
        }}
      >
        <CustomText
          text={
            "Welcome to Readings. This application is owned and operated by Elan Vital Private Limited. By accessing or using this application, you agree to comply with and be bound by the following terms and conditions. If you do not agree with any part of these terms, you must refrain from using this application. We reserve the right to update or change these terms at any time, and your continued use of the application following any such updates indicates your acceptance of the new terms."
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`1.`}
            lineHeight={20}
            fontWeight="600"
            size={15}
          />
          <CustomText
            text={"Your Account"}
            fontWeight="600"
            fontFam={font.WorkSans_Medium}
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>
        <CustomText
          text={
            "When you choose to create an account on our application, you are responsible for maintaining the confidentiality of your account details, including your username, password, and any other personal information associated with your account. You agree to notify Readings immediately of any unauthorized use or security breach related to your account. Your registration is personal to you, and you may not share your account information with others. Unauthorized use of your account may result in the termination of your registration, without refund, and additional charges may apply."
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
         <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`2.`}
            lineHeight={20}
            fontWeight="600"
            size={15}
          />
          <CustomText
            text={"Privacy"}
            fontWeight="600"
            fontFam={font.WorkSans_Medium}
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
          
        </View>
        <CustomText
          text={
            "We may collect personal information, including your name, address, and email address, to provide you with services, process your orders, and respond to your inquiries. The collection and use of your data are governed by our Privacy Policy. We encourage you to read and understand our privacy practices."
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`3.`}
            lineHeight={20}
            fontWeight="600"
            size={15}
          />
          <CustomText
            text={"Application Access"}
            fontWeight="600"
            fontFam={font.WorkSans_Medium}
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>
        <CustomText
          text={
            "Readings grants you a limited, non-exclusive, non-transferable, and revocable license to access and make personal use of this application and its content. This license does not allow you to modify, distribute, or reproduce any content from the application, except as necessary for the personal use of the site. Any unauthorized use of the application's content without prior written consent is prohibited."
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`4.`}
            lineHeight={20}
            fontWeight="600"
            size={15}
          />
          <CustomText
            text={"Copyright"}
            fontWeight="600"
            fontFam={font.WorkSans_Medium}
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>
        <CustomText
          text={
            "All intellectual property rights, including but not limited to patents, trademarks, text, images, graphics, software, trade secrets, and other content on this application, are the property of Readings. You may not copy, reproduce, distribute, or use any of the content on this site, except to the extent strictly necessary for personal use in accessing the application."
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`5.`}
            lineHeight={20}
            fontWeight="600"
            size={15}
          />
          <CustomText
            text={"Pricing"}
            fontWeight="600"
            fontFam={font.WorkSans_Medium}
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>
        <CustomText
          text={
            "On our application, you may see two prices: one in the publisher's currency and one in Pakistani Rupees (PKR) as offered by Readings. While we strive to ensure that both prices are accurate and reflect the most current rates available from the publisher or Readings outlets, these prices are subject to change without notice. We do not guarantee that both prices will remain consistent."
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`6.`}
            lineHeight={20}
            fontWeight="600"
            size={15}
          />
          <CustomText
            text={"Links to Third-Party Websites"}
            fontWeight="600"
            fontFam={font.WorkSans_Medium}
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>
        <CustomText
          text={
            "Our application may include links to third-party websites for your convenience. These links are provided solely for informational purposes, and their inclusion does not imply endorsement by Readings. We do not control, nor are we responsible for, the content of any linked websites."
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`7.`}
            lineHeight={20}
            fontWeight="600"
            size={15}
          />
          <CustomText
            text={"Comments and Reviews"}
            fontWeight="600"
            fontFam={font.WorkSans_Medium}
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>
        <CustomText
          text={
            "You may post comments or reviews on our application, provided that the content you submit is legal, non-defamatory, non-obscene, and does not violate the rights of others. You agree to grant Readings a non-exclusive, perpetual, royalty-free license to use, modify, and republish any material you submit to us in any format, including print and digital media. You also agree to indemnify Readings from any claims arising from your content. Readings reserves the right to monitor, edit, or remove any user-generated content at its discretion. We are not responsible for the accuracy, content, or legality of user-submitted materials."
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`8.`}
            lineHeight={20}
            fontWeight="600"
            size={15}
          />
          <CustomText
            text={"International Use"}
            fontWeight="600"
            fontFam={font.WorkSans_Medium}
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>
        <CustomText
          text={
            'If you access this application from outside Pakistan, you do so at your own risk and are responsible for complying with all applicable local laws. Readings makes no representations regarding the legality of the materials on the application in other jurisdictions.'
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`9.`}
            lineHeight={20}
            fontWeight="600"
            size={15}
          />
          <CustomText
            text={"Limitation of Liability"}
            fontWeight="600"
            fontFam={font.WorkSans_Medium}
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>
        <CustomText
          text={
            "This application is provided as is, and Readings makes no representations or warranties, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or accuracy. We do not guarantee that the application will be uninterrupted, error-free, or free from harmful components. To the fullest extent permitted by law, Readings shall not be liable for any indirect, consequential, or special damages, including but not limited to loss of profits, data, or business opportunities, arising out of or in connection with your use of this application."
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`10.`}
            lineHeight={20}
            fontWeight="600"
            size={15}
          />
          <CustomText
            text={"Applicable Law and Disputes"}
            fontWeight="600"
            fontFam={font.WorkSans_Medium}
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>
        <CustomText
          text={
            "These Terms and Conditions are governed by the laws of Pakistan, and any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts of Pakistan. The agreed place of performance for any obligations under these terms is Pakistan."
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
      </ScrollView>
    </ScreenLayout>
  );
};

export default TermsAndCondirtionsScreen;
const styles = StyleSheet.create({
  textPoints: {
    flexDirection: "row",
    gap: scale(3),
    width: "97%",
  },
});
