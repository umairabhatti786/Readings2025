import { ScrollView, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { windowWidth } from "../Dimensions";
import { scale, verticalScale } from "react-native-size-matters";
import { appStyles } from "../AppStyles";

export const StationeryBooksLayout = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;

  return (
    <>
      <SkeletonPlaceholder
        // speed={00}
        highlightColor="rgb(222, 226, 230)"
        backgroundColor="#e9ecef" // Set the main background color of the skeleton
      >
        <View style={{ paddingTop: verticalScale(45), gap: verticalScale(15) }}>
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

          <View
            style={{ paddingHorizontal: scale(20), gap: verticalScale(15) }}
          >
            <View
              style={{
                width: "100%",
                height: verticalScale(110),

                borderRadius: scale(8),
              }}
            />
            <View style={appStyles.rowjustify}>
              <View
                style={{
                  height: verticalScale(39),
                  width: "80%",
                  borderRadius: scale(8),
                }}
              ></View>
              <View
                style={{
                  height: verticalScale(39),
                  borderRadius: scale(8),
                  width: "15%",
                }}
              ></View>
            </View>
          </View>
          <View
            style={{
              ...appStyles.row,
              marginLeft: scale(20),
              marginTop: verticalScale(-5),
              gap: scale(10),
            }}
          >
            {[1, 2, 3, 4, 5].map((item, index) => {
              return (
                <View
                  key={index.toString()}
                  style={{
                    borderRadius: 999,
                    height: verticalScale(30),
                    width: scale(80),
                    paddingHorizontal: scale(16),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                ></View>
              );
            })}
          </View>
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
        </View>
      </SkeletonPlaceholder>
    </>
  );
};
