import axios from 'axios';
import { currentNetwork } from '../wagmiHooks/contractsAddresses';

interface Metadata {
  name: string;
  image: string;
}

interface MembershipCard {
  tokenAddress: string;
  tokenId: string;
  name: string;
  metadata: Metadata;
}

export async function FetchMembershipsDataAPI(userAddress : string | undefined): Promise<MembershipCard[] | null> {
  if (userAddress === undefined)  {
    console.log("Connect Wallet");
    return null;
  }
  const callUrl = `${process.env.REACT_APP_BACKEND_URL}/${currentNetwork}/memberships/${userAddress}`;
  try {

    const response = await axios(callUrl);

    if (response.status === 200) {
      const dataArray : MembershipCard[] = response.data;
      console.log(dataArray);
      return dataArray;
    } else {
      console.error("Failed to retrieve Membership cards.");
      return null;
    }
  } catch (error) {
    console.error("An error occurred while fetching data: ", error);
    return null;
  }
}
