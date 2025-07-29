import { Platform, StyleSheet } from "react-native";
import { theme } from "../Themes";
import sizeHelper from "../Helpers";


export const appStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowjustify: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
appHeader:{
  width: "100%",
  backgroundColor:theme.colors.primary,
  height: sizeHelper.calHp(170),
  paddingHorizontal: sizeHelper.calWp(40),
  borderBottomLeftRadius: sizeHelper.calWp(80),
  borderBottomRightRadius: sizeHelper.calWp(80),
  justifyContent: "center",
},
screenLayout:{
  flex: 1,
  paddingHorizontal: sizeHelper.calWp(30),
  gap: sizeHelper.calWp(30),
}
//   Container: {
//     flex: 1,
//     backgroundColor: t.colors.background,
//     paddingHorizontal: sizeHelper.calWp(30),
//     paddingTop: sizeHelper.calHp(Platform.OS=="ios"?10 :30),
//     gap: sizeHelper.calWp(30),
//   },
//   backBtn: {
//     width: sizeHelper.calWp(70),
//     height: sizeHelper.calWp(70),
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: theme.colors.white,
//     borderRadius: sizeHelper.calWp(30),
//   },

 
});
