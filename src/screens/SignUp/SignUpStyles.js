import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../theme';

// const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  mainView: {width: '100%'},
  headerTextView: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  headerText: {
    fontSize: 28,
    color: Colors.MainText,
    // fontFamily: Fonts.fontBold,
  },
  taxtInputView: {
    width: '80%',
    marginTop: '5%',
    alignSelf: 'center',
    marginBottom: 5
  },
  inputPlaceholder: {
    // fontSize: FontSize.medium,
    color: Colors.InputLabel,
    // fontFamily: Fonts.fontRegular,
  },
  loginBtnView: {
    height: 50,
    width: '80%',
    marginTop: '10%',
    alignSelf: 'center',
    backgroundColor: Colors.Primary_Color
  },
  errormsg: {
    color: 'red',
  },
  registerBtn: {
    marginTop: '10%',
    width: '80%',
    alignSelf: 'center',
    backgroundColor: Colors.MainText,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }
});
