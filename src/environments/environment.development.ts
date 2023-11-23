const API_BASE_URL_COUSTOMER = 'api/v1/customer';
const API_BASE_URL_APPOINTMENT = 'api/v1/appoinments';
const API_BASE_URL_AUTHENTICATION = 'api/v1/auth';
export const environment = {
  ENVIRONMENTNAME: 'DEV',
  YEAR_VERSION: '2023',
  VERSION: '1.0.0',
  TAG_VERSION: 'ITE-2023-1.0.0',
  production: false,

  AUTENTICATION_URL: {
    CHEACK_EMAIL: {
      EMAIL: `${API_BASE_URL_AUTHENTICATION}/checkEmailIsPresent/`,
    },
  },
  CUSTOMER_URL: {
    GET_ALL_CUSTOMER: `${API_BASE_URL_COUSTOMER}/getAllCustomer`,
  },
  APPOINMENT_URL: {
    GET_ALL_APPOINMENT: `${API_BASE_URL_APPOINTMENT}/getAllAppoinment/`,
    CANCEL_APPOINMENT: `${API_BASE_URL_APPOINTMENT}/cancelAppoinment`,
  },
};
