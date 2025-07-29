import {
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    StyleProp,
    ViewStyle,
  } from 'react-native';
  import sizeHelper, {screenWidth, screentHeight} from '../../utils/Helpers';
  import {fonts} from '../../utils/Themes/fonts';
  import {theme} from '../../utils/Themes';
  import icons from '../../utils/Constants/icons';
  import CustomText from '../Text';
  import {appStyles} from '../../utils/GlobalStyles';
  import images from '../../utils/Constants/images';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../Header';
import AnimatedProgressBar from '../AnimatedProgressBar';
  

  const ProgressHeader = ({progress,label,title}: any) => {
    const navigation:any=useNavigation()
    return (
      <>
       <View style={{ gap: sizeHelper.calHp(15) }}>
            <View style={{ paddingHorizontal: sizeHelper.calWp(30) }}>
              <CustomHeader
                textColor={theme.colors.gray100}
                fontWeight="500"
                fontFam={fonts.PlusJakartaSans_Regular}
                label={label||"1/4 Recipient Information"}
                title={title ||"Send money"}
              />
            </View>
            <AnimatedProgressBar progress={progress} />
          </View>
      </>
    );
  };
  export default ProgressHeader;
  
  const styles = StyleSheet.create({
   
  });
  