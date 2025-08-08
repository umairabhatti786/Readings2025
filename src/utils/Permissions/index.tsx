import { useEffect, useState } from "react";
import { Platform, PermissionsAndroid, Linking } from "react-native";
import { PERMISSIONS, request, check } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";

import { useDispatch } from "react-redux";
import { CURRENT_POSITION, StorageServices } from "../StorageService";
import {
  setAuthAddress,
  setAuthCity,
  setAuthCountry,
  setAuthState,
  setUserLocation,
} from "../../redux/reducers/authReducer";
import Geocoder from "react-native-geocoding";
import { URLS } from "../../apis/Urls";

const usePermissions = () => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  const [isLocationPermission, setIsLocationPermission] = useState(true);
  const dispatch = useDispatch();

  const hasPermissionIOS = async () => {
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve(true);
        },
        async (error) => {
          console.log(error.message);

          resolve(false);
        },
        { enableHighAccuracy: false, timeout: 30000, maximumAge: 1000 }
      );
    });
  };
  const hasLocationPermission = async () => {
    if (Platform.OS === "ios") {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === "android" && Platform.Version < 23) {
      return true;
    }

    const status = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
    if (
      status[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
        PermissionsAndroid.RESULTS.GRANTED ||
      status[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true;
    }
    if (
      status[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
        PermissionsAndroid.RESULTS.DENIED ||
      status[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
        PermissionsAndroid.RESULTS.DENIED ||
      status[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
        PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
      status[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
        PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    ) {
      // StorageServices.setItem(LOCATIO_ACCESS, JSON.stringify(false));
      // dispatch(setLocationAccess(false))
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission: any = await hasLocationPermission();
    setIsLocationPermission(hasPermission);
    if (!hasPermission) {
      // StorageServices.setItem(LOCATIO_ACCESS, JSON.stringify(false));
      // dispatch(setLocationAccess(false))

      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const latitude = position?.coords?.latitude;
        const longitude = position?.coords?.longitude;
        const data = {
          latitude: latitude,
          longitude: longitude,
        };
        dispatch(setUserLocation(data));

        currentPosition(latitude, longitude);

        StorageServices.setItem(CURRENT_POSITION, JSON.stringify(data));
      },
      async (error) => {
        // StorageServices.setItem(LOCATIO_ACCESS, JSON.stringify(false));
        // dispatch(setLocationAccess(false))
        console.log(error);
      }
    );
  };

  const currentPosition = (lan: any, long: any) => {
    Geocoder.init(URLS.GOOGLE_MAP_KEY, { language: "en" });
    Geocoder.from(lan, long)
      .then(async (json) => {
        const addressComponents = json?.results[0].address_components;

        dispatch(setAuthAddress(json?.results[0].address_components[0]?.long_name+" "+json?.results[0].address_components[1]?.long_name+" "+json?.results[0].address_components[2]?.long_name));
        const cityComponent = addressComponents.find(component =>
          component.types.includes('locality')
        );
        dispatch(setAuthCity(cityComponent?.long_name));
      })
      .catch(async (error) => {
        console.warn(error);
      });
  };

  return {
    hasLocationPermission,
    isLocationPermission,
    getLocation,
  };
};

export { usePermissions };
