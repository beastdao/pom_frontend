import React from 'react';

const About: React.FunctionComponent = () => (

  <div className="page-content">
    <h1>Welcome to the About Page</h1>
    <a href={`https://pom.cards/`} target="_blank">Learn more about PoM here</a>
    <br></br>
    <b>We are looking for contributors.</b> <a href="https://discord.gg/8GZrhMAwgs" target="_blank">You can join our Discord</a> and get to know how you can contribute here.
  </div>
);

export default About;
