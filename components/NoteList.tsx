import { StyleSheet, View, FlatList } from 'react-native'
import { IconButton, Surface, Text } from 'react-native-paper'
import { Note } from '../db/notes'
import AudioPlayer from './AudioPlayer'

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
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Surface style={styles.card} elevation={1}>
          <View style={styles.cardContent}>
            <Text variant='titleMedium' style={styles.name} numberOfLines={1}>
              {item.name || 'Untitled'}
            </Text>
            <View style={styles.actions}>
              <AudioPlayer uri={item.text} />
              <IconButton
                icon='trash-can-outline'
                size={22}
                onPress={() => onDelete(item.id)}
              />
            </View>
          </View>
        </Surface>
      )}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    padding: 12,
    gap: 8,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingLeft: 16,
    paddingRight: 4,
  },
  name: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
