import { navigate, RouteComponentProps } from '@reach/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { makeAttributes } from '../redux/actions/attributesAction';
import { resetChoices } from '../redux/actions/choicesAction';
import { AttributesState } from '../redux/reducers/attributesReducer';
import { StoreTypes } from '../redux/store/storeTypes';
import { Attribute, Choice } from '../types/WebAppTypes';
import Crypto from 'crypto';
import AttributeCard from '../components/AttributeCard';
import { ChoicesState } from '../redux/reducers/choicesReducer';

interface Props extends RouteComponentProps {
  resetChoices: () => void;
  makeAttributes: (attributes: Attribute[], choices: Choice[]) => void;
  AttributesState: AttributesState;
  ChoicesState: ChoicesState;
}

function AttributeCreation(props: Props) {
  const [attributes, setAttributes] = useState<Attribute[]>([]);

  const { register, handleSubmit, reset } = useForm<Partial<Attribute>>();

  const { AttributesState, ChoicesState } = props;

  const onSubmit = async (data: Partial<Attribute>) => {
    const randomId = Crypto.randomBytes(20).toString('hex');
    if (data.name) {
      setAttributes([
        ...attributes,
        { id: randomId, name: data.name, weight: 50 },
      ]);
      reset();
    }
  };

  const setReduxAttributes = () => {
    const { choices } = ChoicesState;
    console.log('SETTING Attributes IN REDUX');
    props.makeAttributes(attributes, choices);
  };

  const deleteAttribute = (id: string) => {
    const newAttributes = attributes.filter((attribute) => attribute.id !== id);
    setAttributes([...newAttributes]);
  };

  if (AttributesState.success) {
    navigate('/decide');
    // define nav route
  }

  return (
    <div>
      <p>Step 2 of 3</p>
      <h2>Add some attributes (up to 3):</h2>
      {/* component to show created attributes as well as default sustainability attribute */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {attributes ? (
          attributes.map((attribute) => {
            return (
              <AttributeCard
                key={attribute.id}
                attribute={attribute}
                deleteAttribute={deleteAttribute}
              />
            );
          })
        ) : (
          <h3>No attributes yet</h3>
        )}
      </div>
      <form
        style={{
          margin: '3%',
          flexDirection: 'column',
          display: 'flex',
          justifyContent: 'center',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="attributeName" />
        <input
          id="attributeName"
          type="text"
          placeholder="value for money..."
          name="name"
          ref={register({ required: true })}
          style={{
            minHeight: 44,
            margin: '2%',
            borderRadius: 15,
            fontFamily: 'Red Hat Display',
            paddingLeft: '5%',
            borderColor: 'teal',
            width: '90%',
            placeSelf: 'center',
          }}
        />
        <button
          style={{
            fontFamily: 'Red Hat Display',
            width: '95%',
            placeSelf: 'center',
            borderRadius: 50,
            backgroundColor: attributes.length >= 3 ? '#78909c40' : '#78909c',
            borderStyle: 'none',
            margin: '1%',
            color: 'white',
            minHeight: 44,
          }}
          disabled={attributes.length >= 3}
          type="submit"
        >
          Add +
        </button>
      </form>
      <button
        onClick={() => {
          props.resetChoices();
          navigate('/choices');
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
        onClick={() => setReduxAttributes()}
        style={{
          fontFamily: 'Red Hat Display',
          width: '90%',
          placeSelf: 'center',
          borderRadius: 50,
          backgroundColor: attributes.length === 0 ? '#78909c40' : 'teal',
          borderStyle: 'none',
          margin: '1%',
          color: 'white',
          minHeight: 44,
        }}
        disabled={!attributes}
      >
        {`Decide >`}
      </button>
    </div>
  );
}

function mapStateToProps(state: StoreTypes) {
  return {
    AttributesState: state.AttributesReducer,
    ChoicesState: state.ChoicesReducer,
    // update with Attributes reducer and below update with attributes action
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<StoreTypes, void, Action>) {
  return {
    resetChoices: () => dispatch(resetChoices()),
    makeAttributes: (attributes: Attribute[], choices: Choice[]) =>
      dispatch(makeAttributes(attributes, choices)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AttributeCreation);
