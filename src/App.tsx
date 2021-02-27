import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import TrialFlow from './constants/TrialFlow';
import ChoiceCreation from './containers/ChoiceCreation';
import Nav from './nav/Nav';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <div style={{ height: '100%', width: '100%' }}>
            {/* <TrialFlow /> */}
            <Nav />
          </div>
        </header>
      </div>
    </Provider>
  );
}

export default App;
