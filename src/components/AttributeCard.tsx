import React from 'react';
import { Attribute } from '../types/WebAppTypes';

interface Props {
  attribute: Attribute;
  deleteAttribute: (id: string) => void;
}

function AttributeCard(props: Props) {
  const { attribute, deleteAttribute } = props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '5%',
        width: '25%',
        backgroundColor: '#cfd8dc',
        borderRadius: 10,
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      {/* <img
        src={!!choice.imgSrc ? choice.imgSrc : Cons}
        alt={Cons}
        style={{
          maxWidth: '90%',
          maxHeight: '90%',
          borderRadius: 15,
          margin: 10,
          placeSelf: 'center',
        }}
      /> */}
      <p>{attribute.name}</p>
      <button
        style={{
          fontFamily: 'Red Hat Display',
          width: '90%',
          placeSelf: 'center',
          borderRadius: 50,
          backgroundColor: '#78909c',
          borderStyle: 'none',
          margin: 10,
          color: 'white',
        }}
        onClick={() => deleteAttribute(attribute.id)}
      >
        Remove
      </button>
    </div>
  );
}

export default AttributeCard;
