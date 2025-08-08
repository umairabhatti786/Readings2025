import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  FlatList,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { scale, verticalScale } from "react-native-size-matters";
import CustomText from "../../../components/CustomText";
import CustomButton from "../../../components/CustomButton";
import { colors } from "../../../utils/colors";
import { font } from "../../../utils/font";
import { images } from "../../../assets/images";
import Carousel from "react-native-reanimated-carousel";

const { width: windowWidth } = Dimensions.get("window");

const slides = [
  {
    key: "1",
    title: "Grand Sale",
    text: "40% OFF on entire literature collection",
    image: {
      uri: "https://readings-storage.s3.ap-south-1.amazonaws.com/images/1.webp",
    },
  },
  {
    key: "2",
    title: "Big Discounts",
    text: "Grab your favorite books now!",
    image: {
      uri: "https://readings-storage.s3.ap-south-1.amazonaws.com/images/2.webp",
    },
  },
  {
    key: "3",
    title: "Literature Collection",
    text: "Special deal on all items!",
    image: {
      uri: "https://readings-storage.s3.ap-south-1.amazonaws.com/images/3.webp",
    },
  },
];

const DiscountBooks = () => {
  const AUTO_SCROLL_INTERVAL = 3000; // 3 seconds

  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, [currentIndex]);
  const renderItem = ({ item, index }: any) => {
    return (
      <ImageBackground
        source={item.image}
        style={styles.slide}
        imageStyle={{ borderRadius: scale(8) }}
      >
        <View
          style={{
            padding: scale(10),
            gap: verticalScale(5),
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        ></View>
        {/* {activeIndex > 0 && (
          <TouchableOpacity
            onPress={() => {
              sliderRef?.goToSlide(activeIndex - 1, true);
              setActiveIndex(index - 1);
            }}
            activeOpacity={0.5}
            style={{ ...styles.backCircle, left: scale(10) }}
          >
            <Image
              style={{ width: "60%", height: "60%", tintColor: colors.white }}
              resizeMode="contain"
              source={images.left_arrow}
            />
          </TouchableOpacity>
        )}
        {slides.length - 1 !== activeIndex && (
          <TouchableOpacity
            onPress={() => {
              sliderRef?.goToSlide(activeIndex + 1, true);
              setActiveIndex(index + 1);
            }}
            activeOpacity={0.5}
            style={{ ...styles.backCircle, right: scale(50) }}
          >
            <Image
              style={{ width: "60%", height: "60%", tintColor: colors.white }}
              resizeMode="contain"
              source={images.right_arrow}
            />
          </TouchableOpacity>
        )} */}

        {/* <View style={styles.content}>
          <View style={styles.textBox}>
            <CustomText
              text={item.title}
              color={colors.white}
              fontWeight="600"
              fontFam={font.WorkSans_SemiBold}
              size={19}
            />
            <CustomText
              text={item.text}
              lineHeight={20}
              numberOfLines={3}
              color={colors.white}
              size={14}
            />
          </View>

          <CustomButton
            width={scale(95)}
            borderRadius={6}
            height={27}
            text={'Pre-Order'}
            bgColor={colors.white}
            textColor={colors.orange}
          />
        </View> */}
      </ImageBackground>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        scrollEnabled={false} // 👈 Disable finger scroll
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / windowWidth);
          setCurrentIndex(index);
        }}
      />

      {/* <Carousel
        width={windowWidth}
        height={verticalScale(110)}
        data={slides}
        ref={carouselRef}
        loop
        autoPlay={true}
        autoPlayInterval={4000}
        scrollAnimationDuration={1000}
        panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}

        mode="parallax"
        modeConfig={{ parallaxScrollingScale: 1, parallaxScrollingOffset: 0 }}
        renderItem={renderItem}

      /> */}
      {/* <AppIntroSlider
        renderItem={renderItem}
        data={slides}
      
        showNextButton={false}
        showDoneButton={false}
        onSlideChange={onSlideChange}
        ref={(ref) => (sliderRef = ref)}
        dotStyle={{ backgroundColor: "transparent" }}
        activeDotStyle={{ backgroundColor: "transparent" }}
        bottomButton
      /> */}
    </View>
  );
};

export default DiscountBooks;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: scale(8),
    overflow: "hidden",
  },
  slide: {
    width: windowWidth,
    height: verticalScale(110),
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: scale(10),
    flex: 1,
  },
  textBox: {
    width: windowWidth / 2,
    paddingHorizontal: scale(10),
    justifyContent: "center",
    gap: verticalScale(5),
  },
  backCircle: {
    width: scale(30),
    height: scale(30),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF53",
    alignSelf: "center",
    borderRadius: 999,
    position: "absolute",

    top: "40%",
  },
});
