import React, {useState} from 'react';
import {View, FlatList, Image} from 'react-native';
import ScreenLayout from '../../../components/ScreenLayout';
import CustomText from '../../../components/CustomText';
import {scale, verticalScale} from 'react-native-size-matters';
import TopHeader from '../../../components/TopHeader';
import NotificationCard from './NotificationCard';
import {font} from '../../../utils/font';
import { windowHeight, windowWidth } from '../../../utils/Dimensions';
import { images } from '../../../assets/images';
import { colors } from '../../../utils/colors';
const NotificationsScreen = ({navigation}: any) => {

  const [data,setData]=useState([])
  const notificationData = [
    {
      date: 'Yesterday',
      notifications: [
        {
          time: 'Just now',
          notificationDetail: 'Details',
          onPress: () => navigation.navigate('BookDetailScreen'),

          des: 'Rebecca upvoted your review on the book <The Book Thief>',
        },
        {
          time: '17 sec ago',
          notificationDetail: 'Track',
          onPress: () => navigation.navigate('TrackingScreen'),

          des: 'Your order123456 has been placed successfully, and will soon be shipped.',
        },
        {
          time: '3 hours ago',
          notificationDetail: 'Track',
          onPress: () => navigation.navigate('TrackingScreen'),

          des: 'Your order123456 has been shipped and will reach your doorstep in 3 days.',
        },
      ],
    },

    {
      date: 'Yesterday',
      notifications: [
        {
          time: '12:32 PM',
          notificationDetail: 'Order Now',
          onPress: () => navigation.navigate('BookDetailScreen'),

          des: 'Book you requested is available now. Click to View details and order.',
        },
        {
          time: '12:32 PM',
          notificationDetail: 'Order Now',
          onPress: () => navigation.navigate('BookDetailScreen'),

          des: 'Hurray! Get 10% discount on your next order. Valid till 12 . 12 . 2024.',
        },
      ],
    },

    {
      date: 'Mar 13',
      notifications: [
        {
          time: '12:32 PM',
          notificationDetail: 'Track',
          onPress: () => navigation.navigate('TrackingScreen'),

          des: 'Your order123456 has been placed successfully, and will soon be shipped.',
        },
        {
          time: '12:32 PM',
          notificationDetail: 'Track',
          onPress: () => navigation.navigate('TrackingScreen'),

          des: 'Your order123456 has been shipped and will reach your doorstep in 3 days.',
        },
        {
          time: '12:32 PM',
          notificationDetail: 'Details',
          des: 'Book you requested is available now. Click to View details and order.',
          onPress: () => navigation.navigate('BookDetailScreen'),
        },
        {
          time: '12:32 PM',
          notificationDetail: 'Order Now',
          des: 'Hurray! Get 10% discount on your next order. Valid till 12 . 12 . 2024.',
          onPress: () => navigation.navigate('BookDetailScreen'),
        },
      ],
    },
  ];
  return (
    <ScreenLayout
      style={{
        paddingHorizontal: scale(20),
      }}>
      <View style={{paddingBottom: verticalScale(10)}}>
        <TopHeader title="Notifications" />
      </View>
      <View style={{gap: verticalScale(8), flex: 1}}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          scrollEnabled={data?.length > 0 ? true : false}

          contentContainerStyle={{
            gap: verticalScale(20),
            paddingTop: verticalScale(10),
            paddingBottom: verticalScale(30),
          }}
          ListEmptyComponent={
            <View
              style={{
                height: windowHeight,
                alignItems: "center",
                 marginTop: verticalScale(60),

              }}
            >
              <Image
                style={{
                  width: windowWidth / 1.1,
                  height: windowHeight / 2.2,
                }}
                resizeMode="contain"
                source={images.empty_notification}
              />
              <CustomText
                text={"Nothing to see yet."}
                size={14}
                style={{ width: windowWidth / 1.5, textAlign: "center" }}
                fontWeight="500"
                color={colors.black}
              />
            </View>
          }
          renderItem={({item, index}:any) => {
            return (
              <View style={{gap: verticalScale(10)}}>
                <CustomText
                  text={item?.date}
                  fontWeight="600"
                  fontFam={font.WorkSans_SemiBold}
                  size={14}
                />

                {item.notifications.map(({it, index}:any) => {
                  return <NotificationCard key={index.toString()} data={it} />;
                })}
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScreenLayout>
  );
};
export default NotificationsScreen;
