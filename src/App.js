import React from 'react';
import Page from './components/page';
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>
      <body>
        <Page/>
      </body>
    </div>
  );
}

export default App;
