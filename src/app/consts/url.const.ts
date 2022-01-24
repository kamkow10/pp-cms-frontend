export const BACKEND_URL = 'http://localhost:8080/api';
export const LOGIN_URL = BACKEND_URL + '/user/login';
export const REGISTER_URL = BACKEND_URL + '/user/register';
export const LOGOUT_URL = BACKEND_URL + '/user/logout';
export const FIND_USERS_URL = BACKEND_URL + '/user/find';
export const GET_USER_BY_ID_URL = BACKEND_URL + '/user/findbyid';
export const GET_USERS_URL = BACKEND_URL + '/user/getusers';
export const GET_TOP_USERS_URL = BACKEND_URL + '/user/find/topCommenter';
export const GET_USER_COMMENTS_URL = BACKEND_URL + '/comments/find/user';
export const GET_ARTICLES_URL = BACKEND_URL + '/articles';
export const GET_TOP_ARTICLE_URL = BACKEND_URL + '/articles/top';
export const SEARCH_ARTICLES_URL = BACKEND_URL + '/articles';
export const GET_ARTICLE_BY_ID_URL = BACKEND_URL + '/articles/get';
export const GET_ARTICLE_BY_COMMENT_ID_URL = BACKEND_URL + '/articles/findbycomment';
export const ADD_COMMENT_URL = BACKEND_URL + '/comments/add';
export const EDIT_COMMENT_URL = BACKEND_URL + '/comments/edit';
export const DELETE_COMMENT_URL = BACKEND_URL + '/comments/remove';
export const USER_EDIT_EMAIL_URL = BACKEND_URL + '/user/edit/mail';
export const USER_EDIT_PASSWORD_URL = BACKEND_URL + '/user/edit/password';
export const USER_EDIT_USERNAME_URL = BACKEND_URL + '/user/edit/username';
export const GET_TAGS_URL = BACKEND_URL + '/tag/language';
export const GET_LANGUAGES_URL = BACKEND_URL + '/languages';
export const GET_TRANSLATIONS_URL = BACKEND_URL + '/alerts';

export const GET_USER_ARTICLES = BACKEND_URL + '/articles/cms/findbyuser';
export const GET_ALL_ARTICLES = BACKEND_URL + '/articles/cms/findall';
export const CREATE_ARTICLE_URL = BACKEND_URL + '/articles/add';
export const EDIT_ARTICLE_URL = BACKEND_URL + '/articles/edit';
export const DELETE_ARTICLE_URL = BACKEND_URL + '/articles/delete';
