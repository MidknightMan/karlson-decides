import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { PEXEL_API_KEY } from './constants';
import Nav from './nav/Nav';
import store from './redux/store';

function App() {
  console.log({ PEXEL_API_KEY });
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <div style={{ height: '100%', width: '100%' }}>
            <Nav />
          </div>
        </header>
      </div>
    </Provider>
  );
}

export default App;
