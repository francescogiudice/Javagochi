import React from 'react';
import { Route } from 'react-router-dom';

import Intro from './components/Intro';
import PersonalProfileView from './containers/PersonalProfileView';
import UserListView from './containers/UserListView';
import UserDetailView from './containers/UserDetailView';
import ChangeProfileView from './containers/ChangeProfileView';
import JavagochiOwnedList from './containers/JavagochiOwnedListView';
import ItemsOwnedList from './containers/ItemsOwnedListView';
import ItemOwnedDetailView from './containers/ItemOwnedDetailView';
import UserJavagochiOwnedDetail from './containers/UserJavagochiOwnedDetailView';
import PersonalJavagochiOwnedDetail from './containers/PersonalJavagochiOwnedDetailView';
import JavagochiList from './containers/JavagochiListView';
import ItemList from './containers/ItemsListView';
import JavagochiDetail from './containers/JavagochiDetailView';
import ItDetail from './containers/ItemDetailView';
import TradeOffersView from './containers/TradeOffersView';
import TradeOfferDetail from './containers/TradeOfferDetailView';
import UserTradesView from './containers/UserTradesView';
import WrappedNormalLoginForm from './containers/Login';
import Signup from './containers/Signup';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={Intro} />
        <Route exact path='/market' component={JavagochiList} />
        <Route exact path='/itemsmarket' component={ItemList} />
        <Route exact path='/detail/:jcRace/' component={JavagochiDetail} />
        <Route exact path='/itemdetail/:itemName/' component={ItDetail} />
        <Route exact path='/login/' component={WrappedNormalLoginForm} />
        <Route exact path='/signup/' component={Signup} />

        <Route exact path='/myprofile' component={PersonalProfileView} />
        <Route exact path='/myprofile/change' component={ChangeProfileView} />
        <Route exact path='/myprofile/myjavagochis' component={JavagochiOwnedList} />
        <Route exact path='/myprofile/myjavagochis/:id/' component={PersonalJavagochiOwnedDetail} />
        <Route exact path='/myprofile/myitems' component={ItemsOwnedList} />
        <Route exact path='/myprofile/myitems/:id/' component={ItemOwnedDetailView} />
        <Route exact path='/myprofile/mytrades/' component={UserTradesView} />

        <Route exact path='/profile/:username/' component={UserDetailView} />
        <Route exact path='/profile/:username/javagochi/:id' component={UserJavagochiOwnedDetail} />
        <Route exact path='/users/' component={UserListView} />
        <Route exact path='/trades' component={TradeOffersView} />
        <Route exact path='/trades/:tradeId/' component={TradeOfferDetail} />
    </div>
);

export default BaseRouter;
