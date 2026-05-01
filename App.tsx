import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PaperProvider } from 'react-native-paper'
import { Note } from './db/notes'
import HomeScreen from './screens/HomeScreen'
import NoteDetail from './screens/NoteDetail'

export type RootStackParamList = {
  Home: undefined
  NoteDetail: { note: Note }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="NoteDetail" component={NoteDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
