import React, { memo, useCallback } from 'react';
import { Choice } from '../types/WebAppTypes';

const ChoiceNode = memo(
  ({ data, id, selected }: { data: any; id: number; selected: boolean }) => {
    const choice = data.choiceData as Choice;
    const memoizedUpdate = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>, atrId: string) =>
        data.onChange(e, id, atrId, choice.id),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [data, id]
    );
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
        {choice.attributes.map((attribute) => {
          return (
            <div key={attribute.id}>
              <p>{attribute.name}</p>
              <input
                type="range"
                min="0"
                max="100"
                value={attribute.weight}
                onChange={(e) => memoizedUpdate(e, attribute.id)}
              />
              <div>{attribute.weight}</div>
            </div>
          );
        })}
      </div>
    );
  }
);

export default ChoiceNode;
