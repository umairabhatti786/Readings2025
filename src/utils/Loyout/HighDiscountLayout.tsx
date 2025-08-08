import { ScrollView, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { windowWidth } from "../Dimensions";
import { scale, verticalScale } from "react-native-size-matters";
import { appStyles } from "../AppStyles";
import { LikedBookLayout } from "./LikedBookLayout";

export const HighDiscountLayout = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;

  return (
    <>
      <SkeletonPlaceholder
        // speed={00}
        highlightColor="rgb(222, 226, 230)"
        backgroundColor="#e9ecef" // Set the main background color of the skeleton
      >
        <View style={{gap: verticalScale(6),
 
         }}>
         
         {[1, 2, 3, 4, 5,6,7,8,9,1,2,3,4].map((item, index) => {
              return (
                <View
                  key={index.toString()}
                  style={{
                    width: "100%",
                    height: verticalScale(39),
                    borderRadius: scale(10),
                }}
                ></View>
              );
            })}
      

          
        </View>
      </SkeletonPlaceholder>
    </>
  );
};
