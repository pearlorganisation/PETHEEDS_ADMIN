import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import './satoshi.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { injectStore } from './services/axiosInterceptor';
import store from './features/store';
// ---------------------------------------------------------------------------------
injectStore(store);
let persistor = persistStore(store);
// ------------------------------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Router basename="">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <Router> */}
          <App />
          {/* </Router> */}
        </PersistGate>
      </Provider>
    </Router>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
