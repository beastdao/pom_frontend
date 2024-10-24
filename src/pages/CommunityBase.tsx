import React from 'react';
import CommunityTable from '../components/communityBaseComponents/communityTable';
const CommunityBase: React.FunctionComponent = () => (
    <div className="page-content">
        <h1>Welcome to the Community Base</h1>

        <div className="pc">
            <CommunityTable />
        </div>
    </div>
);

export default CommunityBase;
