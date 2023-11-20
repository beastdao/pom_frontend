import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/layoutComponents/Header';
import PageContent from './components/layoutComponents/Page';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import CreateCommunity from './pages/CreateCommunity';
import CreateCommunityFinal from './pages/CreateCommunityFinal';
import RegisterNameFinal from './pages/RegisterNameFinal';
import ManageCommunityFinal from './pages/ManageCommunityFinal';
import MyCommunities from './pages/MyCommunities';
import MyCards from './pages/MyCards';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS here
import config from './config';
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import MyCustomAvatar from "./components/connectKit/MyCustomAvatar";


const App: React.FunctionComponent = () => {
  const pages: string[] = ['MY MEMBERSHIPS', '🌈 CREATE COMMUNITY', 'MY COMMUNITIES', 'ABOUT'];

  return (

    <WagmiConfig config={config}>

      <ConnectKitProvider theme="nouns"
      options={{
          customAvatar: MyCustomAvatar,
          hideBalance: false,
        }}
      >

    <Router>
      <div className="App">
        <Header pages={pages}/>
        <div className="content-container">
          <Routes>
            <Route path="/" element={<PageContent> <Home /> </PageContent>} />
            <Route path="/:nameAtCommunity" element={<PageContent> <Profile /> </PageContent>} />
            <Route path="/MyMemberships" element={<PageContent> <MyCards /> </PageContent>} />
            <Route path="/CreateCommunity" element={<PageContent> <CreateCommunity /> </PageContent>} />
            <Route path="/MyCommunities" element={<PageContent> <MyCommunities /> </PageContent>} />
            <Route path="/about" element={<PageContent> <About /> </PageContent>} />
            <Route path="/CreateCommunityFinal/:searchValue" element={<PageContent> <CreateCommunityFinal /> </PageContent>} />
            <Route path="/CreateCommunityFinal/" element={<PageContent> <CreateCommunityFinal /> </PageContent>} />
            <Route path="/RegisterNameFinal/:nameAtCommunity" element={<PageContent> <RegisterNameFinal /> </PageContent>} />
            <Route path="/ManageCommunityFinal/:searchValueCommunity" element={<PageContent> <ManageCommunityFinal /> </PageContent>} />
          </Routes>
        </div>
      </div>
    </Router>

      </ConnectKitProvider>
     </WagmiConfig>
   );
};

export default App;
