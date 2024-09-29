import React from 'react';
import { useParams } from 'react-router-dom';
import NameRegister from '../components/registerNameComponents/NameRegister';

const RegisterNameFinal: React.FunctionComponent = () => {
    const { nameAtCommunity } = useParams<{ nameAtCommunity: string | undefined }>();
    return (
        <div className="home-content">
            <h1>Finalise your chosen name registration</h1>
            <div className="home-content-child">
                {nameAtCommunity && <NameRegister nameAtCommunity={nameAtCommunity} />}
            </div>
        </div>
    );
};
export default RegisterNameFinal;
