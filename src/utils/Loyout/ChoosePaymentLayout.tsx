import { ScrollView, StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { windowWidth } from "../Dimensions";
import { scale, verticalScale } from "react-native-size-matters";
import { appStyles } from "../AppStyles";

export const ChoosePaymentLayout = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;

  return (
    <>
      <SkeletonPlaceholder
        // speed={00}
        highlightColor="rgb(222, 226, 230)"
        backgroundColor="#e9ecef" // Set the main background color of the skeleton
      >
        <View style={{ gap: verticalScale(15) }}>
          <View
            style={{
              gap: scale(20),
            }}
          >
            {[1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15].map((item, index) => {
              return (
                <View>
                  <View style={appStyles.rowjustify}>
                    <View style={{ ...appStyles.row, gap: scale(10) }}>
                      <View
                        style={{
                          borderRadius: 999,
                          width: scale(20),
                          height: scale(20),
                        }}
                      />
                     <View
                        style={{
                          borderRadius: scale(4),
                          width: scale(110),
                          height: verticalScale(10),
                        }}
                      />

                    
                    </View>
                    <View
                        style={{
                          borderRadius: 999,
                          width: scale(20),
                          height: scale(20),
                        }}
                      />
                  </View>
                  
                </View>
              );
            })}
          </View>
        </View>
      </SkeletonPlaceholder>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: verticalScale(100),
    borderRadius: scale(10),
  },
  box: {
    borderRadius: scale(4),
    width: scale(110),
    height: verticalScale(13),
  },
});
