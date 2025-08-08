import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/CustomText";
import { scale, verticalScale } from "react-native-size-matters";
import TopHeader from "../../../components/TopHeader";
import { colors } from "../../../utils/colors";
import { font } from "../../../utils/font";

const PrivacyPolicyScreen = () => {
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
        <TopHeader title="Privacy Policy" />
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
            "At Readings, we are committed to safeguarding your privacy and ensuring a secure online experience. This Privacy Policy outlines the types of information we collect, how we use it, and the steps we take to protect your data. By using our website and app, you consent to the practices described in this policy."
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <CustomText
          text={"What Information Do We Collect?"}
          lineHeight={20}
          fontWeight="600"
          style={{ textAlign: "justify" }}
          size={14}
        />
        <CustomText
          text={
            "We collect information when you register on our site, place an order, subscribe to our newsletter, respond to surveys, or fill out a form. The data we collect may include:"
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />

        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            style={{ textAlign: "justify" }}
            text={`Personal Information: Name, email address, mailing address, phone number, and credit card information.`}
            lineHeight={20}
            // style={{ textAlign: "justify" }}
            size={14}
          />
        </View>
        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            style={{ textAlign: "justify" }}
            text={
              "Device Information: Details about your device, browser, and operating system."
            }
            lineHeight={20}
            // style={{ textAlign: "justify" }}
            size={14}
          />
        </View>
        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            style={{ textAlign: "justify" }}
            text={
              "Usage Data: Information about your interactions with our site, including page visits and click patterns."
            }
            lineHeight={20}
            // style={{ textAlign: "justify" }}
            size={14}
          />
        </View>

        <CustomText
          text={
            "While you may visit our site anonymously, certain actions (such as placing an order) will require you to provide personal information."
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <CustomText
          text={"How Do We Use Your Information?"}
          lineHeight={20}
          fontWeight="600"
          style={{ textAlign: "justify" }}
          size={14}
        />
        <CustomText
          text={
            "The information we collect from you may be used for the following purposes:"
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />

        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`.`}
            style={{ marginTop: verticalScale(-3) }}
            lineHeight={20}
            fontWeight="600"
            size={14}
          />
          <CustomText
            style={{ textAlign: "justify" }}
            text={
              "Usage Data: Information about your interactions with our site, including page visits and click patterns."
            }
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>

        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
        <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            text={
              "Improving Our Website: To enhance our site functionality based on your feedback and usage patterns."
            }
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>

        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
        <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            text={
              "Customer Service: To better respond to your inquiries and support needs."
            }
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>

        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
        <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            text={
              "Processing Transactions: To process your orders securely. We do not sell or share your information with third parties without your consent, except to complete your transaction."
            }
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>

        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
        <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            text={
              "Marketing Communications: To send you occasional updates, offers, and news about our products and services. You can opt out of these emails at any time by following the unsubscribe instructions included in every email."
            }
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>
        <CustomText
          text={"How Do We Protect Your Information?"}
          lineHeight={20}
          fontWeight="600"
          style={{ textAlign: "justify" }}
          size={14}
        />
        <CustomText
          text={
            "We implement a variety of security measures to protect your personal information. This includes:"
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />

        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ textAlign: "justify", marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            text={
              "Secure Transactions: All sensitive information (such as credit card details) is transmitted via Secure Socket Layer (SSL) technology and encrypted."
            }
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>

        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            text={
              "Limited Access: Access to your personal data is restricted to authorized personnel only, who are required to maintain confidentiality."
            }
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>
        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ textAlign: "justify", marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            text={
              "Data Retention: After a transaction, we do not store your sensitive personal information (e.g., credit card details) on our servers."
            }
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>

        <CustomText
          text={"Do We Use Cookies?"}
          lineHeight={20}
          fontWeight="600"
          style={{ textAlign: "justify" }}
          size={14}
        />
        <CustomText
          text={
            "Yes, we use cookies to enhance your browsing experience. Cookies are small files that are placed on your device to:"
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ textAlign: "justify", marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            text={"Remember and process your shopping cart items."}
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>

        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
          <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ textAlign: "justify", marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            text={"Save your preferences for future visits."}
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>
        <CustomText
          text={
            "You can disable cookies via your browser settings, but please note that some features of the site may not function properly if cookies are disabled."
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <CustomText
          text={"Do We Disclose Information to Outside Parties?"}
          fontWeight="600"
          fontFam={font.WorkSans_Medium}
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <CustomText
          text={
            "We do not sell, trade, or transfer your personally identifiable information to outside parties. However, we may share data with trusted third parties who assist us in operating our website, conducting our business, or servicing you, provided these third parties agree to keep your information confidential. We may also disclose your data when necessary to comply with legal obligations or protect the rights, property, or safety of our company or others."
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <CustomText
          text={"Online Privacy Policy Only"}
          fontWeight="600"
          fontFam={font.WorkSans_Medium}
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <CustomText
          text={
            "This Privacy Policy applies only to information collected through our website and app and not to information collected offline."
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <CustomText
          text={"User Data"}
          fontWeight="600"
          fontFam={font.WorkSans_Medium}
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <CustomText
          text={
            "We comply with applicable laws and regulations regarding data protection. Here are the key points:"
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />

        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
        <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            text={
              "Data Collection: We collect personal information, device details, and usage data to improve your experience with our app."
            }
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>

        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
        <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            text={
              "Purpose of Data Use: The data we collect is  used for service improvement, personalized user experience, communications, and analytics."
            }
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>

        <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
        <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
                    style={{ textAlign: "justify" }}

            text={
              "Data Deletion: You can request the deletion of your data via email or in-app support. Please note that certain data may be retained for legal or operational purposes."
            }
            lineHeight={20}
            // style={{ textAlign: "justify" }}
            size={14}
          />
        </View>

        <CustomText
          text={
            "By using our services, you consent to the data processing practices outlined in this Privacy Policy."
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />

        <CustomText
          text={"Changes to Our Privacy Policy"}
          fontFam={font.WorkSans_Medium}
          fontWeight="600"
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />

        <CustomText
          text={
            "We may update our Privacy Policy from time to time. Any changes will be posted on this page, and the updated policy will take effect immediately upon posting."
          }
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
      </ScrollView>
    </ScreenLayout>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  textPoints: {
    flexDirection: "row",
    gap: scale(3),
    width: "97%",
  },
});
