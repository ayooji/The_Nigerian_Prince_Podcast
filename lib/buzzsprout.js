import axios from "axios";

const apiToken = "1ccf65d07d794ad5d8c35ec1a728596c";
const podcastId = "1517026";

export async function getEpisodes(page = 1, perPage = 8) {
  try {
    const response = await axios.get(
      `https://www.buzzsprout.com/api/${podcastId}/episodes.json?per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: `Token token=${apiToken}`,
        },
      }
    );
  
    return response.data;
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return null;
  }
}

export async function getEpisodeById(id) {
  try {
    const response = await axios.get(
      `https://www.buzzsprout.com/api/${podcastId}/episodes/${id}.json`,
      {
        headers: {
          Authorization: `Token token=${apiToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Error fetching episode ${id}:`, error);
    return null;
  }
}
