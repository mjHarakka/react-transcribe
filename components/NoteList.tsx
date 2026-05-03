import { StyleSheet, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import { IconButton, Surface, Text } from 'react-native-paper'
import { Note } from '../db/notes'
import AudioPlayer from './AudioPlayer'

type Props = {
  notes: Note[]
  onDelete: (id: number) => void
  onPress: (note: Note) => void
}

export default function NoteList({ notes, onDelete, onPress }: Props) {
  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => String(item.id)}
      keyboardShouldPersistTaps='handled'
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text variant='headlineSmall' style={styles.emptyTitle}>No recordings yet</Text>
          <Text variant='bodyMedium' style={styles.emptyHint}>
            Just start recording and I will transcribe it for you
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(item)}>
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
                  onPress={() =>
                    Alert.alert('Delete recording', 'This cannot be undone.', [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Delete', style: 'destructive', onPress: () => onDelete(item.id) },
                    ])
                  }
                />
              </View>
            </View>
          </Surface>
        </TouchableOpacity>
      )}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    padding: 12,
    gap: 8,
    flexGrow: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyTitle: {
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyHint: {
    color: '#888',
    textAlign: 'center',
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
