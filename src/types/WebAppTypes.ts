import { ReactNode } from 'react';
import { FlowElement } from 'react-flow-renderer';

export interface Choice {
  id: string;
  name: string;
  attributes: Attribute[];
  imgSrc?: string;
}

export interface Attribute {
  id: string;
  name: string;
  weight: number;
}

export interface CalculationVariable {
  attributeScore: number;
  attributeWeight: number;
}

export interface IFlowElement {
  id: string;
  type: 'input' | 'output' | 'default' | ReactNode;
  data: any;
  position: { x: number; y: number };
}

export interface Result {
  choiceId: string;
  choiceName: string;
  score: number;
}
