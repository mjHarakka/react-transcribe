import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from 'react-native'

function useNotes() {
  const [notes, setNotes] = useState([])

  function addNote(text) {
    setNotes((prev) => [...prev, { id: Date.now(), text }])
  }

  return { notes, addNote }
}

export default function App() {
  const { notes, addNote } = useNotes()
  const [input, setInput] = useState('')

  function handleAdd() {
    if (!input.trim()) return
    addNote(input.trim())
    setInput('')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder='New note...'
      />
      <Button title='Add' onPress={handleAdd} />
      <FlatList
        data={notes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Text style={styles.note}>{item.text}</Text>}
      />
      <StatusBar style='auto' />
    </View>
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  note: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
})
