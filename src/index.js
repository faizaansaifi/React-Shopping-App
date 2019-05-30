import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Provider from "react-redux/es/components/Provider";
import {createStore,applyMiddleware} from "redux";
import {rootReducer} from "./reducers/reducer";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import CartView from "./components/CartView";
import Details from "./components/Details";
import {logger} from "redux-logger";
import OrderReciept from "./components/orderReciept";
import {ItemDetail} from "./components/ItemDetail";

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store=createStore(
    rootReducer,applyMiddleware(logger)
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route
                    exact path="/"
                    component={App}
                />
                <Route
                    exact path="/cart"
                    component={CartView}
                />
                <Route
                    path={"/details"}
                    component={Details}
                />
                <Route
                    path={"/reciept"}
                    component={OrderReciept}
                />
                <Route
                    path={"/items"}
                    component={ItemDetail}
                />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
