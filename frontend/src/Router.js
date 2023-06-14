import React from 'react';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import {history} from './utils/history';

import PrivateRoute from './PrivateRoute';
import LoginRoute from  './LoginRoute';
import HomeView from './view/HomeView';
import CartView from './view/CartView';
import LoginView from './view/LoginView';
import BookView from './view/BookView';
import RegisterView from './view/RegisterView';
import OrderView from './view/OrderView';
import SearchView from './view/SearchView';
import HistoryView from './view/HistoryView';
import AdminView from './view/AdminView';


class BasicRoute extends React.Component{

	constructor(props) {
		super(props);

		history.listen((location, action) => {
			// clear alert on location change
			console.log(location,action);
		});
	}

	render(){
		return(
			<Router history={history}>
				<Switch>
					<LoginRoute exact path="/login" component={LoginView} />
					<Route exact path="/home" component={HomeView} />
					<Route exact path="/cart" component={CartView} />
					<Route exact path="/order" component={OrderView} />
					<Route exact path="/history" component={HistoryView} />
					<PrivateRoute exact path="/admin/:type/:action" component={AdminView} />
					<Route exact path="/bookDetails" component={BookView} />
					<Route exact path="/search" component={SearchView} />
					<Route exact path="/register" component={RegisterView} />
					<Redirect from="/*" to="/home" />
				</Switch>

			</Router>
		);
	}


}

export default BasicRoute;