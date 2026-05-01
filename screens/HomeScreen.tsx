import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { setupDatabase, getNotes, insertNote, deleteNote, updateNoteTranscription, Note } from '../db/notes'
import NoteList from '../components/NoteList'
import { useRecorder } from '../hooks/useRecorder'
import { RootStackParamList } from '../App'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([])
  const { isRecording, startRecording, stopRecording } = useRecorder()
  const navigation = useNavigation<NavigationProp>()

  useEffect(() => {
    setupDatabase()
  }, [])

  useFocusEffect(
    useCallback(() => {
      setNotes(getNotes())
    }, [])
  )

  function handleDelete(id: number) {
    deleteNote(id)
    setNotes(getNotes())
  }

  async function handleRecord() {
    if (isRecording) {
      const uri = await stopRecording()
      if (uri) {
        const id = insertNote(new Date().toLocaleString(), uri)
        updateNoteTranscription(
          id,
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          'Lorem ipsum summary: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
        )
        setNotes(getNotes())
      }
    } else {
      await startRecording()
    }
  }

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <NoteList
          notes={notes}
          onDelete={handleDelete}
          onPress={(note) => navigation.navigate('NoteDetail', { note })}
        />
        <StatusBar style="light" />
      </View>
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.recordButtonActive]}
          onPress={handleRecord}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  toolbar: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 20,
    alignItems: 'center',
  },
  recordButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e53935',
  },
  recordButtonActive: {
    backgroundColor: '#b71c1c',
    transform: [{ scale: 0.9 }],
  },
})
