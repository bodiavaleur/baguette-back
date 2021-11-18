export const BASE_URL = "/api/v1/";

export const AUTH_API = {
  LOGIN: `${BASE_URL}auth/login/`,
  REGISTER: `${BASE_URL}auth/register/`,
};

export const DICTIONARY_API = {
  GET_WORDS: `${BASE_URL}dictionary/`,
  ADD_WORD: `${BASE_URL}dictionary/add`,
  DELETE_WORD: `${BASE_URL}dictionary/:id`,
  GET_WORD_DETAILS: `${BASE_URL}dictionary/:id`,
};
