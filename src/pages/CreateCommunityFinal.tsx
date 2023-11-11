import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommunityRegister from '../components/createCommunityComponents/CommunityRegister';
import { useNavigate } from 'react-router-dom';

const CreateCommunityFinal: React.FunctionComponent = () => {
const navigate = useNavigate();
const { searchValue } = useParams<{searchValue:string|undefined}>();
useEffect(() => {
    if (!searchValue) {
      navigate('/');
    }
  }, [searchValue, navigate]);

return (
    <div className="cc-content">
      <h1>Welcome to the CreateCommunityFinal Page</h1>
      <div className="cc-content-child">
        {searchValue && <CommunityRegister searchValue={searchValue} />}
      </div>
    </div>
  );
}

export default CreateCommunityFinal;
