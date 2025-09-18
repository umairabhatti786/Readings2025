import { getApiUrl, getApiUrl2 } from "../utils/CommonHooks";
import { URLS } from "./Urls";

export const ApiServices = {
  Register: async (data: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow",
    };
    try {
      fetch(getApiUrl(URLS.REGISTER), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  UserLogin: async (data: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow",
    };
    try {
      fetch(getApiUrl(URLS.LOGIN), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  BookRequest: async (data: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow",
    };
    try {
      fetch(getApiUrl(URLS.BOOK_REQUEST), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  ForgotPassswordEmail: async (data: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow",
    };
    try {
      fetch(getApiUrl(URLS.FORGOT_PASSWORD_EMAIL), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  PlaceOrder: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + params?.token);
    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: params?.data,
      redirect: "follow",
    };
    try {
      fetch(getApiUrl(URLS.PLACE_ORDER), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },


  PayWithCard: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + params?.token);
    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: params?.data,
      redirect: "follow",
    };
    try {
      fetch(getApiUrl(URLS.PAY_WITH_CARD), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  BuyNow: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + params?.token);
    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: params?.data,
      redirect: "follow",
    };
    console.log("params", params);
    try {
      fetch(getApiUrl(URLS.BUY_NOW), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  OrderConfirmation: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params?.token);
    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
  
    try {
      fetch(
        getApiUrl(URLS.ORDER_CONFIRMATION + `?orderId=${params?.id}`),
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  InitiateCheckout: async (token: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    let requestOptions: any = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      fetch(getApiUrl(URLS.INITIATE_CHECKOUT), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },
  ChangePassword: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + params.token);

    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: params.data,
      redirect: "follow",
    };
    try {
      fetch(getApiUrl(URLS.CHANGE_PASSWORD), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  EditProfile: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + params.token);

    let requestOptions: any = {
      method: "PUT",
      headers: myHeaders,
      body: params.data,
      redirect: "follow",
    };
    try {
      fetch(getApiUrl(URLS.PROFILE), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  AddToCartItem: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + params.token);

    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: params.data,
      redirect: "follow",
    };

    try {
      fetch(getApiUrl(URLS.Add_CART_ITEM), requestOptions)
        .then((response) => {
          return response.text().then((result) => {
            callback({
              isSuccess: true,
              response: result,
              guestToken: response.headers.get("x-guest-token") || null, // Corrected guest token retrieval
            });
          });
        })
        .catch((error) => {
          callback({ isSuccess: false, response: error });
        });
    } catch (error) {
      callback({
        isSuccess: false,
        response: error || "Something went wrong!",
      });
    }
  },

  UpdateCartItem: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + params.token);

    let requestOptions: any = {
      method: "PUT",
      headers: myHeaders,
      body: params.data,
      redirect: "follow",
    };
    try {
      fetch(getApiUrl(URLS.UPDATE_CART_ITEM + `/${params?.id}`), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  DeleteCartItem: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params?.token);

    let requestOptions: any = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      fetch(getApiUrl(URLS.DELETE_CART_ITEM + `/${params?.id}`), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  SaveAddress: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + params?.token);
    let url = params?.id
      ? getApiUrl(URLS.ADDRESSES + `/${params?.id}`)
      : getApiUrl(URLS.ADDRESSES);

    let requestOptions: any = {
      method: params?.id ? "PUT" : "POST",
      headers: myHeaders,
      body: params.data,
      redirect: "follow",
    };
    try {
      fetch(url, requestOptions)
        .then((response) => {
          return response.text().then((result) => {
            callback({
              isSuccess: true,
              response: result,
              guestToken: response.headers.get("x-guest-token") || null, // Corrected guest token retrieval
            });
          });
        })
        .catch((error) => {
          callback({ isSuccess: false, response: error });
        });
    } catch (error) {
      callback({
        isSuccess: false,
        response: error || "Something went wrong!",
      });
    }
  },

  SaveWishlist: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + params?.token);
    let url = getApiUrl(URLS.WISHLIST);

    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: params.data,
      redirect: "follow",
    };
    try {
      fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  CreatePaymentIntent: async (params: any, callback: any) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + params?.token);

    let url = getApiUrl(URLS.CREATE_PAYMENT_INTENT);

    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: params?.raw,
      redirect: "follow",
    };
    try {
      fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  RefundXPayPayment: async (params: any, callback: any) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + params?.token);

    let url = getApiUrl(URLS.REFUND_XPAYMENT);

    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: params?.raw,
      redirect: "follow",
    };
    try {
      fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  CaptureAuthorizedAmount: async (params: any, callback: any) => {
    const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-api-key", "xpay_pk_test_95c6197c399f6cb65919e5a992267e12a56f4e428d0c62e514048b54e9852ae7");
myHeaders.append("x-account-id", "81b7c9fa30726c4e");
myHeaders.append("x-signature",params?.signature);
myHeaders.append("Content-Type", "application/json");
    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: params?.raw,
      redirect: "follow",
    };
    try {
      fetch(URLS.CAPTURE_AUTHORIZED_AMOUNT+`?pi_client_secret=${params?.pi_client_secret}`, requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  GetWishlist: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params?.token);
    let url = getApiUrl(URLS.WISHLIST);
    let requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  GetGuestToken: async (callback: any) => {
    let url = getApiUrl(URLS.GUEST_TOKEN);
    const raw = "";

    let requestOptions: any = {
      method: "GET",
      body: raw,
      redirect: "follow",
    };
    console.log("url", url);
    try {
      fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  GetOrderCart: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params?.token);
    let url = getApiUrl(URLS.GET_ORDER_CART);
    let requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  GetOrder: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params?.token);
    let url = getApiUrl(URLS.ORDER);
    console.log("Orfknf", params?.token);
    let requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  GetDaewooOrder: async (params: any, callback: any) => {
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", "Bearer " + params?.token);

    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    try {
      fetch(URLS.DAEWOO_ORDER+`?ConsignmentId=${params?.id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  GetPotexOrder: async (params: any, callback: any) => {
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", "Bearer " + params?.token);

    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    try {
      fetch(URLS.POSTEX_ORDER+`/${params?.id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  CancelOrder: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params?.token);
    let url = getApiUrl(`${URLS.ORDER}/${params?.id}/cancel-order`);
    console.log("Orfknf", params?.token);
    let requestOptions: any = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  GetCardDicount: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params?.token);
    let url = getApiUrl(`${URLS.GET_CARD_DISCOUNT}?bin=${params?.bin}&last4digits=${params?.last4digits}`);
    let requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    
    console.log("UralBin",url)
    try {
      fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },


  DeleteWishlist: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + params?.token);

    let requestOptions: any = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      fetch(getApiUrl(URLS.WISHLIST + `/${params?.id}`), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  DeletePaymentcard: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + params?.token);

    let requestOptions: any = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      fetch(getApiUrl(URLS.DELETE_PAYMENT_METHOD + `/${params?.id}`), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  CheckEmailExist: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + params?.token);

    const raw = "";

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};


 
    try {
      fetch(getApiUrl(URLS.CHECK_EMAIL_EXIST + `?email=${params?.email}`), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },
  AddBookReview: async (params: any, callback: any) => {
    console.log("params", params);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + params?.token);
    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: params.data,
      redirect: "follow",
    };
    // ?book_id=
    // + `?book_id=${params?.id}`
    try {
      fetch(getApiUrl2(URLS.BOOK_REVIEW), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  GetBookReview: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params?.token);
    let requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    // ?book_id=
    // + `?book_id=${params?.id}`
    try {
      fetch(
        getApiUrl2(URLS.BOOK_REVIEW + `?book_id=${params?.id}`),
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  GetPaymentMethod: async (param: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + param?.token);
    let requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    // ?book_id=
    // + `?book_id=${params?.id}`
    let url=param?.isGuest?getApiUrl(URLS.GET_PAYMENT_METHOD+`?email=${param?.email}`):getApiUrl(URLS.GET_PAYMENT_METHOD)
    console.log("urlData",url)
    try {
      fetch(
        url,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  ConvertBookPrice: async (id: any, callback: any) => {
    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer " + params?.token);
    let requestOptions: any = {
      method: "GET",
      redirect: "follow",
    };
    // ?book_id=
    // + `?book_id=${params?.id}`
    try {
      fetch(getApiUrl2(URLS.CONVERT_PRICE + `/${id}`), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  GetAddress: async (token: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    let requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      fetch(getApiUrl(URLS.ADDRESSES), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  GetProfile: async (token: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    let requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      fetch(getApiUrl(URLS.PROFILE), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  DeleteAccount: async (token: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      fetch(getApiUrl(URLS.DELETE_ACCOUNT), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },
  GetHighDiscountCategories: async (callback: any) => {
    let requestOptions: any = {
      method: "GET",
      redirect: "follow",
    };
    try {
      fetch(getApiUrl(URLS.HIGH_DISCOUNT_CATEGORIES), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },
  GetHome: async (token: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    let requestOptions: any = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    try {
      fetch(getApiUrl(URLS.HOME), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  GetRecentOrderHistory: async (token: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    let requestOptions: any = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    try {
      fetch(getApiUrl(URLS.RECENT_ORDER_HISTORY), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  GetBookDetail: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params?.token);
    let requestOptions: any = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    try {
      fetch(getApiUrl(URLS.BOOK_DETAIL + `/${params?.id}`), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  DeleteAddresses: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.token);
    let requestOptions: any = {
      method: "DELETE",
      headers: myHeaders,

      redirect: "follow",
    };

    try {
      fetch(getApiUrl(URLS.ADDRESSES + `/${params?.id}`), requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  BookCategorySearch: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.token);
    let requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      fetch(
        getApiUrl(
          URLS.BOOK_SEARCH +
            `?keyword=${params.search}&page=${params.page}&isbn`
        ),
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  BookSearchCategoryId: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.token);
    let requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      fetch(
        getApiUrl(
          URLS.BOOK_SEARCH +
            `?keyword=${params.search}&categoryId=${params?.categoryId}page=${params.page}`
        ),
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },


  BookSearchLevel1: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.token);
    let requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      fetch(
        getApiUrl(
          URLS.BOOK_SEARCH +
            `?keyword=${params.search}&level1=${params?.categoryId}page=${params.page}`
        ),
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  BookSearch: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.token);

    let requestOptions: any = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    try {
      fetch(
        getApiUrl(
          URLS.BOOK_SEARCH + `?keyword=${params.search}&page=${params.page}`
        ),
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  BookByCategory: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.token);
    let requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const url = params.isStationery
      ? getApiUrl(
          URLS.BOOK_BY_CATEGORY_FOUR +
            `/${params.id}/A/${params?.sort}?page=${params.page}`
        )
      : getApiUrl(
          URLS.BOOK_BY_CATEGORY +
            `/${params.id}/A/${params?.sort}?page=${params.page}`
        );

    try {
      fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  ViewAllBook: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.token);
    let requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      fetch(
        getApiUrl(`/api` + params?.url + `?page=${params.page}`),
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  BookByStationeryAndArt: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.token);
    let requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      fetch(
        getApiUrl(
          URLS.BOOK_BY_SUB_CATEGORY +
            `/${params.id}/A/${params?.sort}?page=${params.page}`
        ),
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  HighDiscountBooks: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.token);
    let requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    console.log(
      "Urjbv",
      getApiUrl(
        URLS.High_DISCOUNT +
          `/${params?.id}/${params?.sort}?page=${params.page}`
      )
    );

    try {
      fetch(
        getApiUrl(
          URLS.High_DISCOUNT +
            `/${params?.id}/${params?.sort}?page=${params.page}`
        ),
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },

  GetAdvanceSearch: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.token);

    let requestOptions: any = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    try {
      fetch(
        getApiUrl(
          URLS.ADVANCE_SEARCH +
            `?title=${params?.title}&author=${params?.author}&isbn=${params?.isbn}&category=${params?.category}&publisher=${params?.publisher}&publication_year=${params?.publication_year}&Book_Language=${params?.Book_Language}&PAK_PRICE=${params?.PAK_PRICE}&keyword=${params?.keyword}&Bind_IND=${params?.Bind_IND}&page=${params?.page}`
        ),
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },
  BookBySubCategory: async (params: any, callback: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.token);

    let requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let url = params?.highDiscountParam
      ? getApiUrl(
          URLS.BOOK_BY_SUB_CATEGORY +
            `/${params.id}/HD/${params?.sort}?page=${params.page}`
        )
      : params.isStationery
      ? getApiUrl(
          URLS.BOOK_BY_CATEGORY_FOUR +
            `/${params.id}/A/${params?.sort}?page=${params.page}`
        )
      : getApiUrl(
          URLS.BOOK_BY_CATEGORY_FOUR +
            `/${params.id}/A/${params?.sort}?page=${params.page}`
        );

    try {
      fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      return { isSuccess: false, error: error };
    }
  },
};
