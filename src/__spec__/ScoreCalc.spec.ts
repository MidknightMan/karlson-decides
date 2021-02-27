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

test('given an array containing multiple variables, the function will return the correct weighted score', () => {
  const input: CalculationVariable[] = [
    {
      attributeScore: 64,
      attributeWeight: 25,
    },
    {
      attributeScore: 50,
      attributeWeight: 100,
    },
    {
      attributeScore: 28,
      attributeWeight: 50,
    },
  ];
  const result = scoreCalculator(input);
  expect(result).toBe(80);
});
