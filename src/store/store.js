import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);
}

export default compose(applyMiddleware(...middlewares))(createStore)(reducers);
