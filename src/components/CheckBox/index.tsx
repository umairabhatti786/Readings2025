import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../utils/colors';
import {font} from '../../utils/font';
import {scale} from 'react-native-size-matters';
import {images} from '../../assets/images';

type Props = {
  isActive: boolean;
  setIsActive: any;
  onActive?:any
};

const CheckBox = ({isActive, setIsActive,onActive}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        onActive?.()
        setIsActive(!isActive)
      }}
      style={{
        ...styles.billingCheckBox,
        borderWidth: isActive ? -1 : 1.2,
        backgroundColor: isActive ? colors.primary : 'transparent',
      }}>
      {/* {isBilling && ( */}
      <Image
        style={{
          width: scale(8),
          height: scale(8),
          tintColor: isActive ? colors.white : colors.grey,
        }}
        resizeMode="contain"
        source={images.tick}
      />
      {/* )} */}
    </TouchableOpacity>
  );
};
export default CheckBox;

const styles = StyleSheet.create({
  billingCheckBox: {
    width: scale(17),
    height: scale(17),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(5),
    borderColor: colors.grey,
  },
});
