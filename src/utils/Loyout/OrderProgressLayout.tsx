import { ScrollView, StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { windowWidth } from "../Dimensions";
import { scale, verticalScale } from "react-native-size-matters";
import { appStyles } from "../AppStyles";

export const OrderProgressLayout = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;

  return (
    <>
      <SkeletonPlaceholder
        // speed={00}
        highlightColor="rgb(222, 226, 230)"
        backgroundColor="#e9ecef" // Set the main background color of the skeleton
      >
        <View>

        <View
            style={{
              flexDirection: "row",
              gap: scale(12),
              marginLeft: scale(5),
            }}
          >
            <View
              style={{
                gap: verticalScale(10),
                marginTop: verticalScale(5),
              }}
            >
                  <View
                style={styles.text_view}
              />
              <View
                style={styles.text_view}
              />
            
            </View>
            <View style={{ alignItems: "center" }}>
              <View
                style={styles.circle}
              >
               
              </View>
              <View
                  style={styles.line}
                />
            </View>

            <View
                style={{...styles.text_view,marginTop:verticalScale(10)}}
              />
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: scale(12),
              marginLeft: scale(5),
            }}
          >
            <View
              style={{
                gap: verticalScale(10),
                marginTop: verticalScale(5),
              }}
            >
                  <View
                style={styles.text_view}
              />
              <View
                style={styles.text_view}
              />
            
            </View>
            <View style={{ alignItems: "center" }}>
              <View
                style={styles.circle}
              >
               
              </View>
              <View
                  style={styles.line}
                />
            </View>

            <View
                style={{...styles.text_view,marginTop:verticalScale(10)}}
              />
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: scale(12),
              marginLeft: scale(5),
            }}
          >
            <View
              style={{
                gap: verticalScale(10),
                marginTop: verticalScale(5),
              }}
            >
                  <View
                style={styles.text_view}
              />
              <View
                style={styles.text_view}
              />
            
            </View>
            <View style={{ alignItems: "center" }}>
              <View
                style={styles.circle}
              >
               
              </View>
              <View
                  style={styles.line}
                />
            </View>

            <View
                style={{...styles.text_view,marginTop:verticalScale(10)}}
              />
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: scale(12),
              marginLeft: scale(5),
            }}
          >
            <View
              style={{
                gap: verticalScale(10),
                marginTop: verticalScale(5),
              }}
            >
                  <View
                style={styles.text_view}
              />
              <View
                style={styles.text_view}
              />
            
            </View>
            <View style={{ alignItems: "center" }}>
              <View
                style={styles.circle}
              >
               
              </View>
             
            </View>

            <View
                style={{...styles.text_view,marginTop:verticalScale(10)}}
              />
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
  circle: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(36),
   
  },
  text_view:
    {
        borderRadius: 999,
        width: scale(80),
        height: verticalScale(10),
      },
      line:{
        width: scale(3),
        height: verticalScale(30),
      }

  

});
