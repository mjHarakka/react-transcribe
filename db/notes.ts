import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseSync('notes.db')

export type Note = {
  id: number
  text: string
}

export function setupDatabase() {
  db.execSync(
    'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL);'
  )
}

export function getNotes(): Note[] {
  return db.getAllSync<Note>('SELECT * FROM notes ORDER BY id DESC;')
}

export function insertNote(text: string) {
  db.runSync('INSERT INTO notes (text) VALUES (?);', [text])
}

export function deleteNote(id: number) {
  db.runSync('DELETE FROM notes WHERE id = ?;', [id])
}
