import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './StackNavigator';
import {HomeStack} from './StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LongPressGestureHandler } from 'react-native-gesture-handler';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
    };
  }
  
  async componentDidMount() {
    let userDetails = AsyncStorage.getItem('userData')
    console.log("userDetails", userDetails);
    if (userDetails != null) {
      this.setState ({
        isLogin: userDetails
      })
    }
  }

  render() {
    const {isLogin} = this.state;
    return (
      <>
        <NavigationContainer>
          {isLogin ? <HomeStack /> : <AuthStack />}
        </NavigationContainer>
      </>
    );
  }
}

export default Navigation;
