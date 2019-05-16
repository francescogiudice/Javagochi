import React from 'react';
import { Route } from 'react-router-dom';

import Intro from './components/Intro';
import PersonalProfile from './containers/PersonalProfileView';
import UserList from './containers/UserListView';
import UserDetail from './containers/UserDetailView';
import ChangeProfile from './containers/ChangeProfileView';
import JavagochiOwnedList from './containers/JavagochiOwnedListView';
import ItemsOwnedList from './containers/ItemsOwnedListView';
import ItemOwnedDetail from './containers/ItemOwnedDetailView';
import UserJavagochiOwnedDetail from './containers/UserJavagochiOwnedDetailView';
import PersonalJavagochiOwnedDetail from './containers/PersonalJavagochiOwnedDetailView';
import JavagochiList from './containers/JavagochiListView';
import ItemList from './containers/ItemsListView';
import JavagochiDetail from './containers/JavagochiDetailView';
import ItDetail from './containers/ItemDetailView';
import TradeOffers from './containers/TradeOffersView';
import TradeOfferDetail from './containers/TradeOfferDetailView';
import UserTrades from './containers/UserTradesView';
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

        <Route exact path='/myprofile' component={PersonalProfile} />
        <Route exact path='/myprofile/change' component={ChangeProfile} />
        <Route exact path='/myprofile/myjavagochis' component={JavagochiOwnedList} />
        <Route exact path='/myprofile/myjavagochis/:id/' component={PersonalJavagochiOwnedDetail} />
        <Route exact path='/myprofile/myitems' component={ItemsOwnedList} />
        <Route exact path='/myprofile/myitems/:id/' component={ItemOwnedDetail} />
        <Route exact path='/myprofile/mytrades/' component={UserTrades} />

        <Route exact path='/profile/:username/' component={UserDetail} />
        <Route exact path='/profile/:username/javagochi/:id' component={UserJavagochiOwnedDetail} />
        <Route exact path='/users/' component={UserList} />
        <Route exact path='/trades' component={TradeOffers} />
        <Route exact path='/trades/:tradeId/' component={TradeOfferDetail} />
    </div>
);

export default BaseRouter;
