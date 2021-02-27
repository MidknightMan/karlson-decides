import React from 'react';
import { Choice } from '../types/WebAppTypes';
import Cons from '../assets/consigliere1.jpg';

interface Props {
  choice: Choice;
  deleteChoice: (id: string) => void;
}

function ChoiceCard(props: Props) {
  const { choice, deleteChoice } = props;

  console.log(choice, 'CHOICE CARD PROPS', !!choice.imgSrc);

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
      <img
        src={!!choice.imgSrc ? choice.imgSrc : Cons}
        alt={Cons}
        style={{
          maxWidth: '90%',
          maxHeight: '90%',
          borderRadius: 15,
          margin: 10,
          placeSelf: 'center',
        }}
      />
      <p>{choice.name}</p>
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
        onClick={() => deleteChoice(choice.id)}
      >
        Remove
      </button>
    </div>
  );
}

export default ChoiceCard;
