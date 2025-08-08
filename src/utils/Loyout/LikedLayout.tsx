import { ScrollView, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { windowWidth } from "../Dimensions";
import { scale, verticalScale } from "react-native-size-matters";
import { appStyles } from "../AppStyles";
import { LikedBookLayout } from "./LikedBookLayout";

export const LikedLayout = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;

  return (
    <>
      <SkeletonPlaceholder
        // speed={00}
        highlightColor="rgb(222, 226, 230)"
        backgroundColor="#e9ecef" // Set the main background color of the skeleton
      >
        <View style={{ paddingTop: verticalScale(10), gap: verticalScale(15), }}>
          <View
            style={{ ...appStyles.rowjustify, paddingHorizontal: scale(20) }}
          >
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
          <View style={{ gap: verticalScale(15),paddingHorizontal:scale(20) }}>
        {[1, 2, 3, 4, 5].map((item, index) => {
              return (
                <View
                  key={index.toString()}
                  style={{
                    width: "100%",
                    height: verticalScale(140),
                    borderRadius: scale(15),
                  }}
                ></View>
              );
            })}
        </View>
      

          
        </View>
      </SkeletonPlaceholder>
    </>
  );
};
