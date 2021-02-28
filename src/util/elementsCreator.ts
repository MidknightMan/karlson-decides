import { Attribute, Choice, IFlowElement } from '../types/WebAppTypes';

export const elementsCreator = (attributes: Attribute[], choices: Choice[]) => {
  // TODO include window size and do a maxLen of attributes and choices
  let elements: IFlowElement[] = [];
  let counter = 0;
  let positionXAttribute = 0;
  let positionYAttribute = 0;
  attributes.forEach((attribute) => {
    const element: IFlowElement = {
      id: counter,
      type: 'attributeNode',
      data: { data: { ...attribute } },
      position: { x: positionXAttribute, y: positionYAttribute },
    };
    elements.push(element);
    counter++;
    positionXAttribute = positionXAttribute + 200;
  });

  positionXAttribute = 0;
  positionYAttribute = 300;

  choices.forEach((choice) => {
    const element: IFlowElement = {
      id: counter,
      type: 'default',
      data: { label: choice.name },
      position: { x: positionXAttribute, y: positionYAttribute },
    };
    elements.push(element);
    counter++;
    positionXAttribute = positionXAttribute + 200;
  });

  console.log('ELEMENTS CREATED', { elements });

  return elements;
  // build up elements
};
