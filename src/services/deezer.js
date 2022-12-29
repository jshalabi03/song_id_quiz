import axios from "axios";

const BASE_URL = "https://api.deezer.com/";
const SEARCH_ARTIST_URL = `${BASE_URL}/search/artist`;
const ARTIST_TRACKS_URL = `${BASE_URL}/artist/`;

export async function searchArtists(query) {
  try {
    const response = await axios.get(SEARCH_ARTIST_URL, {
      params: {
        q: query,
        limit: 15,
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
    const response = await axios.get(`${ARTIST_TRACKS_URL}${artist.id}/top`, {
      params: {
        limit: 50,
      },
    });
    const responseData = response.data;
    const tracks = responseData.data;
    return tracks;
  } catch (error) {
    console.log("error: ", error);
  }
}
