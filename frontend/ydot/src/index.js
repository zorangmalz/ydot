import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import firebase from "firebase/app";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./components/css/_slick-theme.scss"
import "./components/css/_slick.scss"

import "firebase/auth";
import "firebase/firestore";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { rootReducer } from "./reducer";
import { BrowserRouter } from "react-router-dom";


import reportWebVitals from './reportWebVitals';

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

var firebaseConfig = {
  apiKey: "AIzaSyCtE3j9HIkyUePlBM740HqdP0MhfRvjitI",
  authDomain: "ydot-23a93.firebaseapp.com",
  projectId: "ydot-23a93",
  storageBucket: "ydot-23a93.appspot.com",
  messagingSenderId: "997957851385",
  appId: "1:997957851385:web:6912df687e5d06b8972a28",
  measurementId: "G-EFMVK60X5W"
};
const initialState = {};
const store = createStore(rootReducer, initialState);


firebase.initializeApp(firebaseConfig);
firebase.firestore();

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
