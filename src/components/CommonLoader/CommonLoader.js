import React, {Component} from 'react';
import {View, Modal, Text} from 'react-native';
import {Spinner} from 'native-base';
import {Colors} from '../../theme';
import styles from './CommonLoaderStyles.js';

export const CommonLoader = (props) => {
  const {loading, ...attributes} = props;
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Spinner color={Colors.primaryColor} />
          <Text style={styles.loading_txt}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

export default CommonLoader;
