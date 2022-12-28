import { APP_ID } from "./appid";
const BASE_URL = "https://connect.deezer.com/oauth/auth.php";
const REDIRECT_URI = "http://localhost:3000";
const PERMS = "basic_access";
const RESPONSE_TYPE = "token";

const params = new URLSearchParams();
params.append("app_id", APP_ID);
params.append("redirect_uri", REDIRECT_URI);
params.append("perms", PERMS);
params.append("response_type", RESPONSE_TYPE);

export const AUTH_URL = `${BASE_URL}?${params.toString()}`;
