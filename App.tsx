import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { PaperProvider, TextInput, Button } from 'react-native-paper'
import {
  setupDatabase,
  getNotes,
  insertNote,
  deleteNote,
  Note,
} from './db/notes'
import NoteList from './components/NoteList'

export default function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    setupDatabase()
    loadNotes()
  }, [])

  function loadNotes() {
    setNotes(getNotes())
  }

  function handleAdd() {
    if (!input.trim()) return
    insertNote(input.trim())
    setInput('')
    loadNotes()
  }

  function handleDelete(id: number) {
    deleteNote(id)
    loadNotes()
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TextInput
          mode='outlined'
          label='New note'
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <Button mode='contained' onPress={handleAdd} style={styles.addButton}>
          Add
        </Button>
        <NoteList notes={notes} onDelete={handleDelete} />
        <StatusBar style='auto' />
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },
  input: {
    marginBottom: 8,
  },
  addButton: {
    marginBottom: 16,
  },
})
