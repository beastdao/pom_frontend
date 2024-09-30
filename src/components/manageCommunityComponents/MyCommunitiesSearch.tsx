import React from 'react';
import CommunitiesSearchBasic from '../basicCommunitySearchComponent/CommunitiesSearchBasic';
import { useAccount } from 'wagmi';

const MyCommunitiesSearch: React.FC = () => {
    const { address } = useAccount();

    return (
        <CommunitiesSearchBasic
            comparisonData={address}
            feedBackTextValid="You are Admin"
            feedbackTextInvalid="You are not admin"
            routePath="ManageCommunityFinal"
        />
    );
};

export default MyCommunitiesSearch;
