import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Attribute } from '../types/WebAppTypes';

const AttributeNode = ({ data: { data } }: { data: { data: Attribute } }) => {
  console.log(data, 'NODE DATA');
  return (
    <div
      style={{
        padding: 10,
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'violet',
        borderRadius: 4,
      }}
    >
      <div>{data.name} Weight</div>
      <input type="range" min="0" max="100" value={data.weight} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default AttributeNode;
