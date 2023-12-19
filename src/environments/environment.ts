const API_BASE_URL_COUSTOMER = 'api/v1/customer';
const API_BASE_URL_APPOINTMENT = 'api/v1/appoinments';
const API_BASE_URL_AUTHENTICATION = 'api/v1/auth';
const API_BASE_URL_ADMIN = 'api/v1/admin';

export const environment = {
  ENVIRONMENTNAME: 'LOCAL',
  YEAR_VERSION: '2023',
  VERSION: '1.0.0',
  TAG_VERSION: 'ITE-2023-1.0.0',
  production: true,

  AUTENTICATION_URL: {
    CHEACK_EMAIL: {
      EMAIL: `${API_BASE_URL_AUTHENTICATION}/checkEmailIsPresent/`,
    },
    CHEACK_USERNAME: {
      USERNAME: `${API_BASE_URL_AUTHENTICATION}/checkUsernameIsPresent`,
    },
  },
  CUSTOMER_URL: {
    GET_ALL_CUSTOMER: `${API_BASE_URL_COUSTOMER}/getAllCustomer`,
  },
  APPOINMENT_URL: {
    GET_ALL_APPOINMENT: `${API_BASE_URL_APPOINTMENT}/getAllAppoinment/`,
    CANCEL_APPOINMENT: `${API_BASE_URL_APPOINTMENT}/cancelAppoinment`,
    SAVE_APPOINMENT: `${API_BASE_URL_APPOINTMENT}/saveOrderDetails`,
    UPDATE_ORDER_DETAILS: `${API_BASE_URL_APPOINTMENT}/updateOrderDetails`,
    GET_ALL_ORDERDETAILS: `${API_BASE_URL_APPOINTMENT}/getOrderDetails`,
    GET_DASHBOARD_DETAILS: `${API_BASE_URL_APPOINTMENT}/getDashboardDetails`,
  },
  ADMIN_URL: {
    NEW_USER_REGISTRATSION: `${API_BASE_URL_ADMIN}/newUserSave`,
    GET_ALL_USERS: `${API_BASE_URL_ADMIN}/getAllUsers`,
    DELETE_USER: `${API_BASE_URL_ADMIN}/deleteUser`,
  }
};
