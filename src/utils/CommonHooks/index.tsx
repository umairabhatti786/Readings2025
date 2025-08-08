import { Alert, Platform, StatusBar } from "react-native";
import { URLS } from "../../apis/Urls";
import { StorageServices, TOKEN } from "../StorageService";
import { setAuthData, setAuthToken } from "../../redux/reducers/authReducer";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { colors } from "../colors";

export const getApiUrl = (endpoint: any) => {
  let url = URLS.BASE_URL + endpoint;
  return url;
};

export const getApiUrl2 = (endpoint: any) => {
  let url = URLS.BASE_URL2 + endpoint;
  return url;
};

export const getOrderStatusText = (
  status: number
): { title: string; color: string } => {
  switch (status) {
    case 1:
      return { title: "Order Received", color: colors.orange };
    case 2:
      return { title: "In Process", color: colors.primary };
    case 3:
      return { title: "Ready for Dispatch", color: colors.primary };
    case 4:
      return { title: "Dispatched", color: colors.primary };
    case 5:
      return { title: "Cancelled", color: colors.red };
    case 6:
      return { title: "Delivered", color: colors.primary };
    case 7:
      return { title: "Sent to the Publisher", color: colors.primary };
    case 8:
      return { title: "Awaiting Shipment", color: colors.primary };
    default:
      return { title: "Unknown Status", color: colors.primary };
  }
};
export const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 40;

export const getFormattedPhoneNumber = (phone: any) => {
  if (!phone) return null; // Return null if phone is undefined or null
  if (!isValidPhoneNumber(phone)) {
    console.log("Invalid phone number:", phone);
    return null; // Return null for invalid numbers
  }

  const parsedPhone = parsePhoneNumber(phone);
  return parsedPhone; // Format as needed
};

export const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: any) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement?.height + contentOffset?.y >=
    contentSize?.height - paddingToBottom
  );
};

export const extractTypeAndId = (url: string): { type: string; id: string } => {
  let id: string = "";
  let type: string = "";

  // Regex pattern to match the book URL and capture the ID
  const bookPattern = /^readings:\/\/book\/(\d+)$/;

  const match = url.match(bookPattern);
  if (match) {
    type = "book";
    id = match[1]; // Extract the ID from the URL
  } else {
    console.error("Invalid URL format");
  }

  return { type, id };
};

export const sessionCheck = async (dispatch: any, navigation: any) => {
  Alert.alert(
    "Session Expired",
    "Your session has expired. Please login again.",
    [
      {
        text: "OK",
        onPress: async () => {
          dispatch(setAuthData(null));
          dispatch(setAuthToken(null));
          StorageServices.removeItem(TOKEN);
          navigation.navigate("Login");
        },
      },
    ]
  );
};
