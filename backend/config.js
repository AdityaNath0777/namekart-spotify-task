import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
} from "./secrets.js";

const config = {
  CLIENT_ID: String(SPOTIFY_CLIENT_ID),
  CLIENT_SECRET: String(SPOTIFY_CLIENT_SECRET),
  REDIRECT_URI: String(SPOTIFY_REDIRECT_URI),
};

export default config;
