import {Icon} from 'native-base';
import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

const screenHeight = Dimensions.get('window').height;

export class ItemDetails extends Component {
  constructor(props) {
    super(props);
    const {navigation, route} = this.props;
    this.state = {
      productName: route.params.items.name,
      productImage: route.params.items.photo,
      productDesc: route.params.items.desc,
      productPrice: route.params.items.price,
      initialQuantity: 0,
    };
  }

  increaseQuantity = () => {
    const {initialQuantity} = this.state;
    this.setState({
      initialQuantity: initialQuantity + 1,
    });
  };

  decreaseQuantity = () => {
    const {initialQuantity} = this.state;
    if (initialQuantity != 0) {
      this.setState({
        initialQuantity: initialQuantity - 1,
      });
    }
  };

  render() {
    const {
      productName,
      productImage,
      initialQuantity,
      productPrice,
      productDesc,
    } = this.state;
    return (
      <>
        <SafeAreaView style={{flex: 1, backgroundColor: '#F0F8FF'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              alignSelf: 'center',
              borderBottomWidth: 0.5,
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            }}>
            <View style={{width: '20%'}}>
              <Icon
                type="MaterialIcons"
                name="keyboard-arrow-left"
                style={{color: '#191919', fontSize: 40}}
                onPress={() => this.props.navigation.goBack()}
              />
            </View>
            <View
              style={{
                width: '60%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 20}}>{productName}</Text>
            </View>
            <View
              style={{
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Icon
                type="Entypo"
                name="chat"
                style={{color: '#191919', fontSize: 25}}
                onPress={() => this.props.navigation.navigate('Chats')}
              />
              </View>
          </View>
          <ScrollView style={{flex: 1}}>
            <View style={{width: '100%', height: (screenHeight * 40) / 100}}>
              <Image
                source={productImage}
                style={{height: '100%', width: '100%'}}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                top: (screenHeight * 37) / 100,
                borderRadius: 30,
                width: '40%',
                alignSelf: 'center',
                height: 50,
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: '#fff',
              }}>
              <TouchableOpacity>
                <Icon
                  type="Feather"
                  name="minus"
                  style={{color: '#191919', fontSize: 20}}
                  onPress={this.decreaseQuantity}
                />
              </TouchableOpacity>
              <View>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {initialQuantity}
                </Text>
              </View>
              <TouchableOpacity>
                <Icon
                  type="Feather"
                  name="plus"
                  style={{color: '#191919', fontSize: 20}}
                  onPress={this.increaseQuantity}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: '12%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>{`${productName} - ${productPrice}`}</Text>
            </View>
            <View
              style={{
                marginTop: '5%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 14}}>{`${productDesc}`}</Text>
            </View>
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: (screenHeight * 25) / 100,
              backgroundColor: '#fff',
              width: '100%',
            }}>
            <View
              style={{
                marginTop: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
              }}>
              <Text style={{fontSize: 20}}>{productName}</Text>
              <Text style={{fontSize: 20}}>{`${initialQuantity === 0 ? 0 : productPrice * initialQuantity}`}</Text>
            </View>
            <TouchableOpacity
              style={{
                marginTop: '20%',
                backgroundColor: '#FC6D3F',
                borderRadius: 30,
                height: 50,
                width: '90%',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', fontSize: 20}}>Order Now</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default ItemDetails;
