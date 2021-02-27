import { navigate, RouteComponentProps } from '@reach/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Attribute } from '../types/WebAppTypes';

interface Props extends RouteComponentProps {}

function AttributeCreation(props: Props) {
  const [attributes, setAttributes] = useState<Attribute[]>([]);

  const { register, handleSubmit, watch, errors, reset } = useForm<
    Partial<Attribute>
  >();

  const {} = props;

  return (
    <div>
      <p>Step 2 of 3</p>
      <h2>Add some attributes (up to 3):</h2>
      {/* component to show created attributes as well as default sustainability attribute */}
      <form
        style={{
          margin: '3%',
          flexDirection: 'column',
          display: 'flex',
          justifyContent: 'center',
        }}
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
        onClick={() => navigate('/choices')}
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

export default AttributeCreation;
