import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 items-center p-6">
      
      <Text className="text-2xl">This is the profile page</Text>

    </SafeAreaView>
  )
}

