import { navigate, RouteComponentProps } from '@reach/router';
import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { resetAttributes } from '../redux/actions/attributesAction';
import { resetAll } from '../redux/actions/flowAction';
import { AttributesState } from '../redux/reducers/attributesReducer';
import { ChoicesState } from '../redux/reducers/choicesReducer';
import { StoreTypes } from '../redux/store/storeTypes';
import { elementsCreator } from '../util/elementsCreator';
import ReactFlow from 'react-flow-renderer';
import AttributeNode from '../components/AttributeNode';

interface Props extends RouteComponentProps {
  resetAttributes: () => void;
  resetAll: () => void;
  Attributes: AttributesState;
  Choices: ChoicesState;
}

function DecisionScreen(props: Props) {
  const {
    Attributes: { attributes },
    Choices: { choices },
  } = props;

  const elements = elementsCreator(attributes, choices) as any;

  const nodeTypes = {
    attributeNode: AttributeNode,
  };

  return (
    <div>
      <p>Step 3 of 3</p>
      <div style={{ height: 500, margin: '2%', backgroundColor: 'whitesmoke' }}>
        <ReactFlow elements={elements} nodeTypes={nodeTypes} />
      </div>
      <button
        onClick={() => {
          props.resetAttributes();
          navigate('/attributes');
        }}
        style={{
          fontFamily: 'Red Hat Display',
          width: '90%',
          placeSelf: 'center',
          borderRadius: 50,
          backgroundColor: '#78909c',
          borderStyle: 'none',
          margin: '1%',
          color: 'white',
          minHeight: 44,
        }}
      >
        {`< Back`}
      </button>
      <button
        onClick={() => {
          props.resetAll();
          navigate('/');
        }}
        style={{
          fontFamily: 'Red Hat Display',
          width: '90%',
          placeSelf: 'center',
          borderRadius: 50,
          backgroundColor: '#78909c',
          borderStyle: 'none',
          margin: '1%',
          color: 'white',
          minHeight: 44,
        }}
      >
        {`Reset ♺`}
      </button>
    </div>
  );
}

function mapStateToProps(state: StoreTypes) {
  return {
    Attributes: state.AttributesReducer,
    Choices: state.ChoicesReducer,
    // update with Attributes reducer and below update with attributes action
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<StoreTypes, void, Action>) {
  return {
    resetAttributes: () => dispatch(resetAttributes()),
    resetAll: () => dispatch(resetAll()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DecisionScreen);
