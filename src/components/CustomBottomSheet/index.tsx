import { SafeAreaView, View } from "react-native";
import React, { useMemo, useCallback } from "react";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { colors } from "../../utils/colors";

const CustomBottomSheet = (props: any) => {
  const {
    bottomSheetModalRef,
    snapTo,
    onDismiss,
    children,
    snap,
    handleSheetChanges,
    backgroundColor,
    snapPoints,
    onBackDrop,
    enableContentPanningGesture,
    enableDismissOnClose,
    enableHandlePanningGesture,
    idDisableDrop
  } = props;

  // const snapPoints = useMemo(() => ["55%", "55%"], []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (onBackDrop) {
          onBackDrop(); // Make sure onBackDrop is defined before calling it
        }

        bottomSheetModalRef.current?.close();
      };
    }, [])
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      enableContentPanningGesture={enableHandlePanningGesture} // Disable gesture-based closing
      enableHandlePanningGesture={enableHandlePanningGesture} // Disable handle gesture closing
      // enableDismissOnClose={enableDismissOnClose} // Prevent backdrop tap closing
      backdropComponent={(props) => (
        <Backdrop {...props} bottomSheetModalRef={bottomSheetModalRef} idDisableDrop={idDisableDrop} />
      )}
      snapPoints={snapPoints}
      index={0}
      onDismiss={props?.onDismiss}
      backgroundStyle={{
        borderTopLeftRadius: 25,  // Top left radius
        borderTopRightRadius: 25, // Top right radius
        backgroundColor:backgroundColor ||colors.white

      }}
    >
      <BottomSheetScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View style={{ paddingBottom: 30 }}>{children}</View>
        </SafeAreaView>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

const Backdrop = ({ animatedIndex, bottomSheetModalRef, style,idDisableDrop }: any) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [1, 1],
      [1, 1],
      Extrapolate.CLAMP
    ),
  }));

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "rgba(0,0,0,0.2)",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return (
    <Animated.View
      onTouchStart={() =>  !idDisableDrop&& bottomSheetModalRef.current?.close()}
      style={containerStyle}
    />
  );
};
export default CustomBottomSheet;
