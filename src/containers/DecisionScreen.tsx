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
import ReactFlow, { Controls, MiniMap } from 'react-flow-renderer';
import AttributeNode from '../components/AttributeNode';
import { Attribute, Choice, IFlowElement, Result } from '../types/WebAppTypes';
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

  const resultCalc = (els: any[]): Result => {
    let choices: Choice[];
    let attributes: Attribute[];

    if (els.length === 0) {
      return {
        choiceId: '',
        choiceName: '',
        score: 50,
      };
    }

    const choiceElems = els.filter(
      (element: IFlowElement) => element.type === 'choiceNode'
    ) as IFlowElement[];

    choices = choiceElems.map((choiceElem) => {
      return choiceElem.data.choiceData as Choice;
    });

    const atrElems = els.filter(
      (element: IFlowElement) => element.type === 'attributeNode'
    ) as IFlowElement[];

    attributes = atrElems.map((atrElem) => {
      const atr: Attribute = {
        id: atrElem.data.attributeId,
        name: atrElem.data.name,
        weight: atrElem.data.value,
      };
      return atr;
    });

    console.log('RESULT CALC', choices, attributes);

    const result = finalScore(choices, attributes);

    console.log({ result });

    return result;
  };

  const elCreate = useCallback(
    (
      onChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        id: string
      ) => void,
      onChoiceAtrChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        id: string,
        atrId: string,
        choiceId: string
      ) => void
    ) => {
      console.log('IN USE CALLBACK FOR CREATION');
      const finalResult = finalScore(choices, attributes);
      const elems = elementsCreator(
        attributes,
        choices,
        finalResult,
        onChange,
        onChoiceAtrChange
      ) as any;
      return elems;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        const resultToUpdate = nextElements.findIndex(
          (element) => element.type === 'resultNode'
        );

        console.log({ nextElements });

        const newResult = resultCalc(nextElements);

        nextElements[resultToUpdate].data = { data: { ...newResult } };

        return nextElements;
      });
    };

    const onChoiceAtrChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      id: string,
      atrId: string,
      choiceId: string
    ) => {
      setElements((els: IFlowElement[]) => {
        const nextChoiceElements = els.map((e) => {
          if (e.id !== id) {
            return e;
          }
          const updatedChoice = {
            ...e.data.choiceData,
          } as Choice;
          const atrToUpdate = updatedChoice.attributes.findIndex(
            (attribute) => attribute.id === atrId
          );

          const choiceAttributes = updatedChoice.attributes.map((attribute) => {
            if (attribute.id === atrId) {
              const newAttribute: Attribute = {
                id: attribute.id,
                name: attribute.name,
                weight: event.target.valueAsNumber,
              };
              return newAttribute;
            }
            return { ...attribute };
          });

          updatedChoice.attributes = [...choiceAttributes];

          console.log(e, 'ELEMENT IN MAP', atrToUpdate);

          if (e.data.choiceData.id !== choiceId) {
            return {
              ...e,
            };
          }

          return {
            ...e,
            data: {
              ...e.data,
              choiceData: { ...updatedChoice },
            },
          };
        });
        const resultToUpdate = nextChoiceElements.findIndex(
          (element) => element.type === 'resultNode'
        );

        const newResult = resultCalc(nextChoiceElements);

        nextChoiceElements[resultToUpdate].data = { data: { ...newResult } };
        console.log({ nextChoiceElements });
        return nextChoiceElements;
      });
    };

    const elems = elCreate(onChange, onChoiceAtrChange);

    setElements(elems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <p>
        Decision Time! We added sustainability in as we feel it should be part
        of all decisions
      </p>
      <div style={{ height: 500, margin: '2%', backgroundColor: '#b2ebf240' }}>
        <ReactFlow
          elements={elements}
          nodeTypes={nodeTypes}
          snapToGrid={true}
          snapGrid={[20, 20]}
          onLoad={onLoad}
        >
          <Controls />
          <MiniMap />
        </ReactFlow>
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
