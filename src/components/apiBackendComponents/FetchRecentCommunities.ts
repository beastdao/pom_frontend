import axios from 'axios';

export interface Community {
  tx_hash: string;
  timestamp: string;
  community: string;
  admin: string;
}

export async function FetchRecentCommunities(): Promise<Community[] | null> {
  const callUrl = `${process.env.REACT_APP_BACKEND_URL_COMMUNITIES}`;
  try {
    const response = await axios(callUrl);
    if (response.status === 200) {
      const communities = response.data.map((item:Community) => item.community);
      console.log(communities);
      return communities;
    } else {
      console.error("Failed to retrieve Membership cards.");
      return null;
    }
  } catch (error) {
    console.error("An error occurred while fetching data: ", error);
    return null;
  }
}
