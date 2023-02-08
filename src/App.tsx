import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PlayerUpdater } from './components/player-updater';
import { PlayerInfo } from './components/player-viewer';

const queryClient = new QueryClient();

function App() {
  return <>
  <QueryClientProvider client={queryClient}>

    <PlayerInfo/>
    
    <PlayerUpdater/>

  </QueryClientProvider>
  </>
}

export default App;
