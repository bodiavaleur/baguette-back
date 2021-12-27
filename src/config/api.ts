export const BASE_URL = "/api/v1/";

export const AUTH_API = {
  LOGIN: `${BASE_URL}auth/login/`,
  REGISTER: `${BASE_URL}auth/register/`,
};

export const WORDS_API = {
  GET_WORDS: `${BASE_URL}words/`,
  ADD_WORD: `${BASE_URL}word/add/`,
  DELETE_WORD: `${BASE_URL}word/:id`,
  GET_WORD_DETAILS: `${BASE_URL}word/`,
  USER_WORDS: `${BASE_URL}words/user/`,
};

export const DICTIONARY_API = {
  USER_DICTIONARY: `${BASE_URL}dictionary/user/`,
};

export const WHITELIST_AUTH_ENDPOINTS = [AUTH_API.LOGIN, AUTH_API.REGISTER];
