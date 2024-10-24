import beastdao from './communities/beastdao.json';
import eth from './communities/eth.json';
import pom from './communities/pom.json';
import devcon from './communities/devcon.json';
// import your community file here : copy one above and change to your file name

export type Community = {
    community_name: string;
    pom_community_handle: string;
    description: string;
    website: string;
    main_social_platform: {
        platform_name: string;
        invite_link: string;
    };
    amount_of_members: string;
    people_behind: string;
    is_verified?: string;
    members_count?: string;
};

// List of imported community JSON files
export const communities: Community[] = [beastdao, eth, pom, devcon]; //add your community name here
