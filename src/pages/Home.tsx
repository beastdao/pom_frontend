import React from 'react';
import NameSearch from '../components/registerNameComponents/NameSearch';

import './../App.css';

const Home: React.FC = () => (

  <div className="home-content">
    <h1>Get your free name in any community now!</h1>
    <div className="home-content-child">
      {/* Pass the handleInputChange function as a prop to the NameSearch component */}
      <NameSearch />
    </div>
  </div>
);

export default Home;
