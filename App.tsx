import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import {
  setupDatabase,
  getNotes,
  insertNote,
  deleteNote,
  Note,
} from './db/notes'
import NoteList from './components/NoteList'
import { useRecorder } from './hooks/useRecorder'

export default function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const { isRecording, startRecording, stopRecording } = useRecorder()

  useEffect(() => {
    setupDatabase()
    loadNotes()
  }, [])

  function loadNotes() {
    setNotes(getNotes())
  }

  function handleDelete(id: number) {
    deleteNote(id)
    loadNotes()
  }

  async function handleRecord() {
    if (isRecording) {
      const uri = await stopRecording()
      if (uri) {
        const name = new Date().toLocaleString()
        insertNote(name, uri)
        loadNotes()
      }
    } else {
      await startRecording()
    }
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <NoteList notes={notes} onDelete={handleDelete} />
        <StatusBar style='light' />
      </View>
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.recordButtonActive]}
          onPress={handleRecord}
        />
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
