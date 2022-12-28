import axios from "axios";

const BASE_URL = "https://api.deezer.com/search";
const ARTIST_URL = `${BASE_URL}/artist`;
const TRACK_URL = `${BASE_URL}/track`;

export async function searchArtists(query) {
  try {
    const response = await axios.get(ARTIST_URL, {
      params: {
        q: query,
      },
    });
    const responseData = response.data;
    const artists = responseData.data;
    return artists;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function getArtistTracks(artist) {
  try {
    const response = await axios.get(TRACK_URL, {
      params: {
        q: artist.name,
        index: 10,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
}
