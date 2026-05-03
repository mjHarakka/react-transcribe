import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { setupDatabase, getNotes, insertNote, deleteNote, updateNoteTranscription, Note } from '../db/notes'
import { transcribeAudio } from '../services/transcribe'
import NoteList from '../components/NoteList'
import { useRecorder } from '../hooks/useRecorder'
import { RootStackParamList } from '../App'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([])
  const { isRecording, duration, startRecording, stopRecording } = useRecorder()
  const durationLabel = `${Math.floor(duration / 60).toString().padStart(2, '0')}:${(duration % 60).toString().padStart(2, '0')}`
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
        setNotes(getNotes())
        transcribeAudio(uri).then(({ transcription, summary }) => {
          updateNoteTranscription(id, transcription, summary)
          setNotes(getNotes())
        }).catch(console.error)
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
          onPress={(note) => navigation.navigate('NoteDetail', { id: note.id })}
        />
        <StatusBar style="light" />
      </View>
      <View style={styles.toolbar}>
        {isRecording && <Text style={styles.timer}>{durationLabel}</Text>}
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
  timer: {
    color: '#fff',
    fontSize: 16,
    fontVariant: ['tabular-nums'],
    marginBottom: 8,
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
