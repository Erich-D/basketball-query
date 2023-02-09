import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CreatePlayer } from './components/player-adder';
import { PlayerLookup } from './components/player-lookup';
import { PlayerUpdater } from './components/player-updater';
import { PlayerInfo } from './components/player-viewer';

const queryClient = new QueryClient();

function App() {
  return <>
  <QueryClientProvider client={queryClient}>

    <PlayerInfo/>
    
    <PlayerUpdater/>
    <PlayerLookup/>
    <CreatePlayer/>

  </QueryClientProvider>
  </>
}

export default App;
