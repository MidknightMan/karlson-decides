import React, { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Result } from '../types/WebAppTypes';

const ResultNode = memo(({ data: { data } }: { data: { data: Result } }) => {
  return (
    <div
      style={{
        padding: 10,
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderWidth: 5,
        borderColor: 'teal',
        borderRadius: 4,
      }}
    >
      <div>Top Choice:</div>
      <div>{data.choiceName}</div>
      <div>{data.score}</div>
      <Handle type="source" position={Position.Top} />
    </div>
  );
});

export default ResultNode;
