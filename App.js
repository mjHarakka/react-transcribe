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
        renderItem={({ item }) => (
          <View style={styles.noteRow}>
            <Text style={styles.note}>{item.text}</Text>
            <Button title='Delete' onPress={() => handleDelete(item.id)} />
          </View>
        )}
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
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  note: {
    flex: 1,
    paddingVertical: 8,
  },
})
