import { Image } from 'react-native';
import { Tabs } from 'expo-router';

import '@/global.css';

export default function _layout () {
  return (
    <Tabs
    screenOptions={{
      tabBarShowLabel: false,
      headerShown: false,
      tabBarActiveTintColor: 'orange',
      tabBarInactiveTintColor: 'gray',
      tabBarBadgeStyle: {
        backgroundColor: 'red',
        marginRight: -8,
        marginTop: 2,
        height: 15
      },
      tabBarStyle: {
        height: 50,
      }
    }}>

      <Tabs.Screen 
      name='home' 
      options={{
        tabBarIcon: ({color}) => (
        <Image 
        source={require('@/assets/navigation/home.png')}
        className="h-6 w-6 mt-3"
        tintColor={color}/>
      )
      }}
      />

      <Tabs.Screen 
      name='search' 
      options={{
        tabBarIcon: ({color}) => (
        <Image 
          source={require('../../assets/navigation/search.png')} 
          className="h-6 w-6 mt-3" 
          tintColor={color}/>
        )
      }}
      />

      <Tabs.Screen 
      name='cart' 
      options={{
        tabBarBadge: 3,
        tabBarIcon: ({color}) => (
        <Image 
          source={require('../../assets/navigation/cart.png')} 
          className="h-8 w-8 mt-2" 
          tintColor={color}/>
        )
      }}
      />

      <Tabs.Screen 
      name='favorites' 
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({color}) => (
        <Image 
          source={require('../../assets/navigation/favorite.png')} 
          className="h-6 w-6 mt-3" 
          tintColor={color}/>
        )
      }}
      />

      <Tabs.Screen 
      name='profile' 
      options={{
        tabBarIcon: ({color}) => (
        <Image 
          source={require('@/assets/navigation/profile.png')} 
          className="h-6 w-6 mt-3" 
          tintColor={color}/>
        )
      }}
      />

    </Tabs>
  )
}