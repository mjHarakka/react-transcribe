import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, FlatList } from 'react-native'
import {
  PaperProvider,
  TextInput,
  Button,
  Text,
  Divider,
} from 'react-native-paper'

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

  function handleAdd() {
    if (!input.trim()) return
    setNotes((prev) => [...prev, { id: Date.now(), text: input.trim() }])
    setInput('')
  }

  function handleDelete(id) {
    setNotes((prev) => prev.filter((note) => note.id !== id))
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
