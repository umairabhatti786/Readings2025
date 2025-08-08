import { ScrollView, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { windowWidth } from "../Dimensions";
import { scale, verticalScale } from "react-native-size-matters";
import { appStyles } from "../AppStyles";
import { LikedBookLayout } from "./LikedBookLayout";
import { colors } from "../colors";

export const OrdersLayout = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;

  return (
    <SkeletonPlaceholder
      // speed={00}
      highlightColor="rgb(222, 226, 230)"
      backgroundColor="#e9ecef" // Set the main background color of the skeleton
    >
      <View
        style={{
          paddingTop: verticalScale(10),
          gap: verticalScale(15),
          paddingHorizontal: scale(20),
        }}
      >
        <View style={{ ...appStyles.rowjustify }}>
          <View style={{ ...appStyles.row, gap: scale(15) }}>
            <View
              style={{
                borderRadius: scale(4),
                width: scale(40),
                height: 16,
                marginBottom: 8,
              }}
            />
            <View
              style={{
                borderRadius: scale(4),
                width: scale(90),
                height: 16,
                marginBottom: 8,
              }}
            />
          </View>

          <View
            style={{
              borderRadius: scale(4),
              width: scale(40),
              height: 16,
              marginBottom: 8,
            }}
          />
        </View>

        <View
              style={{
                borderRadius: scale(4),
                width: "100%",
                height: verticalScale(40),
                marginBottom: 8,
              }}
            />
        <View style={{ gap: verticalScale(15) }}>
          {[1, 2, 3, 4,5,6,7].map((item, index) => {
            return (
              <View style={{...appStyles.rowjustify,
                borderBottomWidth: 1,
                borderBottomColor: colors.dull_half_white,
                paddingBottom: verticalScale(8),
              }}>
                <View style={{ gap: verticalScale(10) }}>
                  <View
                    key={index.toString()}
                    style={{
                      width: scale(100),
                      height: verticalScale(8),
                      borderRadius: scale(5),
                    }}
                  />
                  <View
                    key={index.toString()}
                    style={{
                      width: scale(100),
                      height: verticalScale(8),
                      borderRadius: scale(5),
                    }}
                  />
                  <View
                    key={index.toString()}
                    style={{
                      width: scale(100),
                      height: verticalScale(8),
                      borderRadius: scale(5),
                    }}
                  />
                </View>

                <View
                  style={{
                    height: verticalScale(40),
                    width: scale(100),
                    borderRadius: scale(6),
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};
