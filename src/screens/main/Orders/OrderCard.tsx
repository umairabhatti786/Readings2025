import React, { useState } from "react";
import { View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { appStyles } from "../../../utils/AppStyles";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import { colors } from "../../../utils/colors";
import CustomButton from "../../../components/CustomButton";
import { getOrderStatusText } from "../../../utils/CommonHooks";
interface data {
  orderId?: string;
  amount?: string;
  orderStatus?: any;
  orderDetail?: string;
  title?: string;
}
type Props = {
  data: any;
  onPress?: () => void;
};
const OrderCard = ({ data, onPress }: Props) => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: colors.dull_half_white,
        paddingBottom: verticalScale(8),
      }}
    >
      <View
        style={{
          ...appStyles.rowjustify,
        }}
      >
        <View style={{ gap: scale(4) }}>
          <CustomText
            text={`ORDER ${data?.n_order_id}`}
            fontWeight="600"
            fontFam={font.WorkSans_SemiBold}
            size={14}
          />
          {data.total_amount && (
            <CustomText
              text={`Amount: Rs. ${data.total_amount}`}
              color={colors.grey}
              size={12}
            />
          )}
          {data.title && (
            <CustomText text={data?.title} color={colors.grey} size={12} />
          )}
          {/* {data?.orderStatus && ( */}
            <CustomText
              text={getOrderStatusText(data?.status).title}
              color={getOrderStatusText(data?.status).color}
              size={12}
            />
          {/* )} */}
        </View>
        {/* {data?.orderDetail && ( */}
        <CustomButton
          width={"30%"}
          onPress={onPress}
          text={"Details"}
          bgColor={colors.white}
          textColor={colors.primary}
        />
        {/* )} */}
      </View>
    </View>
  );
};

export default OrderCard;
