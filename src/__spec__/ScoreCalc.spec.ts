import { CalculationVariable } from '../types/WebAppTypes';
import { scoreCalculator } from '../util/ScoreCalc';

test('given one variable, the function will return the weighted score', () => {
  const input: CalculationVariable[] = [
    {
      attributeScore: 64,
      attributeWeight: 25,
    },
  ];
  const result = scoreCalculator(input);
  expect(result).toBe(16);
});
