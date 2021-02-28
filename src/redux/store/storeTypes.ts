import { AttributesState } from '../reducers/attributesReducer';
import { ChoicesState } from '../reducers/choicesReducer';

export interface StoreTypes {
  ChoicesReducer: ChoicesState;
  AttributesReducer: AttributesState;
}
