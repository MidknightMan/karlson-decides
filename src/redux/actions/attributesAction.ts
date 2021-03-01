import { Dispatch } from 'redux';
import { sustainabilityAttribute } from '../../constants';
import { Attribute, Choice } from '../../types/WebAppTypes';
import {
  CHANGE_ATTRIBUTE_WEIGHT,
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
  const attributesInclSustainability = [
    ...attributes,
    { ...sustainabilityAttribute },
  ];
  return {
    type: SET_ATTRIBUTES_SUCCESS,
    attributes: [...attributesInclSustainability],
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

export function updateAttributeWeight(
  attributes: Attribute[],
  attributeId: string,
  updatedWeight: number
) {
  const indexToUpdate = attributes.findIndex(
    (attribute) => attribute.id === attributeId
  );
  const updatedAttributes = [...attributes];
  updatedAttributes[indexToUpdate].weight = updatedWeight;
  console.log({ updatedAttributes }, 'UPDATED ATTRIBUTES');
  return {
    type: CHANGE_ATTRIBUTE_WEIGHT,
    updatedAttributes,
  };
}

export function resetAttributes() {
  return {
    type: RESET_ATTRIBUTES,
  };
}
