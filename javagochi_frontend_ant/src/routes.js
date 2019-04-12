import React from 'react';
import { Route } from 'react-router-dom';

import Intro from './components/Intro';
import ProfileView from './containers/ProfileView';
import JavagochiOwnedList from './containers/JavagochiOwnedListView';
import OwnedItemsList from './containers/OwnedItemsView';
import ItemOwnedDetailView from './containers/ItemOwnedDetailView';
import JavagochiOwnedDetail from './containers/JavagochiOwnedDetailView';
import JavagochiList from './containers/JavagochiListView';
import ItemList from './containers/ItemsListView';
import JavagochiDetail from './containers/JavagochiDetailView';
import ItDetail from './containers/ItemDetailView';
import WrappedNormalLoginForm from './containers/Login';
import Signup from './containers/Signup';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={Intro} />
        <Route exact path='/profile' component={ProfileView} />
        <Route exact path='/market' component={JavagochiList} />
        <Route exact path='/itemsmarket' component={ItemList} />
        <Route exact path='/myjavagochis' component={JavagochiOwnedList} />
        <Route exact path='/myjavagochis/:id/' component={JavagochiOwnedDetail} />
        <Route exact path='/detail/:jcRace/' component={JavagochiDetail} />
        <Route exact path='/myitems' component={OwnedItemsList} />
        <Route exact path='/myitems/:id/' component={ItemOwnedDetailView} />
        <Route exact path='/itemdetail/:itemName/' component={ItDetail} />
        <Route exact path='/login/' component={WrappedNormalLoginForm} />
        <Route exact path='/signup/' component={Signup} />
    </div>
);

export default BaseRouter;
