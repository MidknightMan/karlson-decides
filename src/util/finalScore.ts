import {
  Attribute,
  CalculationVariable,
  Choice,
  Result,
} from '../types/WebAppTypes';
import { scoreCalculator } from './ScoreCalc';

export const finalScore = (choices: Choice[], attributes: Attribute[]) => {
  let result: Result[] = [];

  choices.forEach((choice) => {
    const choiceAtr: CalculationVariable[] = choice.attributes.map(
      (choiceAttribute) => {
        const thisAtr = attributes.find(
          (attribute) => attribute.id === choiceAttribute.id
        );
        const attributeWeight = thisAtr?.weight ?? 50;
        return {
          attributeScore: choiceAttribute.weight,
          attributeWeight: attributeWeight,
        };
      }
    );
    const choiceScore = {
      choiceId: choice.id,
      choiceName: choice.name,
      score: scoreCalculator(choiceAtr),
    };
    console.log({ choiceScore });
    result.push(choiceScore);
  });
  const finalResult = result.sort((a, b) => a.score - b.score)[0];
  return finalResult;
};
