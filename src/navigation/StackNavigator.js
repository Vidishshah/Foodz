import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Signin from '../screens/Signin/Signin';
import Dashboard from '../screens/Dashboard/Dashboard';
import Signup from '../screens/SignUp/Signup';
import ItemDetails from '../screens/ItemDetails/ItemDetails';
import ChatScreen from '../screens/ChatScreen/ChatScreen';

var Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
    </Stack.Navigator>
  );
};

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="ItemDetails" component={ItemDetails} />
      <Stack.Screen 
      name="Chats" component={ChatScreen} 
        options={{
          headerShown: true
        }}
      />
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
};

// export const MyOrderStack = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="MyOrders" component={MyOrders} />
//     </Stack.Navigator>
//   );
// };

// export const RefillStack = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Refills" component={Refills} />
//     </Stack.Navigator>
//   );
// };

// export const TeleHealthStack = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="TeleHealth" component={TeleHealth} />
//     </Stack.Navigator>
//   );
// };

// export const SettingStack = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Settings" component={Settings} />
//     </Stack.Navigator>
//   );
// };
