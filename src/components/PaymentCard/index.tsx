import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/colors";
import { images } from "../../assets/images";
import { scale, verticalScale } from "react-native-size-matters";
import { font } from "../../utils/font";
import { windowWidth } from "../../utils/Dimensions";
import CustomText from "../CustomText";

type Props = {
  width?: any;
  info?: any;
  item?: any;
  onDelete?:any
};

const PaymentCard = ({ width, info, item,onDelete }: Props) => {
  console.log("cdkcdkccasrd", item);

  // icon={
  //   item?.card_details?.card_network == "mastercard"
  //     ? images?.master_card
  //     : images?.visa_card
  // }
  // last_four_digits={item?.card_details?.last_four_digits}
  // title={item?.card_details?.card_network}
  return (
    <View style={style.main}>
      <View
        style={{
          flex: 1,
          gap: scale(10),
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={style.visaCard}>
          <Image
            source={
              item?.card_details?.card_network == "mastercard"
                ? images?.master_card
                : images?.visa_card
            }
            resizeMode="contain"
            style={{
              width: scale(24),
              height: scale(24),
            }}
          />
        </View>
        <CustomText
          text={"----"}
          fontWeight="500"
          fontFam={font.WorkSans_Regular}
          color={colors.dark_black}
          size={12}
        />
        <CustomText
          text={"----"}
          fontWeight="500"
          fontFam={font.WorkSans_Regular}
          color={colors.dark_black}
          size={12}
        />
        <CustomText
          text={"----"}
          fontWeight="500"
          fontFam={font.WorkSans_Regular}
          color={colors.dark_black}
          size={12}
        />
        <CustomText
          text={item?.card_details?.last_four_digits}
          fontWeight="500"
          fontFam={font.WorkSans_Regular}
          color={colors.dark_black}
          size={14}
        />
      </View>
      {info ? (
        <TouchableOpacity
        onPress={onDelete}
        style={{height:"100%",width:scale(30),flexDirection:"row",alignItems:"flex-end",justifyContent:"flex-end"}}
        >
          <Image
            source={images.dots}
            resizeMode="contain"
            style={{
              width: scale(16),
              height: scale(16),
              marginRight: scale(5),
              alignSelf:"center"
            }}
          />
        </TouchableOpacity>
      ) : (
        <View style={style.checkBox}>
          <View style={style.checkBoxInner}></View>
        </View>
      )}
    </View>
  );
};
export default PaymentCard;

const style = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: windowWidth / 1.4,
    backgroundColor: colors.white,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(7),
    borderRadius: scale(10),
  },
  visaCard: {
    width: scale(38),
    height: scale(38),
    backgroundColor: colors.dull_white,
    borderRadius: scale(7),
    alignItems: "center",
    justifyContent: "center",
  },
  checkBox: {
    width: scale(16),
    height: scale(16),
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(5),
  },
  checkBoxInner: {
    width: scale(7),
    height: scale(7),
    borderRadius: 999,
    backgroundColor: colors.orange,
  },
});
