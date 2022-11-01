import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import commentsReducer from './comments';
import followsReducer from './follows';
import session from './session'
import storyReducer from './stories';
import likesReducer from './likes'

const rootReducer = combineReducers({
  session,
  storyState: storyReducer,
  commentState: commentsReducer,
  followsState: followsReducer,
  likeState: likesReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
