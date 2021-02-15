import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {SIZES, Colors} from '../../theme';
import styles from './DashboardStyles';
import {
  burger_restaurant_1,
  pizza_restaurant,
  hot_dog_restaurant,
  japanese_restaurant,
  noodle_shop,
} from '../../assets';
import { Icon } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantData: [
        {
          id: 1,
          name: 'ByProgrammers Burger',
          photo: burger_restaurant_1,
          price: '150.00',
          desc: 'One of the best food ever and ever and ever',
        },
        {
          id: 2,
          name: 'ByProgrammers Pizza',
          photo: pizza_restaurant,
          price: '130.00',
          desc: 'One of the best food ever and ever and ever',
        },
        {
          id: 3,
          name: 'ByProgrammers Hotdogs',
          photo: hot_dog_restaurant,
          price: '60.00',
          desc: 'One of the best food ever and ever and ever',
        },
        {
          id: 4,
          name: 'ByProgrammers Sushi',
          photo: japanese_restaurant,
          price: '200.00',
          desc: 'One of the best food ever and ever and ever',
        },
        {
          id: 5,
          name: 'ByProgrammers Cuisine',
          photo: noodle_shop,
          price: '140.00',
          desc: 'One of the best food ever and ever and ever',
        },
      ],
    };
  }

  logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('AuthStack');
  };

  renderItem = ({item}) => {
    console.log('item', item);
    //   return false
    return (
      <TouchableOpacity
        style={{marginBottom: SIZES.padding * 2, marginTop: 10}}
        onPress={() =>
          this.props.navigation.navigate('ItemDetails', {
            items: item,
          })
        }>
        <View
          style={{
            marginBottom: SIZES.padding,
          }}>
          <Image
            source={item.photo}
            resizeMode="cover"
            style={{
              width: '100%',
              height: 200,
              borderRadius: SIZES.radius,
            }}
          />
        </View>

        <Text
          style={{
            fontSize: 20,
            paddingLeft: 5,
          }}>{`${item.name} - ${item.price}`}</Text>
        <Text
          style={{
            fontSize: 12,
            paddingLeft: 5,
            paddingTop: 5,
          }}>{`${item.desc}`}</Text>
      </TouchableOpacity>
    );
  };

  renderFoodLists = () => {
    return (
      <FlatList
        data={this.state.restaurantData}
        keyExtractor={(item) => `${item.id}`}
        renderItem={this.renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  };

  render() {
    return (
      <>
        <SafeAreaView style={{flex: 1}}>
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
              paddingBottom: 10
            }}>
            <View style={{width: '20%'}}>
            </View>
            <View
              style={{
                width: '60%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 25}}>Dashboard</Text>
            </View>
            <View
              style={{
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                 <Icon
                type="AntDesign"
                name="logout"
                style={{color: '#191919', fontSize: 25}}
                onPress={this.logout}
              />
              </View>
          </View>
          {this.renderFoodLists()}
        </SafeAreaView>
      </>
    );
  }
}

export default Dashboard;
