import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';

import '@/global.css';

export default function Index () {

  return (
    <SafeAreaView className="flex-1 items-center p-6">

      <Text className='text-2xl'>Hello this is Cart</Text>

    </SafeAreaView>
  )
}