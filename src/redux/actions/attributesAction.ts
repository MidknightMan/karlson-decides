import { Dispatch } from 'redux';
import { Attribute, Choice } from '../../types/WebAppTypes';
import {
  RESET_ATTRIBUTES,
  SETTING_ATTRIBUTES,
  SET_ATTRIBUTES_FAIL,
  SET_ATTRIBUTES_SUCCESS,
} from '../reduxTypes';
import { setAttributesForChoices } from './choicesAction';

export function settingAttributes() {
  return {
    type: SETTING_ATTRIBUTES,
  };
}

export function setAttributesSuccess(attributes: Attribute[]) {
  return {
    type: SET_ATTRIBUTES_SUCCESS,
    attributes,
  };
}

export function setAttributesFailed() {
  return {
    type: SET_ATTRIBUTES_FAIL,
  };
}

export function makeAttributes(attributes: Attribute[], choices: Choice[]) {
  return async (dispatch: Dispatch) => {
    dispatch(settingAttributes());
    // async actions such as setting Attributes in a database could occur here
    dispatch(setAttributesForChoices(choices, attributes));
    dispatch(setAttributesSuccess(attributes));
    if (!attributes) {
      dispatch(setAttributesFailed());
    }
  };
}

export function resetAttributes() {
  return {
    type: RESET_ATTRIBUTES,
  };
}
