const BASE_URL = 'http://ambitiouskyle.iptime.org:6389';

export const API = {
  LIST: `${BASE_URL}/products`,
  CART: `${BASE_URL}/orders/cart`,
  SIGN_IN: `${BASE_URL}/users/signin`,
  SIGN_UP: `${BASE_URL}/users/signup`,
  USERS_ME: `${BASE_URL}/users/me`,
  PURCHASE: `${BASE_URL}/orders/purchase`,
  ADDRESS: `${BASE_URL}/delivery/check`,
  SLIDE: `${BASE_URL}/categories`,
};
