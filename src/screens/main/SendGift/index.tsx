import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import ScreenLayout from '../../../components/ScreenLayout';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../../utils/colors';
import TopHeader from '../../../components/TopHeader';
import CustomText from '../../../components/CustomText';
import CustomInput from '../../../components/CustomInput';
import {images} from '../../../assets/images';
import {font} from '../../../utils/font';
import CustomButton from '../../../components/CustomButton';
import {appStyles} from '../../../utils/AppStyles';
import DropDown from '../../../components/DropDown';
import {CountryData} from '../../../utils/Data';
import PaymentCard from '../../../components/PaymentCard';
import CustomAlertModal from '../../../components/CustomAlertModal';
import CustomCountryPicker from '../../../components/CustomCountryPicker';
import * as Animatable from 'react-native-animatable';

const SendGiftScreen = ({navigation}: any) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isAddCard, setIsAddCard] = useState(false);
  const [successModal, setIsSuccessModal] = useState(false);
  const [country, setCountry] = useState<any>("92");


  return (
    <>
      <ScreenLayout>
        <View
          style={{
            paddingHorizontal: scale(20),
            paddingBottom: verticalScale(10),
          }}>
          <TopHeader title="Send a Gift Card" />
        </View>
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
          <Image
          style={{width:scale(100),height:scale(100),marginTop:verticalScale(-50)}}
          source={images.coming_soon}
          resizeMode="contain"
          />

        {/* <CustomText
          fontWeight="600"
          numberOfLines={1}
          style={{marginTop:verticalScale(-20)}}
          color={colors.primary}
          fontFam={font.WorkSans_SemiBold}
          text={"Coming Soon"}
          size={20}
        /> */}

        </View>
        

{/* Coming  Soon */}
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: colors.dull_white,
            flex: 1,
          }}
          contentContainerStyle={{
            backgroundColor: colors.dull_white,
            gap: verticalScale(20),
            paddingBottom: verticalScale(30),
          }}>
          <View
            style={{
              paddingHorizontal: scale(20),
              gap: verticalScale(20),
              paddingTop: verticalScale(10),
            }}>
            <CustomText
              text={'Add your gift recipient details below.'}
              size={14}
            />
            <CustomInput placeholder="Recipient Name" rightSourceSize={30} />
            <CustomInput placeholder="Recipient Email" />

            <CustomCountryPicker
            country={country}
            setCountry={setCountry}
             placeholder="345 123 456 7" />
            <CustomText
              text={'Add your gift recipient details below.'}
              size={14}
              style={{
                marginTop: verticalScale(20),
                marginBottom: verticalScale(-5),
              }}
            />

            <CustomInput placeholder="John Doe" />
            <CustomInput placeholder="johndoe121@gmail.com" />
            <CustomCountryPicker 
            country={country}
            setCountry={setCountry}
            placeholder="345 123 456 7" />

            <CustomText
              text={'Gift Card Amount ( Online Payment Only )'}
              size={14}
              color={colors.dark_black}
              fontWeight="600"
              fontFam={font.WorkSans_SemiBold}
              style={{
                marginTop: verticalScale(20),
                marginBottom: verticalScale(-5),
              }}
            />

            <CustomInput placeholder="Amount(PKR 500 - 10,000)" />
          </View>
          <View style={{gap: verticalScale(20)}}>
            <CustomText
              text={'Card Details'}
              size={14}
              color={colors.dark_black}
              fontWeight="600"
              fontFam={font.WorkSans_SemiBold}
              style={{
                marginTop: verticalScale(20),
                marginBottom: verticalScale(-5),
                marginHorizontal: scale(20),
              }}
            />
            {isAddCard ? (
              <>
                <Animatable.View
                  duration={1000}
                  animation={'fadeIn'}
                  delay={100}
                  style={{
                    paddingHorizontal: scale(20),
                    gap: verticalScale(20),
                  }}>
                  <CustomInput
                    placeholder="Card Nuumber"
                    rightSource={images.visa}
                    rightSourceSize={30}
                  />
                  <CustomInput placeholder="Card Holder Name" />
                  <View style={appStyles.rowjustify}>
                    <CustomInput
                      width={'47%'}
                      textAlign="center"
                      placeholder="07 / 27"
                    />
                    <CustomInput width={'47%'} placeholder="CVC" />
                  </View>
                  <CustomInput placeholder="Address" />

                  <View style={appStyles.rowjustify}>
                    <CustomInput width={'47%'} placeholder="City" />
                    <CustomInput width={'47%'} placeholder="State/Province" />
                  </View>

                  <DropDown
                    placeholder={'Country'}
                    dropWidth={'100%'}
                    label="Download"
                    setValue={setSelectedCountry}
                    value={selectedCountry}
                    onSelect={(it: any) => {
                      setSelectedCountry(it?.value);
                    }}
                    data={CountryData.map((item, _index) => {
                      return {
                        id: item?.id,
                        label: item?.label,
                        value: item?.value,
                      };
                    })}
                  />

                  <CustomInput placeholder="ZIP Code" />
                </Animatable.View>
              </>
            ) : (
              <FlatList
                data={[1, 2, 3]}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{paddingLeft: scale(20)}}
                contentContainerStyle={{
                  paddingRight: scale(40),
                  gap: scale(15),
                }}
                keyExtractor={(index: any) => index.toString()}
                renderItem={({item, index}: any) => {
                  return <PaymentCard />;
                }}
              />
            )}
          </View>

          <View style={{paddingHorizontal: scale(20), gap: verticalScale(20)}}>
            {!isAddCard && (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setIsAddCard(true)}
                style={{
                  ...appStyles.row,
                  gap: scale(10),
                  marginTop: verticalScale(-5),
                }}>
                <CustomText
                  text={'Add New Card'}
                  size={14}
                  color={colors.primary}
                  fontWeight="600"
                  fontFam={font.WorkSans_SemiBold}
                />
                <Image
                  source={images.plus}
                  resizeMode="contain"
                  style={{
                    width: scale(15),
                    height: scale(15),
                  }}
                />
              </TouchableOpacity>
            )}

            <CustomButton
              onPress={() => setIsSuccessModal(true)}
              text="Send Gift Card"
            />
          </View>
        </ScrollView> */}
      </ScreenLayout>

      <CustomAlertModal
        buttonTitle={'Back to Home'}
        modalVisible={successModal}
        icon={images.gift}
        title={'Gift Sent'}
        des={
          'Your Gift Card is on its way to Rebecca and you both will be notify as she received. Usually takes 3 hours to arrive.'
        }
        setModalVisible={setIsSuccessModal}
        onPress={() => {
          setIsSuccessModal(false);
          setTimeout(() => {
            navigation.goBack();
          }, 500);
        }}
      />
    </>
  );
};

export default SendGiftScreen;
