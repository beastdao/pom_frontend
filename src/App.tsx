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
import { WagmiProvider } from 'wagmi';
import { ConnectKitProvider } from 'connectkit';
import MyCustomAvatar from './components/connectKit/MyCustomAvatar';
import CommunityBase from './pages/CommunityBase';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type PageKey =
    | '🗂️ COMMUNITY BASE'
    | 'MY MEMBERSHIPS'
    | '🌈 CREATE COMMUNITY'
    | 'MY COMMUNITIES'
    | 'ABOUT';

const App: React.FunctionComponent = () => {
    const pages: PageKey[] = [
        '🗂️ COMMUNITY BASE',
        'MY MEMBERSHIPS',
        '🌈 CREATE COMMUNITY',
        'MY COMMUNITIES',
        'ABOUT',
    ];
    const queryClient = new QueryClient();
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ConnectKitProvider
                    theme="nouns"
                    options={{
                        customAvatar: MyCustomAvatar,
                        hideBalance: false,
                    }}
                >
                    <Router>
                        <div className="App">
                            <Header pages={pages} />
                            <div className="content-container">
                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            <PageContent>
                                                {' '}
                                                <Home />{' '}
                                            </PageContent>
                                        }
                                    />
                                    <Route
                                        path="/:defaultCommunity"
                                        element={
                                            <PageContent>
                                                {' '}
                                                <Home />{' '}
                                            </PageContent>
                                        }
                                    />
                                    <Route
                                        path="/m/:nameAtCommunity"
                                        element={
                                            <PageContent>
                                                {' '}
                                                <Profile />{' '}
                                            </PageContent>
                                        }
                                    />
                                    <Route
                                        path="/communitybase"
                                        element={
                                            <PageContent>
                                                {' '}
                                                <CommunityBase />{' '}
                                            </PageContent>
                                        }
                                    />
                                    <Route
                                        path="/m/"
                                        element={
                                            <PageContent>
                                                {' '}
                                                <MyCards />{' '}
                                            </PageContent>
                                        }
                                    />
                                    <Route
                                        path="/CreateCommunity"
                                        element={
                                            <PageContent>
                                                {' '}
                                                <CreateCommunity />{' '}
                                            </PageContent>
                                        }
                                    />
                                    <Route
                                        path="/c/"
                                        element={
                                            <PageContent>
                                                {' '}
                                                <MyCommunities />{' '}
                                            </PageContent>
                                        }
                                    />
                                    <Route
                                        path="/about"
                                        element={
                                            <PageContent>
                                                {' '}
                                                <About />{' '}
                                            </PageContent>
                                        }
                                    />
                                    <Route
                                        path="/CreateCommunityFinal/:searchValue"
                                        element={
                                            <PageContent>
                                                {' '}
                                                <CreateCommunityFinal />{' '}
                                            </PageContent>
                                        }
                                    />
                                    <Route
                                        path="/CreateCommunityFinal/"
                                        element={
                                            <PageContent>
                                                {' '}
                                                <CreateCommunityFinal />{' '}
                                            </PageContent>
                                        }
                                    />
                                    <Route
                                        path="/RegisterNameFinal/:nameAtCommunity"
                                        element={
                                            <PageContent>
                                                {' '}
                                                <RegisterNameFinal />{' '}
                                            </PageContent>
                                        }
                                    />
                                    <Route
                                        path="/c/:searchValueCommunity"
                                        element={
                                            <PageContent>
                                                {' '}
                                                <ManageCommunityFinal />{' '}
                                            </PageContent>
                                        }
                                    />
                                </Routes>
                            </div>
                        </div>
                    </Router>
                </ConnectKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default App;
