import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanages from './pages/CreateOrphanage';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/orphanagesMap" exact component={OrphanagesMap} />
        <Route path="/orphanages/create" exact component={CreateOrphanages} />
        <Route path="/orphanages/:id" exact component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
