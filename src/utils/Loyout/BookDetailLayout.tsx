import { Platform, ScrollView, StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { windowWidth } from "../Dimensions";
import { scale, verticalScale } from "react-native-size-matters";
import { appStyles } from "../AppStyles";

export const BookDetailLayout = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;

  return (
    <>
      <SkeletonPlaceholder
        // speed={00}
        highlightColor="rgb(222, 226, 230)"
        backgroundColor="#e9ecef" // Set the main background color of the skeleton
      >
        <View
          style={{
            // paddingTop: verticalScale(Platform.OS == "ios" ? 30 : 10),
            gap: verticalScale(15),
          }}
        >
          <View style={{ gap: verticalScale(15) }}>
            <View
              style={{
                width: "100%",
                height: verticalScale(295),
              }}
            />
            <View
              style={{ paddingHorizontal: scale(20), gap: verticalScale(5) }}
            >
              <View>
                <View
                  style={{
                    borderRadius: scale(4),
                    width: scale(100),
                    height: 16,
                    marginBottom: 8,
                  }}
                />
                <View
                  style={{
                    borderRadius: scale(4),
                    width: scale(60),
                    height: 16,
                    marginBottom: 8,
                  }}
                />
              </View>

              <View
                style={{
                  ...appStyles.rowjustify,
                  marginTop: verticalScale(10),
                }}
              >
                <View style={{ ...appStyles.row, gap: scale(15) }}>
                  <View
                    style={{
                      borderRadius: scale(4),
                      width: scale(100),
                      height: 16,
                    }}
                  />
                </View>

                <View
                  style={{
                    borderRadius: scale(4),
                    width: scale(100),
                    height: 16,
                    marginBottom: 8,
                  }}
                />
              </View>
              <View
                style={{
                  ...appStyles.rowjustify,
                  marginTop: verticalScale(10),
                }}
              >
                <View style={{ ...appStyles.row, gap: scale(15) }}>
                  <View
                    style={{
                      borderRadius: scale(4),
                      width: scale(100),
                      height: 16,
                    }}
                  />
                </View>

                <View
                  style={{
                    borderRadius: scale(4),
                    width: scale(100),
                    height: 16,
                  }}
                />
              </View>

              <View
                style={{
                  ...appStyles.rowjustify,
                  marginTop: verticalScale(10),
                }}
              >
                <View style={{ ...appStyles.row, gap: scale(15) }}>
                  <View
                    style={{
                      borderRadius: scale(4),
                      width: scale(100),
                      height: 16,
                    }}
                  />
                </View>

                <View
                  style={{
                    borderRadius: scale(4),
                    width: scale(100),
                    height: 16,
                  }}
                />
              </View>

              <View
                style={{
                  ...appStyles.rowjustify,
                  marginTop: verticalScale(20),
                }}
              >
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
              </View>
              <View
                style={{ ...appStyles.rowjustify, marginTop: verticalScale(5) }}
              >
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
              </View>
              <View
                style={{ ...appStyles.rowjustify, marginTop: verticalScale(5) }}
              >
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
              </View>
            </View>
          </View>
        </View>
      </SkeletonPlaceholder>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "31%",
    paddingLeft: scale(10),
    paddingVertical: verticalScale(10),
    borderRadius: scale(10),
    gap: verticalScale(6),
    height: verticalScale(60),
  },
});
