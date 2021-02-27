import { Router } from '@reach/router';
import React from 'react';
import AttributeCreation from '../containers/AttributeCreation';
import ChoiceCreation from '../containers/ChoiceCreation';

interface Props {}

function Nav(props: Props) {
  const {} = props;

  return (
    <Router>
      <ChoiceCreation default path="/choices" />
      <AttributeCreation path="/attributes" />
    </Router>
  );
}

export default Nav;
