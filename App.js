import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, FlatList } from 'react-native'
import {
  PaperProvider,
  TextInput,
  Button,
  Text,
  Divider,
} from 'react-native-paper'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseSync('notes.db')

function NoteList({ notes, onDelete }) {
  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => String(item.id)}
      keyboardShouldPersistTaps='handled'
      ItemSeparatorComponent={Divider}
      renderItem={({ item }) => (
        <View style={styles.noteRow}>
          <Text style={styles.note}>{item.text}</Text>
          <Button onPress={() => onDelete(item.id)}>Delete</Button>
        </View>
      )}
    />
  )
}

export default function App() {
  const [notes, setNotes] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    db.execSync(
      'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL);'
    )
    loadNotes()
  }, [])

  function loadNotes() {
    const rows = db.getAllSync('SELECT * FROM notes ORDER BY id DESC;')
    setNotes(rows)
  }

  function handleAdd() {
    if (!input.trim()) return
    db.runSync('INSERT INTO notes (text) VALUES (?);', [input.trim()])
    setInput('')
    loadNotes()
  }

  function handleDelete(id) {
    db.runSync('DELETE FROM notes WHERE id = ?;', [id])
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
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  note: {
    flex: 1,
  },
})
