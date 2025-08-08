import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/colors";
import { images } from "../../assets/images";
import { scale, verticalScale } from "react-native-size-matters";
import { font } from "../../utils/font";
import { windowWidth } from "../../utils/Dimensions";
import CustomText from "../CustomText";
import { appStyles } from "../../utils/AppStyles";

interface data {
  Address?: string;
  City?: string;
  Country?: string;
  Phone?: string;
  PostCode?: string;
  id?:any
  Name?:string
}

type Props = {
  width?: any;
  data?: data;
  onDeleteAddress?: any;
  onEditAddress?: any;
  isProfile?: boolean;
  selectedAddress?:any
  isSelectedAddress?:any
  onSelectAddress?:any

};

const AddressCard = ({
  width,
  data,
  onDeleteAddress,
  onEditAddress,
  isProfile,
  selectedAddress,
  isSelectedAddress,
  onSelectAddress
}: Props) => {
  return (
    <View style={{ ...style.main, width: width || windowWidth / 1.4 }}>
      <View style={{ ...appStyles.rowjustify, width: "100%" }}>
        <CustomText
          text={data?.Address || "359 American Schme Block B9"}
          color={colors.black}
          numberOfLines={1}
          style={{ width: "90%" }}
          fontWeight="600"
          fontFam={font.WorkSans_SemiBold}
          size={14}
        />
        {isSelectedAddress&&(
          <TouchableOpacity
          activeOpacity={0.5}
          onPress={onSelectAddress}
          // onPress={() => setSelectedOnlinePayment(item.label)}
          style={{
            ...style.radioButtonConainer,
            borderWidth: 1.2,
            borderColor:
              selectedAddress?.id == data.id
                ? colors.orange
                : colors.dull_half_white,
          }}>
          {selectedAddress?.id == data.id && (
            <TouchableOpacity
              activeOpacity={0.5}
              style={style.radioButtonInner}></TouchableOpacity>
          )}
        </TouchableOpacity>

        )

        }




      </View>

      <View style={{ gap: verticalScale(2) }}>
        {
          data?.Name&&(
            <CustomText
            text={data?.Name}
            color={colors.grey}
            fontWeight="500"
            fontFam={font.WorkSans_Regular}
            size={12}
          />

          )
        }
        <CustomText
          text={
            data?.City ? data?.City + "," + data?.Country : "Lahore, Pakistan"
          }
          color={colors.grey}
          fontWeight="500"
          fontFam={font.WorkSans_Regular}
          size={12}
        />
        <CustomText
          text={data?.PostCode || "54009"}
          color={colors.grey}
          fontWeight="500"
          fontFam={font.WorkSans_Regular}
          size={12}
        />
        <View style={{ ...appStyles.rowjustify, width: "100%" }}>
          <CustomText
            text={data?.Phone || "+92 345 678 9012"}
            color={colors.grey}
            fontWeight="500"
            fontFam={font.WorkSans_Regular}
            size={12}
          />

          {isProfile && (
            <View style={{ ...appStyles.row, gap: scale(5) }}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  alignItems: "flex-end",
                  width: scale(50),
                  justifyContent: "flex-end",
                }}
                onPress={onEditAddress}
              >
                <CustomText
                  fontWeight="600"
                  fontFam={font.WorkSans_SemiBold}
                  color={colors.primary}
                  text={"Edit"}
                  size={12}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  alignItems: "flex-end",
                  alignSelf: "flex-end",
                  width: scale(50),
                }}
                onPress={onDeleteAddress}
              >
                <CustomText
                  fontWeight="600"
                  fontFam={font.WorkSans_SemiBold}
                  color={colors.red}
                  text={"Delete"}
                  size={12}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
export default AddressCard;

const style = StyleSheet.create({
  main: {
    backgroundColor: colors.white,
    padding: scale(15),
    borderRadius: scale(10),
    gap: verticalScale(10),
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
  },
  checkBoxInner: {
    width: scale(7),
    height: scale(7),
    borderRadius: 999,
    backgroundColor: colors.orange,
  },

  radioButtonConainer: {
    width: scale(16),
    height: scale(16),
    borderRadius: 999,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInner: {
    width: scale(8),
    height: scale(8),
    borderRadius: 999,
    backgroundColor: colors.orange,
  },
});
