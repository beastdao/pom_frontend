import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileComponent from '../components/myMembershipsComponents/ProfileComponent';

const Profile: React.FC = () => {
    const { nameAtCommunity } = useParams();
    const name = nameAtCommunity ?? '';
    return (
        <div className="page-content">
            <h1>
                {' '}
                <b> {nameAtCommunity} </b>{' '}
            </h1>
            <div className="pc">
                <ProfileComponent nameAtCommunity={name} />
            </div>
        </div>
    );
};

export default Profile;
