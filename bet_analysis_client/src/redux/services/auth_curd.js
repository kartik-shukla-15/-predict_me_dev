import axios from "axios";

export const BASEURL = "http://127.0.0.1:8000/"
// export const BASEURL = "http://159.65.154.37:8000/"

export const REGISTER_URL = BASEURL.concat("user/register");
export const LOGIN_URL = BASEURL.concat("api/v1/login");
export const GET_USER_PROFILE_URL = BASEURL.concat("user/get-user-profile");
export const UPLOAD_FILE_URL = BASEURL.concat("bet-management/file-upload");
// export const GET_DOCTORS_URL = BASEURL.concat("user/get-doctors");
// export const ADD_TO_CONTACT_URL = BASEURL.concat("user/add-to-contact");



export function register(data) {
  return axios.post(REGISTER_URL, data);
}

export function login(username, password, user_type) {
  return axios.post(LOGIN_URL, {username: username, password:password, user_type:user_type});
}

export function getPrifile(access){
  return axios.get(GET_USER_PROFILE_URL, { headers: { Authorization: 'Bearer '.concat(access) } } )
}

export function analyzeData(data){
  return axios.post(UPLOAD_FILE_URL, data)
}

// export function getDoctors(access, data){
//   return axios.post(GET_DOCTORS_URL, data, { headers: { Authorization: 'Bearer '.concat(access) } } )
// }

// export function addContact(access, data){
//   return axios.post(ADD_TO_CONTACT_URL, data, { headers: { Authorization: 'Bearer '.concat(access) } } )
// }