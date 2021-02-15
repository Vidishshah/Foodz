import React from 'react';
import {Text, View} from 'react-native';
import styles from './FloatTextinputStyles';
import {Item, Input, Label, Icon} from 'native-base';

export const FloatTextinput = (props) => {
  const {iconType, iconName, labelName, iconStyle, labelStyle, onPress} = props;
  return (
    <Item floatingLabel style={styles.mainView}>
      <Label style={labelStyle}>{labelName}</Label>
      <Input {...props} />
      <Icon
        type={iconType}
        name={iconName}
        style={[iconStyle]}
        onPress={onPress}
      />
    </Item>
  );
};
