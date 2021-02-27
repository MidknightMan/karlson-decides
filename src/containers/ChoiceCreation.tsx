import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Choice } from '../types/WebAppTypes';
import Crypto from 'crypto';
import { imageSearch } from '../api/imageSearchAPI';
import ChoiceCard from '../components/ChoiceCard';
import { connect } from 'react-redux';
import { StoreTypes } from '../redux/store/storeTypes';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

interface Props {}

function ChoiceCreation(props: Props) {
  const [choices, setChoices] = useState<Choice[]>([]);
  const {} = props;

  const { register, handleSubmit, watch, errors, reset } = useForm<
    Partial<Choice>
  >();

  const onSubmit = async (data: Partial<Choice>) => {
    const randomId = Crypto.randomBytes(20).toString('hex');
    if (data.name) {
      const imgSrc = await imageSearch(data.name);
      setChoices([
        ...choices,
        { id: randomId, name: data.name, attributes: [], imgSrc },
      ]);
      reset();
    }
  };

  const setReduxChoices = () => {
    console.log('SETTING CHOICES IN REDUX');
  };

  const deleteChoice = (id: string) => {
    const newChoices = choices.filter((choice) => choice.id !== id);
    setChoices([...newChoices]);
  };

  return (
    <div>
      <p>Step 1 of 3</p>
      <h2>Add some choices (up to 5):</h2>
      {/* insert component to show choices */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {choices ? (
          choices.map((choice) => {
            return (
              <ChoiceCard
                key={choice.id}
                choice={choice}
                deleteChoice={deleteChoice}
              />
            );
          })
        ) : (
          <h3>No choices yet</h3>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          margin: '3%',
          flexDirection: 'column',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <label htmlFor="ChoiceName">Option name:</label>
        <input
          id="ChoiceName"
          type="text"
          placeholder="sausage, bean and cheese melt..."
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
        {/* <input /> */}
        <button
          style={{
            fontFamily: 'Red Hat Display',
            width: '95%',
            placeSelf: 'center',
            borderRadius: 50,
            backgroundColor: choices.length >= 5 ? '#78909c40' : '#78909c',
            borderStyle: 'none',
            margin: '1%',
            color: 'white',
            minHeight: 44,
          }}
          disabled={choices.length >= 5}
          type="submit"
        >
          Add +
        </button>
      </form>
      <button
        style={{
          fontFamily: 'Red Hat Display',
          width: '90%',
          placeSelf: 'center',
          borderRadius: 50,
          backgroundColor: choices.length === 0 ? '#78909c40' : 'teal',
          borderStyle: 'none',
          margin: '1%',
          color: 'white',
          minHeight: 44,
        }}
        disabled={!choices}
      >
        {`Next >`}
      </button>
    </div>
  );
}

function mapStateToProps(state: StoreTypes) {
  return {
    ChoicesState: state.ChoicesReducer,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<StoreTypes, void, Action>) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceCreation);
