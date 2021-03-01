import React, { memo } from 'react';

const ChoiceNode = memo(
  ({ data, id, selected }: { data: any; id: number; selected: boolean }) => {
    return (
      <div
        style={{
          padding: 10,
          backgroundColor: 'white',
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: 'green',
          borderRadius: 4,
        }}
      >
        <div>{data.name}</div>
      </div>
    );
  }
);

export default ChoiceNode;
