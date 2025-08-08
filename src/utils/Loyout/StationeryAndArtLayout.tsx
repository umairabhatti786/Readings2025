import { ScrollView, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { windowWidth } from "../Dimensions";
import { scale, verticalScale } from "react-native-size-matters";
import { appStyles } from "../AppStyles";

export const StationeryAndArtLayout = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;

  return (
    <>
      <SkeletonPlaceholder
        // speed={00}
        highlightColor="rgb(222, 226, 230)"
        backgroundColor="#e9ecef" // Set the main background color of the skeleton
      >
        <View style={{ gap: verticalScale(15) }}>
          <View style={{ gap: verticalScale(15) }}>
            <View
              style={{
                borderRadius: scale(4),
                width: scale(110),
                height: verticalScale(13),
                marginLeft: scale(20),
                marginVertical: 10,
                marginBottom: verticalScale(-2),
              }}
            />

            <View
              style={{
                ...appStyles.row,
                marginLeft: scale(20),
                marginTop: verticalScale(-5),
                gap: scale(15),
              }}
            >
              {[1, 2, 3, 4, 5].map((item, index) => {
                return (
                  <View key={index.toString()}>
                    <View
                      style={{
                        width: windowWidth / 1.9,

                        height: verticalScale(200),
                        marginBottom: 30,
                        borderRadius: scale(10),
                      }}
                    />
                  </View>
                );
              })}
            </View>
          </View>
          <View
            style={{ gap: verticalScale(15), marginTop: verticalScale(-10) }}
          >
            <View
              style={{
                borderRadius: scale(4),
                width: scale(110),
                height: verticalScale(13),
                marginLeft: scale(20),
                marginBottom: verticalScale(-2),
              }}
            />

            <View
              style={{
                ...appStyles.row,
                marginLeft: scale(20),
                marginTop: verticalScale(-5),
                gap: scale(15),
              }}
            >
              {[1, 2, 3, 4, 5].map((item, index) => {
                return (
                  <View key={index.toString()}>
                    <View
                      style={{
                        width: windowWidth / 1.9,

                        height: verticalScale(200),
                        marginBottom: 30,
                        borderRadius: scale(10),
                      }}
                    />
                  </View>
                );
              })}
            </View>
          </View>
          <View
            style={{ gap: verticalScale(15), marginTop: verticalScale(-10) }}
          >
            <View
              style={{
                borderRadius: scale(4),
                width: scale(110),
                height: verticalScale(13),
                marginLeft: scale(20),
                marginBottom: verticalScale(-2),
              }}
            />

            <View
              style={{
                ...appStyles.row,
                marginLeft: scale(20),
                marginTop: verticalScale(-5),
                gap: scale(15),
              }}
            >
              {[1, 2, 3, 4, 5].map((item, index) => {
                return (
                  <View key={index.toString()}>
                    <View
                      style={{
                        width: windowWidth / 1.9,

                        height: verticalScale(200),
                        marginBottom: 30,
                        borderRadius: scale(10),
                      }}
                    />
                  </View>
                );
              })}
            </View>
          </View>
          
        </View>
      </SkeletonPlaceholder>
    </>
  );
};
