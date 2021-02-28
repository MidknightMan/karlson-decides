import { Attribute } from '../../types/WebAppTypes';
import {
  SETTING_ATTRIBUTES,
  SET_ATTRIBUTES_FAIL,
  SET_ATTRIBUTES_SUCCESS,
  RESET_ATTRIBUTES,
} from '../reduxTypes';

export interface AttributesState {
  loading: boolean;
  success: boolean;
  error: boolean;
  attributes: Attribute[];
}

const initialState: AttributesState = {
  loading: false,
  success: false,
  error: false,
  attributes: [],
};

export default function attributesReducer(state = initialState, action: any) {
  switch (action.type) {
    case SETTING_ATTRIBUTES:
      return {
        ...state,
        loading: true,
      };
    case SET_ATTRIBUTES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        attributes: [...action.attributes],
      };
    case SET_ATTRIBUTES_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
      };
    case RESET_ATTRIBUTES:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
