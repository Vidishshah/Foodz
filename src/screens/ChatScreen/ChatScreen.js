import {Icon} from 'native-base';
import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export class ChatScreen extends Component {
  render() {
    return (
      <>
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              width: '100%',
              alignSelf: 'center',
              flexDirection: 'row',
              borderTopWidth: 0.5,
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
            }}>
            <TextInput placeholder="Type message..." style={{height: 30}} />
            <TouchableOpacity>
              <Icon
                type="Feather"
                name="send"
                style={{color: 'green', fontSize: 24}}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default ChatScreen;
