import { Attribute, Choice, IFlowElement, Result } from '../types/WebAppTypes';

export const elementsCreator = (
  attributes: Attribute[],
  choices: Choice[],
  result: Result,
  handleWeightChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void,
  handleChoiceWeightChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string,
    atrId: string,
    choiceId: string
  ) => void
) => {
  console.log('RUNNING ELEMENT CREATOR');
  // TODO include window size and do a maxLen of attributes and choices
  let elements: IFlowElement[] = [];
  let counter = 0;
  let positionXAttribute = 0;
  let positionYAttribute = 0;

  // create attribute nodes
  attributes.forEach((attribute) => {
    const element: IFlowElement = {
      id: counter.toString(),
      type: 'attributeNode',
      data: {
        value: attribute.weight,
        name: attribute.name,
        nodeId: counter,
        onChange: handleWeightChange,
        attributeId: attribute.id,
      },
      position: { x: positionXAttribute, y: positionYAttribute },
    };
    elements.push(element);
    counter++;
    positionXAttribute = positionXAttribute + 200;
  });

  positionXAttribute = 0;
  positionYAttribute = 200;

  // create choice nodes
  choices.forEach((choice) => {
    const element: IFlowElement = {
      id: counter.toString(),
      type: 'choiceNode',
      data: {
        name: choice.name,
        choiceData: choice,
        onChange: handleChoiceWeightChange,
      },
      position: { x: positionXAttribute, y: positionYAttribute },
    };
    elements.push(element);
    counter++;
    positionXAttribute = positionXAttribute + 200;
  });

  positionXAttribute = 200;
  positionYAttribute = 400;

  // create end result node
  const resultElement: IFlowElement = {
    id: counter.toString(),
    type: 'resultNode',
    data: { data: { ...result } },
    position: { x: positionXAttribute, y: positionYAttribute },
  };

  elements.push(resultElement);

  // TODO create connector edges

  console.log('ELEMENTS CREATED', { elements });

  return elements;
  // build up elements
};
