import { StatusBar } from 'expo-status-bar';
import { ScrollView, Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '../utils/themes';

export default function Home() {

  return (
    <SafeAreaView className="flex-1 relative bg-gray-50">
      <StatusBar style='dark' />

        {/* header */}
        <View className="flex flex-1">

        {/* brand, navbar and notifications */}
        <View className="flex-1 flex-row justify-between items-center max-h-24 mx-4">
          
          {/* brand & navbar */}
          <View className="flex-row items-center gap-4">

            {/* navbar */}
            <TouchableOpacity>
              <Image 
               source={require('@/assets/icons/burger.png')}
               tintColor={'gray'}
               className="h-5 w-6" />
            </TouchableOpacity>

            {/* brand */}
            <View>
              <Text className="text-neutral-900 text-3xl tracking-widest font-bold">DIGITECH</Text>
            </View>

          </View>

          {/* notifications */}
          <View>
            <TouchableOpacity>
              <Image 
                source={require('@/assets/icons/notifications.png')}
                tintColor={'gray'}
                className="h-8 w-8" />
            </TouchableOpacity>
          </View>

        </View>

        {/* search */}
        <View className="flex-row mx-2">

          {/* search bar */}
          <View 
          style={{backgroundColor: theme.bgWhite(1)}}
          className="flex-row flex-1 rounded-xl items-center justify-start gap-4 overflow-hidden z-50 py-1 px-4 border border-gray-400">

            {/* search icon */}
            <View>
              <Image 
              source={require('@/assets/icons/search.png')}
              tintColor={'gray'}
              className="h-6 w-6"
              />
            </View>

            {/* search input */}
            <View>
              <TextInput 
              placeholder='Search for a product...'
              placeholderTextColor={'gray'}
              cursorColor={'black'}
              className="text-black text-xl"
                />
            </View>

          </View>
        </View>
        </View>

    </SafeAreaView>
  );
}
