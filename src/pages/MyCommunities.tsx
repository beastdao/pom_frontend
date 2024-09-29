import React from 'react';
import MyCommunitiesSearch from '../components/manageCommunityComponents/MyCommunitiesSearch';

const MyCommunities: React.FunctionComponent = () => (
    <div className="cm-content">
        <h1>Enter the name of community you want to manage</h1>
        <div className="cm-content-child">
            <MyCommunitiesSearch />
        </div>
    </div>
);

export default MyCommunities;
