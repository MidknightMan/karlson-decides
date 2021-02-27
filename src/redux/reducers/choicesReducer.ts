import { Choice } from '../../types/WebAppTypes';
import {
  RESET_CHOICES,
  SETTING_CHOICES,
  SET_CHOICES_FAIL,
  SET_CHOICES_SUCCESS,
} from '../reduxTypes';

export interface ChoicesState {
  loading: boolean;
  success: boolean;
  error: boolean;
  choices: Choice[];
}

const initialState: ChoicesState = {
  loading: false,
  success: false,
  error: false,
  choices: [],
};

export default function choicesReducer(state = initialState, action: any) {
  switch (action.type) {
    case SETTING_CHOICES:
      return {
        ...state,
        loading: true,
      };
    case SET_CHOICES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        choices: [...action.choices],
      };
    case SET_CHOICES_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
      };
    case RESET_CHOICES:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
