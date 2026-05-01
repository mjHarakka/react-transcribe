import { StyleSheet, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, IconButton } from 'react-native-paper'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { deleteNote } from '../db/notes'
import AudioPlayer from '../components/AudioPlayer'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'NoteDetail'>
type RouteType = RouteProp<RootStackParamList, 'NoteDetail'>

export default function NoteDetail() {
  const navigation = useNavigation<NavigationProp>()
  const route = useRoute<RouteType>()
  const { note } = route.params

  function handleDelete() {
    deleteNote(note.id)
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} onPress={() => navigation.goBack()} />
        <IconButton icon="trash-can-outline" size={24} onPress={handleDelete} />
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text variant="labelMedium" style={styles.label}>VOICE RECORDING</Text>
        <Text variant="headlineSmall" style={styles.title}>{note.name}</Text>
        {note.summary && (
          <View style={styles.section}>
            <Text variant="labelMedium" style={styles.label}>SUMMARY</Text>
            <Text variant="bodyMedium">{note.summary}</Text>
          </View>
        )}
        {note.transcription && (
          <View style={styles.section}>
            <Text variant="labelMedium" style={styles.label}>TRANSCRIPTION</Text>
            <Text variant="bodyMedium">{note.transcription}</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.playbar}>
        <AudioPlayer uri={note.text} iconColor="#fff" size={48} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  label: {
    color: '#888',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  title: {
    fontWeight: '600',
    marginBottom: 32,
  },
  section: {
    marginTop: 32,
  },
  playbar: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 8,
    alignItems: 'center',
  },
})
