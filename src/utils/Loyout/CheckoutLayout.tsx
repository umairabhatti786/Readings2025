import { ScrollView, StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { windowWidth } from "../Dimensions";
import { scale, verticalScale } from "react-native-size-matters";
import { appStyles } from "../AppStyles";

export const CheckoutLayout = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;

  return (
    <>
      <SkeletonPlaceholder
        // speed={00}
        highlightColor="rgb(222, 226, 230)"
        backgroundColor="#e9ecef" // Set the main background color of the skeleton
      >
        <View style={{ gap: verticalScale(15), paddingHorizontal: scale(20) }}>
          <View
            style={{
              borderRadius: scale(4),
              width: scale(110),
              height: verticalScale(13),
            }}
          />

          <View style={styles.card} />

          <View
            style={{
              borderRadius: scale(4),
              width: scale(110),
              height: verticalScale(13),
            }}
          />

          <View
            style={{
              borderRadius: scale(4),
              width: scale(110),
              height: verticalScale(13),
              marginVertical: 10,
            }}
          />

          <View
            style={{
              borderRadius: scale(4),
              width: scale(200),
              height: verticalScale(13),
            }}
          />

          <View
            style={{
              borderRadius: scale(4),
              width: scale(110),
              height: verticalScale(13),
            }}
          />
          <View style={{ gap: verticalScale(10) }}>
            <View style={{ ...appStyles.row, gap: scale(10) }}>
              <View
                style={{
                  borderRadius: 999,
                  width: scale(16),
                  height: scale(16),
                }}
              />

              <View
                style={{
                  borderRadius: scale(4),
                  width: scale(110),
                  height: verticalScale(13),
                }}
              />
            </View>

            <View style={{ ...appStyles.row, gap: scale(10) }}>
              <View
                style={{
                  borderRadius: 999,
                  width: scale(16),
                  height: scale(16),
                }}
              />

              <View
                style={{
                  borderRadius: scale(4),
                  width: scale(110),
                  height: verticalScale(13),
                }}
              />
            </View>
          </View>

          <View
            style={{
              gap: scale(10),
            }}
          >
            {[1, 2].map((item, index) => {
              return (
                <View key={index.toString()}>
                  <View style={{...styles.card,
                          height: verticalScale(70),

                }} />
                </View>
              );
            })}
          </View>

          <View style={appStyles.rowjustify}>
          <View
                style={{...styles.box,width:scale(40)}}
              />
                <View
                style={{...styles.box,width:scale(70)}}
              />

          </View>
          <View style={{...styles.card,height:verticalScale(40)}} />

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
  box:{
    borderRadius: scale(4),
    width: scale(110),
    height: verticalScale(13),
  }
});
