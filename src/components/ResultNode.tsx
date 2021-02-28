import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Result } from '../types/WebAppTypes';

const ResultNode = ({ data: { data } }: { data: { data: Result } }) => {
  return (
    <div
      style={{
        padding: 10,
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'teal',
        borderRadius: 4,
      }}
    >
      <div>{data.choiceName}</div>
      <div>{data.score}</div>
      <Handle type="source" position={Position.Top} />
    </div>
  );
};

export default ResultNode;
