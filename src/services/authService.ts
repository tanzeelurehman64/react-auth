import {
  CHECK_AUTH_URL,
  LOGOUT_URL,
  SIGNIN_URL,
  SIGNUP_URL,
} from 'appConstants';
import apiClient from './apiClient';

export const signin = async (credentials: {
  email: string;
  password: string;
}) => {
  return apiClient.post(SIGNIN_URL, credentials, { withCredentials: true });
};

export const signup = async (credentials: {
  email: string;
  password: string;
}) => {
  return apiClient.post(SIGNUP_URL, credentials);
};

export const getMe = async () => {
  return apiClient.get(CHECK_AUTH_URL, { withCredentials: true });
};

export const logout = async () => {
  return apiClient.post(LOGOUT_URL, { withCredentials: true });
};
