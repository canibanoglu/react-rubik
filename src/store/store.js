import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
  const logger = () => next => (action) => {
    if (typeof action !== 'function') {
      console.info('dispatching:', action);
    }
    return next(action);
  };

  middlewares.push(logger);
}

export default compose(applyMiddleware(...middlewares))(createStore)(reducers);
