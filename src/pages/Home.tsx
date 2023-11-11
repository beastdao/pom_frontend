import React from 'react';
import NameSearch from '../components/registerNameComponents/NameSearch';

import './../App.css';

const Home: React.FC = () => (

  <div className="home-content">
    <h1>Register your name in any community</h1>
    <div className="home-content-child">
      {/* Pass the handleInputChange function as a prop to the NameSearch component */}
      <NameSearch />
    </div>
  </div>
);

export default Home;
