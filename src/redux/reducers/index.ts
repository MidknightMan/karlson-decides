import { combineReducers } from 'redux';
import ChoicesReducer from './choicesReducer';
import AttributesReducer from './attributesReducer';

const rootReducer = combineReducers({
  ChoicesReducer,
  AttributesReducer,
});

export default rootReducer;
