import React, { memo, useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Attribute } from '../types/WebAppTypes';

interface AttributeNode {
  value: number;
  name: string;
  nodeId: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, nodeId: string) => void;
}

const AttributeNode = memo(
  ({
    data,
    id,
    selected,
  }: {
    data: AttributeNode;
    id: string;
    selected: boolean;
  }) => {
    const { value, name, nodeId, onChange } = data;
    const memoizedUpdate = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => onChange(e, id),
      [data, nodeId]
    );

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
        <div>{name} Weight</div>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={memoizedUpdate}
        />
        <div>{value}</div>
        <Handle type="source" position={Position.Bottom} />
      </div>
    );
  }
);

export default AttributeNode;
