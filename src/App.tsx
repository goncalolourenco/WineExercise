import React from 'react';
import { Router } from '@reach/router';
import './App.css';

import { PageContainer } from './Components';
import { Wines, Wine, WineAdd } from './Pages';

const App: React.FC = () => {
  return (
    <PageContainer>
      <Router primary={false} component={React.Fragment}>
        <Wines path='/' />
        <Wine path='wine/:wineId' />
        <WineAdd path='wine/new' />
      </Router>
    </PageContainer>
  );
};

export default App;
