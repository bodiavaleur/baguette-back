export const BASE_URL = "/api/v1/";

export const AUTH_API = {
  LOGIN: `${BASE_URL}auth/login/`,
  REGISTER: `${BASE_URL}auth/register/`,
};

export const WORDS_API = {
  ADD: `${BASE_URL}words/add/`,
  EDIT: `${BASE_URL}words/edit/`,
  DELETE: `${BASE_URL}words/delete/`,
  WORD_DETAILS: `${BASE_URL}words/`,
  UPLOAD_IMAGE: `${BASE_URL}words/image/`,
  GET_MY_WORDS: `${BASE_URL}words/my/`,
};

export const TRAINING_API = {
  FLASHCARD: `${BASE_URL}training/flashcard/`,
};

export const DICTIONARY_API = {
  GET_MY_DICTIONARIES: `${BASE_URL}dictionaries/my/`,
  CREATE: `${BASE_URL}dictionaries/create/`,
  EDIT: `${BASE_URL}dictionaries/edit/`,
  GET_BY_ID: `${BASE_URL}dictionaries/`,
  UPLOAD_IMAGE: `${BASE_URL}dictionaries/image/`,
  GET_STATS: `${BASE_URL}dictionaries/stats/`,
  GET_WORDS: `${BASE_URL}dictionaries/words/`,
};

export const WHITELIST_AUTH_ENDPOINTS = [AUTH_API.LOGIN, AUTH_API.REGISTER];
