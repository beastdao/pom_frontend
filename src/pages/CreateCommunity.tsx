import React from 'react';
import CommunitySearch from '../components/createCommunityComponents/CommunitySearch';
import './../App.css';

const CreateCommunity: React.FunctionComponent = () => (
    <div className="cc-content">
        <h1>Enter the name of community you want to register</h1>
        <div className="cc-content-child">
            <CommunitySearch />
        </div>
    </div>
);

export default CreateCommunity;
