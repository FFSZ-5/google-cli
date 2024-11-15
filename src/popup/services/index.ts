import { ApiService } from "./apiService.ts";

//get user info
export const GetInfo = new ApiService("/user/getInfo");
//login
export const Login = new ApiService("/Login");
//get time stamp
export const GetLoginStamp = new ApiService("/GetLoginStamp");
