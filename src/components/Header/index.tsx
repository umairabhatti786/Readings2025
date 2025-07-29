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
  

  const CustomHeader = ({title,textColor,tintColor,label,fontWeight,fontFam}: any) => {
    const navigation:any=useNavigation()
    return (
      <>
        <View
        style={{
          ...appStyles.rowjustify,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: sizeHelper.calWp(80),
            height: sizeHelper.calWp(80),
            justifyContent: 'center',
            borderRadius:sizeHelper.calWp(80),
            backgroundColor:theme.colors.white,
            alignItems:"center"
          }}>
          <Image
            style={{
              width: sizeHelper.calWp(30),
              height: sizeHelper.calWp(30),
              resizeMode: 'contain',
              tintColor:theme.colors.black
            }}
            source={icons.back_arrow}
          />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
            {
                title&&(
                  <View style={{alignItems:"center",}}>
                      <CustomText
                    text={title}
                    fontWeight={fontWeight ||"700"}
                    style={{textAlign:"center"}}
                    fontFam={ fontFam||fonts.PlusJakartaSans_Bold}
                    color={textColor|| theme.colors.black}
                    size={25}
                  />

{
  label&&(
    <CustomText
                    text={label}
                    fontWeight="600"
                    style={{textAlign:"center"}}
                    fontFam={fonts.PlusJakartaSans_SemiBold}
                    color={theme.colors.light_black}
                    size={25}
                  />

  )
}

                    </View>
                  

                )
            }
        
        </View>
        <View style={{width: 60}} />

      </View>
      </>
    );
  };
  export default CustomHeader;
  
  const styles = StyleSheet.create({
   
  });
  