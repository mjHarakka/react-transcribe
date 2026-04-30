import { StyleSheet, View, FlatList } from 'react-native'
import { Button, Text, Divider } from 'react-native-paper'
import { Note } from '../db/notes'

type Props = {
  notes: Note[]
  onDelete: (id: number) => void
}

export default function NoteList({ notes, onDelete }: Props) {
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

const styles = StyleSheet.create({
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
