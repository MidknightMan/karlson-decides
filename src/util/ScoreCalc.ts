import { CalculationVariable } from '../types/WebAppTypes';

export const scoreCalculator = (data: CalculationVariable[]): number => {
  let score = 0;
  data.forEach((variable) => {
    score += variable.attributeScore * (variable.attributeWeight / 100);
  });
  console.log({ score });
  return parseFloat(score.toFixed(2));
};
