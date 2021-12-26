export const BASE_URL = "/api/v1/";

export const AUTH_API = {
  LOGIN: `${BASE_URL}auth/login/`,
  REGISTER: `${BASE_URL}auth/register/`,
};

export const WORDS_API = {
  GET_WORDS: `${BASE_URL}words/`,
  ADD_WORD: `${BASE_URL}word/add`,
  DELETE_WORD: `${BASE_URL}word/:id`,
  GET_WORD_DETAILS: `${BASE_URL}word/`,
};
