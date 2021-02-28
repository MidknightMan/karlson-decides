import { Dispatch } from 'redux';
import { resetAttributes } from './attributesAction';
import { resetChoices } from './choicesAction';

export function resetAll() {
  return (dispatch: Dispatch) => {
    dispatch(resetAttributes());
    dispatch(resetChoices());
  };
}
