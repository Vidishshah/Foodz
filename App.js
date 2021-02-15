import React, {Component} from 'react';
import Container from './src/Container';
// import {Provider} from 'react-redux';
// import store from './src/redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.ignoredYellowBox = true;
    return (
      <>
        {/* <Provider store={store}> */}
        <Container />
        {/* </Provider> */}
      </>
    );
  }
}

export default App;
