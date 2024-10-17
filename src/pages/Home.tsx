import React, { useEffect } from 'react';
import NameSearch from '../components/registerNameComponents/NameSearch';
import { useParams } from 'react-router-dom';
import './../App.css';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const { defaultCommunity } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (defaultCommunity && !defaultCommunity.startsWith('@')) {
            navigate(`/@${defaultCommunity}`);
        }
    }, [defaultCommunity, navigate]);
    const communityValue = defaultCommunity ? defaultCommunity.replace(/^@/, '') : '';

    return (
        <div className="home-content">
            <h1>Get your free name in any community now!</h1>
            <div className="home-content-child">
                {/* Pass the handleInputChange function as a prop to the NameSearch component */}
                <NameSearch defaultCommunity={communityValue} />
            </div>
        </div>
    );
};
export default Home;
