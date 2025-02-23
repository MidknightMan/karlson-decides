import React from 'react';
import ReactFlow from 'react-flow-renderer';

interface Props {}

function TrialFlow(props: Props) {
  const {} = props;

  const elements = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Node 1' },
      position: { x: 250, y: 5 },
    },
    // you can also pass a React Node as a label
    {
      id: '2',
      data: { label: <div>Node 2</div> },
      position: { x: 100, y: 100 },
    },
    { id: 'e1-2', source: '1', target: '2', animated: true },
  ];

  return (
    <div style={{ height: 300 }}>
      <ReactFlow elements={elements} />
    </div>
  );
}

export default TrialFlow;
