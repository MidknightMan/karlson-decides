import { Dispatch } from 'redux';
import { sustainabilityAttribute } from '../../constants';
import { Attribute, Choice } from '../../types/WebAppTypes';
import {
  RESET_CHOICES,
  SETTING_CHOICES,
  SET_ATTR_FOR_CHOICES,
  SET_CHOICES_FAIL,
  SET_CHOICES_SUCCESS,
} from '../reduxTypes';

export function settingChoices() {
  return {
    type: SETTING_CHOICES,
  };
}

export function setChoicesSuccess(choices: Choice[]) {
  return {
    type: SET_CHOICES_SUCCESS,
    choices,
  };
}

export function setChoicesFailed() {
  return {
    type: SET_CHOICES_FAIL,
  };
}

export function makeChoices(choices: Choice[]) {
  return async (dispatch: Dispatch) => {
    dispatch(settingChoices());
    // async actions such as setting choices in a database could occur here
    dispatch(setChoicesSuccess(choices));
    if (!choices) {
      dispatch(setChoicesFailed());
    }
  };
}

export function resetChoices() {
  return {
    type: RESET_CHOICES,
  };
}

export function setAttributesForChoices(
  choices: Choice[],
  attributes: Attribute[]
) {
  const updatedChoices = choices.map((choice) => {
    const newChoice = { ...choice };
    newChoice.attributes = [...attributes, { ...sustainabilityAttribute }];
    return newChoice;
  });
  console.log({ updatedChoices });
  return {
    type: SET_ATTR_FOR_CHOICES,
    updatedChoices,
  };
}
