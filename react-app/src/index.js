import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { SmallModalProvider } from './context/smallModal';
import { FollowModalProvider} from './context/followModal'
import { BrowserRouter } from 'react-router-dom';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <FollowModalProvider>
      <ModalProvider>
        <SmallModalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SmallModalProvider>
      </ModalProvider>
      </FollowModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
