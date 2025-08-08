import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import CustomText from '../CustomText';
import {colors} from '../../utils/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import {images} from '../../assets/images';
type Props = {
  text?: string;
  onPress?: () => void;
  width?: any;
  height?: number;
  icon?:any
};

const SocialButton = ({text, onPress,icon}: Props) => {
  return (
    <TouchableOpacity
    activeOpacity={0.5}
    onPress={onPress}
     style={styles.container}>
      <Image
        style={{width: scale(18), height: scale(18)}}
        source={icon}
      />

      <CustomText text={text} size={14} />
    </TouchableOpacity>
  );
};
export default SocialButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    height: verticalScale(39),
    borderRadius: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(10),
  },
});
