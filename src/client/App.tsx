import * as React from 'react';
import Card from './components/Card';

class App extends React.Component {
  public render() {
    return <Card suit="spades" rank={2} />;
  }
}

export default App;
