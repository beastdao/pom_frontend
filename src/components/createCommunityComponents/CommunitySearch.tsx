import React from 'react';
import CommunitiesSearchBasic from '../basicCommunitySearchComponent/CommunitiesSearchBasic';

const CommunitySearch: React.FC = () => {
    return (
        <CommunitiesSearchBasic
            comparisonData="0x0000000000000000000000000000000000000000"
            feedBackTextValid="Community is available!"
            feedbackTextInvalid="Community is already Registred!"
            routePath="CreateCommunityFinal"
        />
    );
};

export default CommunitySearch;
