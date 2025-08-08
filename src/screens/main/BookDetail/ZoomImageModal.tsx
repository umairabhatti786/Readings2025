import {
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import Modal from 'react-native-modal';
import { windowHeight, windowWidth } from '../../../utils/Dimensions';
import { scale, verticalScale } from 'react-native-size-matters';
import { images } from '../../../assets/images';
import { font } from '../../../utils/font';
import CustomText from '../../../components/CustomText';
import { colors } from '../../../utils/colors';
import CustomButton from '../../../components/CustomButton';
  
  
  const ZoomImageModal = ({
    modalVisible,
    setModalVisible,
    onPress,
    icon,
    title,
    des,
    buttonTitle,
    book_img,
    onBackdropPress
  }: any) => {
  
    return (
      <Modal
        isVisible={modalVisible}
        deviceWidth={windowWidth}
        deviceHeight={windowHeight}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        onBackButtonPress={() => setModalVisible?.(false)}
        onBackdropPress={() => {
          onBackdropPress?.()
          setModalVisible?.(false)
        }}
        style={{ margin: 0 }} // Make modal full screen

        backdropColor="rgba(0,0,0,0.3)"
        // style={{width:windowWidth,height:windowHeight}}
        >
             <Pressable 
            onPress={()=>setModalVisible(false)}
            style={{flex: 1,alignItems:"center",justifyContent:"center" }}>
          <Image
        style={{width:windowWidth/1.5,height:windowHeight/2.5,borderRadius:scale(20)}}
        source={{uri:book_img}}
        resizeMode="contain"
        // resizeMethod={"auto"}
            // resizeMethod=""
          />
          

          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: `rgba(0, 0, 0, 0.4)`, // Apply opacity to the background color
              opacity: 0.5,
            }}
          />
        </Pressable>
          {/* <ImageBackground
          style={{width:windowWidth,height:windowHeight}}
          source={{uri:book_img}}
          resizeMode="cover"
          >
            </ImageBackground> */}
        {/* <View
          style={styles.main}>
          <Image
            style={{width: scale(75), height: scale(75)}}
            source={icon || images.check}
          />
          <View
            style={{
              gap: verticalScale(10),
              alignItems: 'center',
              paddingVertical: verticalScale(10),
            }}>
            <CustomText
              text={title || 'Email Sent'}
              fontFam={font.WorkSans_SemiBold}
              fontWeight="600"
              size={20}
            />
            <CustomText
              style={{textAlign: 'center'}}
              lineHeight={18}
              text={
                des ||
                'A reset password link has been sent to your email. Please follow the link to reset your password.'
              }
              color={colors.grey}
              size={14}
            />
          </View>
  
          <CustomButton text={buttonTitle || 'Great!'} onPress={onPress} />
        </View> */}
      </Modal>
    );
  };
  
  export default ZoomImageModal;
  
  const styles = StyleSheet.create({
    main:{
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: colors.white,
    },
    circle: {
      width: scale(40),
      height: scale(40),
      alignItems: "center",
      justifyContent: "center",
      position:"absolute",
      top:scale(60),
      left:scale(30),
      backgroundColor: colors.black+"30",
      borderRadius: 999,
      zIndex:999
    },
  
  });
  