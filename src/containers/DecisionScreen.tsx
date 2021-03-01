import { navigate, RouteComponentProps } from '@reach/router';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  resetAttributes,
  updateAttributeWeight,
} from '../redux/actions/attributesAction';
import { resetAll } from '../redux/actions/flowAction';
import { AttributesState } from '../redux/reducers/attributesReducer';
import { ChoicesState } from '../redux/reducers/choicesReducer';
import { StoreTypes } from '../redux/store/storeTypes';
import { elementsCreator } from '../util/elementsCreator';
import ReactFlow, { ReactFlowProvider } from 'react-flow-renderer';
import AttributeNode from '../components/AttributeNode';
import {
  Attribute,
  CalculationVariable,
  Choice,
  IFlowElement,
  Result,
} from '../types/WebAppTypes';
import { scoreCalculator } from '../util/ScoreCalc';
import ResultNode from '../components/ResultNode';
import { finalScore } from '../util/finalScore';
import ChoiceNode from '../components/ChoiceNode';

interface Props extends RouteComponentProps {
  resetAttributes: () => void;
  resetAll: () => void;
  Attributes: AttributesState;
  Choices: ChoicesState;
  updateAttributeWeight: (
    attributes: Attribute[],
    attributeId: string,
    updatedWeight: number
  ) => void;
}

function DecisionScreen(props: Props) {
  const {
    Attributes: { attributes },
    Choices: { choices },
  } = props;

  const [elements, setElements] = useState<any>([]);
  const [reactflowInstance, setReactflowInstance] = useState<any | null>(null);

  const elCreate = useCallback(
    (
      onChange: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void
    ) => {
      console.log('IN USE CALLBACK FOR CREATION');
      const finalResult = finalScore(choices, attributes);
      const elems = elementsCreator(
        attributes,
        choices,
        finalResult,
        // props.updateAttributeWeight
        onChange
      ) as any;
      return elems;
    },
    []
  );

  useEffect(() => {
    const onChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      id: string
    ) => {
      setElements((els: IFlowElement[]) => {
        const nextElements = els.map((e) => {
          if (e.id !== id) {
            return e;
          }

          const value = event.target.valueAsNumber;

          return {
            ...e,
            data: {
              ...e.data,
              value,
            },
          };
        });
        return nextElements;
      });
      // const updatedElements = [...elements];
      // const indexToUpdate = updatedElements.findIndex(
      //   (element) => element.id === id
      // );
      // updatedElements[indexToUpdate].value = event.target.valueAsNumber;
      // console.log(
      //   'CHANGE ELEM',
      //   event.target.value,
      //   id,
      //   indexToUpdate,
      //   updatedElements,
      //   elements
      // );
    };

    // const finalResult = finalScore(choices, attributes);

    // const elems = elementsCreator(
    //   attributes,
    //   choices,
    //   finalResult,
    //   // props.updateAttributeWeight
    //   onChange
    // ) as any;

    const elems = elCreate(onChange);

    setElements(elems);
  }, []);

  useEffect(() => {
    if (reactflowInstance && elements.length > 0) {
      reactflowInstance.fitView();
    }
  }, [reactflowInstance, elements.length]);

  const onLoad = useCallback(
    (rfi) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
        console.log('flow loaded:', rfi);
      }
    },
    [reactflowInstance]
  );

  const nodeTypes = {
    attributeNode: AttributeNode,
    resultNode: ResultNode,
    choiceNode: ChoiceNode,
  };

  return (
    <div>
      <p>Step 3 of 3</p>
      <div style={{ height: 500, margin: '2%', backgroundColor: 'red' }}>
        <ReactFlow
          elements={elements}
          nodeTypes={nodeTypes}
          snapToGrid={true}
          snapGrid={[20, 20]}
          onLoad={onLoad}
        />
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
    updateAttributeWeight: (
      attributes: Attribute[],
      attributeId: string,
      updatedWeight: number
    ) =>
      dispatch(updateAttributeWeight(attributes, attributeId, updatedWeight)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DecisionScreen);
