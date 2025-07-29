import { Image, TouchableOpacity, View, TextInput } from "react-native";
import CustomText from "../Text";
import { InputProps } from "../../utils/Types";
import { theme } from "../../utils/Themes";
import { fonts } from "../../utils/Themes/fonts";
import sizeHelper from "../../utils/Helpers";
import { useState } from "react";
import images from "../../utils/Constants/images";
import { appStyles } from "../../utils/GlobalStyles";
import icons from "../../utils/Constants/icons";

const CountryDropdown = ({
  props,
  height,
  width,
  borderRadius,
  backgroundColor,
  label,
  leftSource,
  onRightSource,
  borderColor,
  placeholder,
  value,
  setValue,
  data,
  iconSize,
  top
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View
      style={{
        ...props,
        width: width || "100%",
      }}
    >
      {label && (
        <View
          style={{
            marginBottom: sizeHelper.calHp(25),
          }}
        >
          <CustomText
            text={label}
            fontWeight="700"
            size={23}
            fontFam={fonts.PlusJakartaSans_Bold}
          />
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => setIsOpen(!isOpen)}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",

          paddingHorizontal: sizeHelper.calWp(25),
          height: sizeHelper.calHp(height || 80),
          alignItems: "center",
          borderColor: borderColor || theme.colors.input_field_stroke,
          gap: sizeHelper.calWp(10),
          borderWidth: 1,
          borderRadius: borderRadius || sizeHelper.calWp(15),
          backgroundColor: backgroundColor || theme.colors.Input_field,
        }}
      >
        {value?.name ? (
          <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
            <Image
              source={value?.icon}
              style={{
                width: sizeHelper.calWp(50),
                height: sizeHelper.calWp(50),
                borderRadius: sizeHelper.calWp(50),
              }}
              resizeMode={"contain"}
            />

            <CustomText
              text={value?.name}
              color={theme.colors.gray}
              size={24}
            />
          </View>
        ) : (
          <CustomText text={placeholder} color={theme.colors.gray} size={21} />
        )}

        <TouchableOpacity
          onPress={onRightSource}
          disabled={!onRightSource}
          activeOpacity={0.3}
        >
          <Image
            source={icons.down_arrow}
            style={{
              width: sizeHelper.calWp(25),
              height: sizeHelper.calWp(25),
            }}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      {isOpen && (
        <View
          style={{
            width: "100%",
            borderWidth: 1,
            borderRadius: sizeHelper.calWp(20),
            borderColor: theme.colors.input_field_stroke,
            // gap: sizeHelper.calHp(20),
            backgroundColor: theme.colors.white,
            position: "absolute",
            zIndex:999,
            top: sizeHelper.calHp(top|| 90),
          }}
        >
          {data?.map((item: any, index: any) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setIsOpen(false);
                  setValue(item);
                }}
                style={{
                  gap: sizeHelper.calHp(20),
                  borderBottomWidth: index === data.length - 1 ? 0 : 1,
                  borderBottomColor: theme.colors.input_field_stroke,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setIsOpen(false);
                    setValue(item);
                  }}
                  style={{
                    ...appStyles.row,
                    gap: sizeHelper.calWp(20),
                    padding: sizeHelper.calWp(25),
                  }}
                >
                  <Image
                    source={item?.icon}
                    style={{
                      width: sizeHelper.calWp(iconSize ||52),
                      height: sizeHelper.calWp(iconSize ||52),
                      borderRadius: sizeHelper.calWp(iconSize||52),
                    }}
                    resizeMode={"contain"}
                  />

                  <CustomText
                    text={item?.name}
                    color={theme.colors.gray}
                    size={22}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};
export default CountryDropdown;
