import { ScrollView, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { windowWidth } from "../Dimensions";
import { scale, verticalScale } from "react-native-size-matters";
import { appStyles } from "../AppStyles";

export const LikedBookLayout = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;

  return (
    <>
      <SkeletonPlaceholder
        // speed={00}
        highlightColor="rgb(222, 226, 230)"
        backgroundColor="#e9ecef" // Set the main background color of the skeleton
      >
        <View style={{ gap: verticalScale(15) }}>
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
      </SkeletonPlaceholder>
    </>
  );
};
