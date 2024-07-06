import config from "./config.js";
import { redirectToAuthCodeFlow, getAccessToken } from "./auth.js";

const clientId = config.CLIENT_ID;
const params = new URLSearchParams(window.location.search);
let code = params.get("code");
let tracks = new Object();
if (!code) {
  console.log("redirecting to auth code flow");
  redirectToAuthCodeFlow(clientId);
} else {
  console.log("going to get access token");
  const accessToken = await getAccessToken(clientId, code);
  const profile = await fetchProfile(accessToken);
  populateUI(profile);
  tracks = await getTracks(accessToken, "year:2023-2034");
  console.log("2023 tracks: ", tracks);
}

async function fetchProfile(code) {
  try {
    let result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${code}` },
    });

    if (!result.ok) {
      return JSON.parse(localStorage.getItem("profile"));
    }
    result = await result.json();
    localStorage.setItem("profile", JSON.stringify(result));
    return result;
  } catch (error) {
    console.log("spotify :: fetchProfile :: Error", error);
		return [];
  }
}

async function getTracks(code, queryString) {
  try {
    const params = new URLSearchParams();
    params.append("q", queryString);
    params.append("type", "track");
    params.append("market", "in");
    params.append("limit", "50");

    const url = `https://api.spotify.com/v1/search?${String(params)}`;

		console.log("search url: ", url);

    let result = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${code}`,
      },
    });

    if (!result.ok) {
      console.log("Spotify :: getTracks :: Error: Result is not okay");
      return null;
    }
    result = await result.json();
    return result;
  } catch (error) {
    console.log("Spotify :: getTracks :: Error ", error);
		return [];
  }
}

function populateUI(profile) {
  document.getElementById("displayName").innerText = profile.display_name;
  // document.getElementById("avatar").setAttribute("src", profile.images[0].url)
  // document.getElementById("id").innerText = profile.id;
  // document.getElementById("email").innerText = profile.email;
  // document.getElementById("uri").innerText = profile.uri;
  // // document
  // //   .getElementById("uri")
  // //   .setAttribute("href", profile.external_urls.spotify);
  // document.getElementById("url").innerText = profile.href;
  // document.getElementById("url").setAttribute("href", profile.href);
}
