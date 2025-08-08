import React, {useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import ScreenLayout from '../../../components/ScreenLayout';
import CustomText from '../../../components/CustomText';
import {scale, verticalScale} from 'react-native-size-matters';
import TopHeader from '../../../components/TopHeader';
import {colors} from '../../../utils/colors';
import {images} from '../../../assets/images';
import {windowHeight} from '../../../utils/Dimensions';
import {appStyles} from '../../../utils/AppStyles';
import CustomButton from '../../../components/CustomButton';
import CustomBottomSheet from '../../../components/CustomBottomSheet';
import DiscountSheetModal from './DiscountSheetModal';
import { CardDiscountData } from '../../../utils/Data';
const DiscountsScreen = () => {
  const [selectedBank, setSelectedBank] = useState(CardDiscountData[0]?.id);
  const bottomSheetModalRef = useRef<any>(null);
  const snapPoints = useMemo(() => ['50%', '50%'], []);
  const [discountTable,setDiscountTable]=useState(CardDiscountData[0]?.dicounts)


  const renderTableHeader = () => (
    <View style={appStyles.rowjustify}>
      <View style={styles.tableHeader}>
        <CustomText text={'BIN'} color={colors.grey} size={11} />
      </View>
      <View style={styles.tableHeader}>
        <CustomText text={'Category'} color={colors.grey} size={11} />
      </View>

      <View style={styles.tableHeader}>
        <CustomText text={'Type'} color={colors.grey} size={11} />
      </View>

      <View style={styles.tableHeader}>
        <CustomText text={'Discount'} color={colors.grey} size={11} />
      </View>

      <View style={styles.tableHeader}>
        <CustomText text={'Cap'} color={colors.grey} size={11} />
      </View>
    </View>
  );

  const renderItem = ({item, index}: any) => (
    <View
      style={{
        ...styles.dataRow,
        borderBottomWidth: index !== discountTable.length - 1 ? 1 : 0,
      }}>
      <View style={styles.tableHeader}>
        <CustomText text={item.bin} color={colors.black} size={10} />
      </View>
      <View style={styles.tableHeader}>
        <CustomText text={item.category} color={colors.black} size={10} />
      </View>
      <View style={styles.tableHeader}>
        <CustomText text={item.type} color={colors.black} size={10} />
      </View>
      <View style={styles.tableHeader}>
        <CustomText text={`${item.discount}%`} color={colors.black} size={10} />
      </View>
      <View style={styles.tableHeader}>
        <CustomText text={item.cap} color={colors.black} size={10} />
      </View>
    </View>
  );
  return (
    <>
      <ScreenLayout>
        <View style={{flex: 1, gap: verticalScale(20)}}>
          <View style={{paddingHorizontal: scale(20), gap: verticalScale(15)}}>
            <TopHeader title="Bank Card Discounts" />
            <CustomText
              text={
                'Refer to the list below to check if your card is valid for a discount.'
              }
              size={14}
            />
          </View>
          <View>
            <FlatList
              data={CardDiscountData}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{paddingLeft: scale(20)}}
              contentContainerStyle={{
                gap: scale(10),
                paddingRight: scale(40),
              }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}: any) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {

                      setDiscountTable(item?.dicounts)
                      setSelectedBank(item?.id)
                    }}
                    style={{
                      ...styles.bankContainer,
                      borderWidth: selectedBank == item?.id ? 1 : -1,
                      borderColor:
                      selectedBank == item?.id ? colors.black : 'transparent',
                    }}>
                    <Image
                      style={{width: scale(45), height: scale(45)}}
                      source={item?.icon}
                      // resizeMode="contain"
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <View
            style={{
              marginHorizontal: scale(20),
              backgroundColor: colors.white,
              borderRadius: scale(10),
              maxHeight: windowHeight / 2,
              paddingHorizontal: scale(15),
              paddingTop: verticalScale(15),
            }}>
            {renderTableHeader()}

            <FlatList
              data={discountTable}
              renderItem={renderItem}
                persistentScrollbar={true} // Keeps the scroll indicator visible

              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: scale(20),
            paddingBottom: verticalScale(30),
          }}>
          <CustomButton
            onPress={() => bottomSheetModalRef.current.present()}
            text="How to get discount"
            style={{marginTop: verticalScale(20)}}
          />
        </View>
      </ScreenLayout>

      <CustomBottomSheet
        snapPoints={snapPoints}
        bottomSheetModalRef={bottomSheetModalRef}>
        <DiscountSheetModal bottomSheetModalRef={bottomSheetModalRef} />
      </CustomBottomSheet>
    </>
  );
};

export default DiscountsScreen;

const styles = StyleSheet.create({
  dataRow: {
    flexDirection: 'row',
    paddingVertical: verticalScale(15),
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
  },
  tableHeader: {
    width: scale(63),
  },
  bankContainer: {
    backgroundColor: colors.white,
    borderRadius: scale(10),
    height: verticalScale(55),
    width: scale(65),
    paddingHorizontal: scale(20),

    alignItems: 'center',
    justifyContent: 'center',
  },
});
