import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


export interface LocationState {
  latitude:number,
  longitude:number,

}
export interface AuthState {
  isLogin: boolean;
  user: any;
  authToken: any;
  guestToken: string;
  isAddToCart:boolean
  isCartLoading:boolean
  buyNowEmail:string
  GuestUserEmail:string,
  selectedViewAll:""
  search:string,
  selectedCategry:any,
  selectedSubcategory:any,
  subCategories:[]
  authAddress:any
  authCity:any,
  authState:any,
  authCountry:any
  isHighDiscount:boolean
  isBuyNowSheet:boolean
  billingAddress:object
  authLatestAddress:object


  userLocation: LocationState;

}
export const initialState: AuthState = {
  isBuyNowSheet:false,
  buyNowEmail:"",
  GuestUserEmail:"",
  billingAddress:{},
  authLatestAddress:{},
  isLogin: false,
  isCartLoading:true,
  selectedViewAll:"",
  isAddToCart:false,
  isHighDiscount:false,
  user: {},
  subCategories:[],
  selectedCategry:"",
  selectedSubcategory:"",
  authAddress:"",
  authCity:"",
  authState:"",
  authCountry:"",
  
  authToken:null,
  guestToken:"",
  search:"",
  userLocation: {
    latitude:0,
    longitude:0,

  },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserLogin: (state, { payload }: PayloadAction<any>) => {
      state.isLogin = payload;
    },
    setSelectedViewAll: (state, { payload }: PayloadAction<any>) => {
      state.selectedViewAll = payload;
    },
    setAuthBillingAddress: (state, { payload }: PayloadAction<any>) => {
      state.billingAddress = payload;
    },

    setAuthlatestAddress: (state, { payload }: PayloadAction<any>) => {
      state.authLatestAddress = payload;
    },
    setGuestUserEmail: (state, { payload }: PayloadAction<any>) => {
      state.GuestUserEmail = payload;
    },
    setBuyNowEmail: (state, { payload }: PayloadAction<any>) => {
      state.buyNowEmail = payload;
    },
    
    setIsAddCartLoading: (state, { payload }: PayloadAction<any>) => {
      state.isCartLoading = payload;
    },
    setIsAddToCart: (state, { payload }: PayloadAction<any>) => {
      state.isAddToCart = payload;
    },
    setAuthData: (state, { payload }: PayloadAction<any>) => {
      state.user = payload;
    },
    setAuthToken: (state, { payload }: PayloadAction<any>) => {
      state.authToken = payload;
    },
    setGuestToken: (state, { payload }: PayloadAction<any>) => {
      state.guestToken = payload;
    },
    setAuthSearch: (state, { payload }: PayloadAction<any>) => {
      state.search = payload;
    },
    setCategory: (state, { payload }: PayloadAction<any>) => {
      state.selectedCategry = payload;
    },
    setSubCategory: (state, { payload }: PayloadAction<any>) => {
      state.selectedSubcategory = payload;
    },
    setSubCategories: (state, { payload }: PayloadAction<any>) => {
      state.subCategories = payload;
    },

    setAuthAddress: (state, { payload }: PayloadAction<any>) => {
      state.authAddress = payload;
    },
    setAuthCity: (state, { payload }: PayloadAction<any>) => {
      state.authCity = payload;
    },
    setAuthState: (state, { payload }: PayloadAction<any>) => {
      state.authState = payload;
    },
    setAuthCountry: (state, { payload }: PayloadAction<any>) => {
      state.authCountry = payload;
    },
    setUserLocation: (state, { payload }: PayloadAction<any>) => {
      state.userLocation = payload;
    },
    setIsHighDiscount: (state, { payload }: PayloadAction<any>) => {
      state.isHighDiscount = payload;
    },
    setIsBuyNow: (state, { payload }: PayloadAction<any>) => {
      state.isBuyNowSheet = payload;
    }
  },
});

export const { setUserLogin, setAuthToken, setAuthData,setAuthSearch,setCategory,setSubCategory,setUserLocation,setAuthAddress,setAuthCountry,setAuthState,setAuthCity,setIsHighDiscount,setSubCategories,setIsBuyNow,setGuestToken,setIsAddToCart,setSelectedViewAll,setIsAddCartLoading,setBuyNowEmail,setAuthlatestAddress,setAuthBillingAddress,setGuestUserEmail } = authSlice.actions;
export default authSlice.reducer;
export const getSubCategorories = (state: RootState) => state?.auth.subCategories;
export const getSelectedViewAll = (state: RootState) => state?.auth.selectedViewAll;
export const getIsCartLoading = (state: RootState) => state?.auth.isCartLoading;
export const getBuyNowEmail = (state: RootState) => state?.auth.buyNowEmail;
export const getIsAddToCart = (state: RootState) => state?.auth.isAddToCart;
export const getUserData = (state: RootState) => state?.auth.isLogin;
export const getAuthData = (state: RootState) => state?.auth.user;
export const getAuthSearch = (state: RootState) => state?.auth.search;
export const getIsBuyNowEnable = (state: RootState) => state?.auth.isBuyNowSheet;
export const getAuthSelectCategory = (state: RootState) => state?.auth.selectedCategry;
export const getAuthSelectSubCategory = (state: RootState) => state?.auth.selectedSubcategory;
export const getToken = (state: RootState) => state?.auth.authToken;
export const getUserLocation = (state: RootState) => state?.auth.userLocation;
export const getGuestUserEmail = (state: RootState) => state?.auth.GuestUserEmail;
export const getAuthAddress = (state: RootState) => state?.auth.authAddress;
export const getAuthCity = (state: RootState) => state?.auth.authCity;
export const getAuthCountry = (state: RootState) => state?.auth.authCountry;
export const getAuthState = (state: RootState) => state?.auth.authState;
export const getIsHighDiscount = (state: RootState) => state?.auth.isHighDiscount;

export const getAuthLatestAddress = (state: RootState) => state?.auth.authLatestAddress;
export const getAuthBillingAddress = (state: RootState) => state?.auth.billingAddress;

export const getGuestToken = (state: RootState) => state?.auth.guestToken;
