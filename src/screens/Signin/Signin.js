import React, {Component} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {FloatTextinput, CommonLoader} from '../../components/index';
import styles from './SigninStyles';
import {Login_Button} from '../../assets';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../../theme';
import BASE_URL from '../../config/Config';
import axios from 'axios';

export class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      errors: {},
      password: '',
      show: false,
      visible: true,
      isloading: false,
    };
  }

  inputChangeHandler = (name) => (event) => {
    this.setState({
      [name]: event,
    });
  };

  loginValidation = () => {
    const {email, password} = this.state;
    let errors = {};
    let IsValid = true;
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

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

    this.setState({
      errors: errors,
    });

    return IsValid;
  };

  loginAccount = () => {
    if (this.loginValidation()) {
      this.setState({
        isloading: true,
      });
      const {email, password, isloading} = this.state;
      let loginObj = {
        email: email,
        password: password,
      };
      axios({
        url: BASE_URL + 'auth/login',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Application: 'application/json',
        },
        data: loginObj,
      })
        .then((res) => {
          console.log('res', res);
          if (res.data.success) {
            this.setState({
              isloading: false,
            });
            let userLogged = res.data.success;
            AsyncStorage.setItem('userData', userLogged);
            Toast.show('Login success.', Toast.LONG);
            setTimeout(() => {
              this.setState(
                {
                  isloading: false,
                },
                () => {
                  this.props.navigation.navigate('HomeStack');
                },
              );
            }, 1000);
          } else {
            this.setState({
              isloading: false,
            });
            Toast.show('Login Failed.', Toast.LONG);
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
      });
    } else {
      this.setState({
        isloading: false,
      });
      Toast.show('Fill all details', Toast.LONG);
    }
  };

  // loginAccount = async () => {
  //   this.setState({
  //     isloading: true,
  //   });
  //   const {isloading, email, password} = this.state;
  //   if (this.loginValidation()) {
  //     this.setState({
  //       isloading: true,
  //     });
  //     let userData = {
  //       email: 'test@test.com',
  //       password: 'test123',
  //     };
  //     const dataVerify =
  //       email === userData.email && password === userData.password;
  //     if (dataVerify === true) {
  //       this.setState({
  //         email: '',
  //         password: '',
  //         isloading: true,
  //       });
  //       await AsyncStorage.setItem('user', JSON.stringify(dataVerify));
  //       Toast.show('Login success.', Toast.LONG);
  //       setTimeout(() => {
  //         this.setState(
  //           {
  //             isloading: false,
  //           },
  //           () => {
  //             this.props.navigation.navigate('HomeStack');
  //           },
  //         );
  //       }, 1000);
  //     } else {
  //       this.setState({
  //         isloading: false,
  //         email: '',
  //         password: '',
  //       });
  //       Toast.show('Please enter correct credentials.', Toast.LONG);
  //     }
  //   } else {
  //     this.setState({
  //       isloading: false,
  //       email: '',
  //       password: '',
  //     });
  //     Toast.show('Please Enter fields and correct fields.', Toast.LONG);
  //   }
  // };

  _changeIcon = () => {
    const {show, visible} = this.state;
    this.setState({
      show: !show,
      visible: !visible,
    });
  };

  render() {
    const {email, password, errors, visible, show, isloading} = this.state;
    return (
      <>
        {isloading ? <CommonLoader /> : null}
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.mainView}>
            <View style={styles.headerTextView}>
              <Text style={styles.headerText}>{'Login'}</Text>
            </View>
            <View style={styles.taxtInputView}>
              <FloatTextinput
                value={email}
                // iconType="AntDesign"
                // iconName="checkcircleo"
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
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={this.loginAccount}>
              <Text style={{color: Colors.Primary_Color, fontSize: 22}}>
                SignIn
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
                  onPress={() => this.props.navigation.navigate('Signup')}>
                  {' '}
                  SignUp
                </Text>
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default Signin;
