import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {CommonLoader, FloatTextinput} from '../../components';
import {Colors} from '../../theme';
import styles from './SignUpStyles';
import {Login_Button} from '../../assets';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import BASE_URL from '../../config/Config';

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: '',
      lname: '',
      email: '',
      errors: {},
      password: '',
      cpassword: '',
      show: false,
      visible: true,
      shows: false,
      visibles: true,
      isloading: false,
    };
  }

  inputChangeHandler = (name) => (event) => {
    this.setState({
      [name]: event,
    });
  };

  signUpValidation = () => {
    const {email, password, fname, lname, cpassword} = this.state;
    let errors = {};
    let IsValid = true;
    let fullname = /^[A-Z][A-Za-z\s]*$/;
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (!fname) {
      IsValid = false;
      errors['fname'] = 'enter first name';
    } else if (fullname.test(fname) == false) {
      IsValid = false;
      errors['fname'] = 'enter only characters';
    }

    if (!lname) {
      IsValid = false;
      errors['lname'] = 'enter last name';
    } else if (fullname.test(lname) == false) {
      IsValid = false;
      errors['lname'] = 'enter only characters';
    }

    if (!email) {
      IsValid = false;
      errors['email'] = 'please enter email';
    } else if (reg.test(this.state.email) == false) {
      IsValid = false;
      errors['email'] = 'please enter Valid email';
    } else {
      null;
    }

    if (!password) {
      IsValid = false;
      errors['password'] = 'please enter password';
    } else if (this.state.password.length <= 5) {
      IsValid = false;
      errors['password'] = 'password must be atleast 6 characters';
    } else {
      null;
    }

    if (!cpassword) {
      IsValid = false;
      errors['cpassword'] = 'enter confirm password';
    } else if (password !== cpassword) {
      IsValid = false;
      errors['cpassword'] = 'password did not match';
    } else {
      null;
    }

    this.setState({
      errors: errors,
    });

    return IsValid;
  };

  _changeIcon = () => {
    const {show, visible} = this.state;
    this.setState({
      show: !show,
      visible: !visible,
    });
  };

  _changeIcons = () => {
    const {shows, visibles} = this.state;
    this.setState({
      shows: !shows,
      visibles: !visibles,
    });
  };

  registerAccount = () => {
    if (this.signUpValidation()) {
      this.setState({
        isloading: true,
      });
      const {fname, lname, email, password, isloading, cpassword} = this.state;
      let signupObj = {
        first_name: fname,
        last_name: lname,
        email: email,
        password: password,
        username: email,
      };
      console.log('signupObj', signupObj);
      axios({
        url: BASE_URL + 'users/add/new-user',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: signupObj,
      })
        .then((res) => {
          console.log('res', res);
          if (res.data.success) {
            this.setState({
              isloading: false,
            });
            Toast.show(res.data.message, Toast.LONG);
            this.setState({
              isloading: false,
            }),
              this.props.navigation.navigate('Login');
          } else {
            this.setState({
              isloading: false,
            });
            Toast.show('Signup Failed.', Toast.LONG);
            // res.data.error
          }
        })
        .catch((err) => {
          this.setState({
            isloading: false,
          });
        });
      this.setState({
        email: '',
        password: '',
        fname: '',
        lname: '',
        cpassword: '',
      });
    } else {
      this.setState({
        isloading: false,
      });
      Toast.show('Fill all details', Toast.LONG);
    }
  };

  render() {
    const {
      email,
      password,
      errors,
      visible,
      show,
      isloading,
      fname,
      lname,
      cpassword,
      shows,
      visibles,
    } = this.state;
    return (
      <>
        {isloading ? <CommonLoader /> : null}
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
            <View style={styles.mainView}>
              <View style={styles.headerTextView}>
                <Text style={styles.headerText}>{'SignUp'}</Text>
              </View>
              <View style={styles.taxtInputView}>
                <FloatTextinput
                  value={fname}
                  labelName={'First Name'}
                  labelStyle={styles.inputPlaceholder}
                  iconStyle={{color: Colors.MainText}}
                  onChangeText={this.inputChangeHandler('fname')}
                  autoCapitalize="none"
                />
                {errors.fname != undefined && (
                  <Text style={styles.errormsg}>{errors.fname}</Text>
                )}
              </View>
              <View style={styles.taxtInputView}>
                <FloatTextinput
                  value={lname}
                  labelName={'Last Name'}
                  labelStyle={styles.inputPlaceholder}
                  iconStyle={{color: Colors.MainText}}
                  onChangeText={this.inputChangeHandler('lname')}
                  autoCapitalize="none"
                />
                {errors.lname != undefined && (
                  <Text style={styles.errormsg}>{errors.lname}</Text>
                )}
              </View>
              <View style={styles.taxtInputView}>
                <FloatTextinput
                  value={email}
                  labelName={'Email'}
                  labelStyle={styles.inputPlaceholder}
                  iconStyle={{color: Colors.MainText}}
                  onChangeText={this.inputChangeHandler('email')}
                  autoCapitalize="none"
                />
                {errors.email != undefined && (
                  <Text style={styles.errormsg}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.taxtInputView}>
                <FloatTextinput
                  value={password}
                  iconType="Ionicons"
                  iconName={show === false ? 'eye-off-outline' : 'eye-outline'}
                  labelName={'Password'}
                  labelStyle={styles.inputPlaceholder}
                  iconStyle={{color: Colors.MainText}}
                  onChangeText={this.inputChangeHandler('password')}
                  autoCapitalize="none"
                  secureTextEntry={visible}
                  onPress={this._changeIcon}
                />
                {errors.password != undefined && (
                  <Text style={styles.errormsg}>{errors.password}</Text>
                )}
              </View>
              <View style={styles.taxtInputView}>
                <FloatTextinput
                  value={cpassword}
                  iconType="Ionicons"
                  iconName={shows === false ? 'eye-off-outline' : 'eye-outline'}
                  labelName={'Confirm Password'}
                  labelStyle={styles.inputPlaceholder}
                  iconStyle={{color: Colors.MainText}}
                  onChangeText={this.inputChangeHandler('cpassword')}
                  autoCapitalize="none"
                  secureTextEntry={visibles}
                  onPress={this._changeIcons}
                />
                {errors.cpassword != undefined && (
                  <Text style={styles.errormsg}>{errors.cpassword}</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.registerBtn}
                onPress={this.registerAccount}>
                <Text style={{color: Colors.Primary_Color, fontSize: 22}}>
                  SignUp
                </Text>
              </TouchableOpacity>
              <View style={{marginTop: '10%', alignSelf: 'center'}}>
                <Text style={{fontSize: 15}}>
                  {' '}
                  Already have an account ?
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: Colors.MainText,
                    }}
                    onPress={() => this.props.navigation.navigate('Login')}>
                    {' '}
                    SignIn
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default Signup;
