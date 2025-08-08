import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/CustomText";
import { scale, verticalScale } from "react-native-size-matters";
import TopHeader from "../../../components/TopHeader";
import { colors } from "../../../utils/colors";
import { font } from "../../../utils/font";
import { windowWidth } from "../../../utils/Dimensions";

const AboutScreen = () => {
  const onDialNumber = (num: any) => {
    if (num) {
      // Remove any spaces or unwanted characters from the phone number
      let formattedPhoneNumber = num.replace(/\s+/g, "");
      let phoneNumberToDial = `tel:${formattedPhoneNumber}`;

      Linking.openURL(phoneNumberToDial).catch((err) =>
        console.log("Error opening URL", err)
      );
    } else {
      console.log("Phone number is not available");
    }
  };
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
        <TopHeader title="About" />
      </View>

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.dull_white,
          paddingTop: verticalScale(10),

          gap: verticalScale(10),
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: colors.dull_white,
          paddingBottom: verticalScale(60),
          gap: verticalScale(10),
        }}
      >
        <CustomText
          text={`Founded in 2006 in Gulberg, Lahore, Readings was conceived with a vision to foster a culture of reading by offering a wide range of books at affordable prices to the local community. Today, we are proud to be a household name across Pakistan, thanks to our customer-first approach and commitment to making books accessible to all.`}
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <CustomText
          text={`Our Journey and Achievements`}
          lineHeight={20}
          fontWeight="600"
          fontFam={font.WorkSans_Medium}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <CustomText
          text={`Over the years, Readings has grown into one of Pakistan's most respected names in the book retail industry. Here are some key milestones in our journey:`}
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />

        <View style={styles.textPoints}>
          <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ textAlign: "justify", marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            text={`Four Physical Stores in Lahore: Our flagship store in Gulberg, along with Three other locations in DHA, Bahria Town and Urdu Bazar, cater to book lovers across the city. Notably, Readings DHA is home to the largest and most modern bookstore and coffee shop in Pakistan.`}
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>
        <View style={styles.textPoints}>
          <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ textAlign: "justify", marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            text={`Largest Online Bookstore in Pakistan: Our online platform offers the widest selection of books compared to any other online bookstore in the country, providing an unparalleled shopping experience.`}
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>
        <View style={styles.textPoints}>
          <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ textAlign: "justify", marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            text={`In-House Publishing: Since 2010, Readings has operated its own publishing house, dedicated to bringing the best of local and global literature to readers in Pakistan. We publish books in English, Urdu, and regional languages, with a particular focus on making world classics and contemporary titles available at affordable prices. We are also always open to submissions from local authors.`}
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>
        <View style={styles.textPoints}>
          <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ textAlign: "justify", marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            text={`A Leader in Stationery and Art Supplies: In addition to books, we are a trusted name in stationery and art supplies, offering a comprehensive range of high-quality products for students, professionals, and artists alike`}
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>
        <View style={styles.textPoints}>
          <CustomText
            text={`.`}
            lineHeight={20}
            fontWeight="600"
            style={{ textAlign: "justify", marginTop: verticalScale(-3) }}
            size={18}
          />
          <CustomText
            text={`Wholesale and Institutional Supply: We are one of the largest wholesale and institutional suppliers of books in Pakistan, catering to educational institutions, libraries, and corporate clients.`}
            lineHeight={20}
            style={{ textAlign: "justify" }}
            size={14}
          />
        </View>

        <CustomText
          text={`Our Vision`}
          lineHeight={20}
          fontWeight="600"
          fontFam={font.WorkSans_Medium}
          style={{ textAlign: "justify" }}
          size={14}
        />
        <CustomText
          text={`Our mission extends beyond retail. At Readings, we believe in the transformative power of books and are committed to making them accessible to readers everywhere. Our dream is to expand our presence across Pakistan, ensuring that every potential reader, no matter where they are, has easy access to books. We firmly believe that it is the insatiable hunger for knowledge and reading that shapes nations and drives progress.`}
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
         <CustomText
          text={`Our Physical Locations`}
          lineHeight={20}
          fontWeight="600"
          fontFam={font.WorkSans_Medium}
          style={{ textAlign: "justify" }}
          size={14}
        />


        <View
          style={{
            gap: verticalScale(2),
          }}
        >
          <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
            <CustomText
              text={`.`}
              lineHeight={20}
              fontWeight="600"
              style={{ textAlign: "justify", marginTop: verticalScale(-3) }}
              size={18}
            />
            <CustomText
              text={`Gulberg`}
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
              text={`12-KMain Boulevard, Gulberg 2, Lahore`}
              lineHeight={20}
              style={{ textAlign: "justify" }}
              size={14}
            />
          </View>
          <View
            style={{
              ...styles.textPoints,
              alignItems: "center",
            }}
          >
            
            <CustomText
              text={`Phone:`}
              lineHeight={20}
              fontWeight="600"
              style={{ textAlign: "justify" }}
              size={14}
            />
            <TouchableOpacity
              onPress={() => onDialNumber("042 3575 4535")}
              activeOpacity={0.5}
            >
              <CustomText
                text={`042 3575 4535`}
                fontWeight="600"
                color={colors.primary}
                // style={{ textAlign: "justify" }}
                size={12}
              />
            </TouchableOpacity>
            <CustomText text={`|`} fontWeight="600" size={14} />
            <TouchableOpacity
              onPress={() => onDialNumber("042 3575 3525")}
              activeOpacity={0.5}
            >
              <CustomText
                text={`042 3575 3525`}
                fontWeight="600"
                color={colors.primary}
                size={12}
              />
            </TouchableOpacity>
            <CustomText text={`|`} fontWeight="600" size={14} />
            <TouchableOpacity
              onPress={() => onDialNumber("0300 847 2621")}
              activeOpacity={0.5}
            >
              <CustomText
                text={`0300 847 2621`}
                fontWeight="600"
                color={colors.primary}
                size={12}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              Linking.openURL("https://maps.app.goo.gl/CwZiA1dvoLZgEQu88")
            }
          >
            <CustomText
              text={`View on Google Maps`}
              textDecorationLine={"underline"}
              lineHeight={20}
              color={colors.primary}
              style={{ textAlign: "justify" }}
              size={14}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            gap: verticalScale(2),
          }}
        >
          <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
            <CustomText
              text={`.`}
              lineHeight={20}
              fontWeight="600"
              style={{ textAlign: "justify", marginTop: verticalScale(-3) }}
              size={18}
            />
            <CustomText
              text={`DHA`}
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
              text={`21-FF Market Phase IV, DHA, Lahore`}
              lineHeight={20}
              style={{ textAlign: "justify" }}
              size={14}
            />
          </View>
          <View
            style={{
              ...styles.textPoints,
              alignItems: "center",
            }}
          >
            <CustomText
              text={`Phone:`}
              lineHeight={20}
              fontWeight="600"
              style={{ textAlign: "justify" }}
              size={14}
            />
            <TouchableOpacity
              onPress={() => onDialNumber("042 37492240")}
              activeOpacity={0.5}
            >
              <CustomText
                text={`042 37492240`}
                fontWeight="600"
                color={colors.primary}
                // style={{ textAlign: "justify" }}
                size={12}
              />
            </TouchableOpacity>
            <CustomText text={`|`} fontWeight="600" size={14} />
            <TouchableOpacity
              onPress={() => onDialNumber("042 37492241")}
              activeOpacity={0.5}
            >
              <CustomText
                text={`042 37492241`}
                fontWeight="600"
                color={colors.primary}
                size={12}
              />
            </TouchableOpacity>
            <CustomText text={`|`} fontWeight="600" size={14} />
            <TouchableOpacity
              onPress={() => onDialNumber("0300 848 0043")}
              activeOpacity={0.5}
            >
              <CustomText
                text={`0300 848 0043`}
                fontWeight="600"
                color={colors.primary}
                size={12}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              Linking.openURL("https://maps.app.goo.gl/Xv8Amc3upYP9hfRaA")
            }
          >
            <CustomText
              text={`View on Google Maps`}
              textDecorationLine={"underline"}
              lineHeight={20}
              color={colors.primary}
              style={{ textAlign: "justify" }}
              size={14}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            gap: verticalScale(2),
          }}
        >
          <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
            <CustomText
              text={`.`}
              lineHeight={20}
              fontWeight="600"
              style={{ textAlign: "justify", marginTop: verticalScale(-3) }}
              size={18}
            />
            <CustomText
              text={`Urdu Bazar`}
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
              text={`Al-Habib Plaza 38 Urdu Bazar, Lahore `}
              lineHeight={20}
              style={{ textAlign: "justify" }}
              size={14}
            />
          </View>
          <View
            style={{
              ...styles.textPoints,
              alignItems: "center",
            }}
          >
            <CustomText
              text={`Phone:`}
              lineHeight={20}
              fontWeight="600"
              style={{ textAlign: "justify" }}
              size={14}
            />
            <TouchableOpacity
              onPress={() => onDialNumber("042 3723 7484")}
              activeOpacity={0.5}
            >
              <CustomText
                text={`042 3723 7484`}
                fontWeight="600"
                color={colors.primary}
                size={12}
              />
            </TouchableOpacity>
          </View>

        
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              Linking.openURL("https://maps.app.goo.gl/Nmj3TGgoEBUCZotw5")
            }
          >
            <CustomText
              text={`View on Google Maps`}
              textDecorationLine={"underline"}
              lineHeight={20}
              color={colors.primary}
              style={{ textAlign: "justify" }}
              size={14}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            gap: verticalScale(2),
          }}
        >
          <View style={{ ...styles.textPoints, marginLeft: scale(0) }}>
            <CustomText
              text={`.`}
              lineHeight={20}
              fontWeight="600"
              style={{ textAlign: "justify", marginTop: verticalScale(-3) }}
              size={18}
            />
            <CustomText
              text={`Bahria Town`}
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
              text={`50 - 51, Chambeli Block, Bahria Town, Lahore`}
              lineHeight={20}
              style={{ textAlign: "justify" }}
              size={14}
            />
          </View>
          <View
            style={{
              ...styles.textPoints,
              alignItems: "center",
            }}
          >
            <CustomText
              text={`Phone:`}
              lineHeight={20}
              fontWeight="600"
              style={{ textAlign: "justify" }}
              size={14}
            />
            <TouchableOpacity
              onPress={() => onDialNumber("042 36445456")}
              activeOpacity={0.5}
            >
              <CustomText
                text={`042 36445456`}
                fontWeight="600"
                color={colors.primary}
                // style={{ textAlign: "justify" }}
                size={12}
              />
            </TouchableOpacity>
            <CustomText text={`|`} fontWeight="600" size={14} />
            <TouchableOpacity
              onPress={() => onDialNumber("0300 525 8551")}
              activeOpacity={0.5}
            >
              <CustomText
                text={`0300 525 8551`}
                fontWeight="600"
                color={colors.primary}
                size={12}
              />
            </TouchableOpacity>
         
          </View>

        
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              Linking.openURL("https://maps.app.goo.gl/eAH93CLr7XV9LsgG9?g_st=com.google.maps.preview.copy")
            }
          >
            <CustomText
              text={`View on Google Maps`}
              textDecorationLine={"underline"}
              lineHeight={20}
              color={colors.primary}
              style={{ textAlign: "justify" }}
              size={14}
            />
          </TouchableOpacity>
        </View>

        <CustomText
          text={`At Readings, we continue to pursue our mission of making reading a part of daily life for all Pakistanis. We invite you to join us on this journey of discovery, inspiration, and knowledge.`}
          lineHeight={20}
          style={{ textAlign: "justify" }}
          size={14}
        />
      </ScrollView>
    </ScreenLayout>
  );
};
export default AboutScreen;

const styles = StyleSheet.create({
  textPoints: {
    flexDirection: "row",
    gap: scale(3),
    width: "94%",
  },
});
