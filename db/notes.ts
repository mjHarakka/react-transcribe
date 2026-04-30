import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseSync('notes.db')

export type Note = {
  id: number
  name: string
  text: string
}

export function setupDatabase() {
  db.execSync(
    'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL DEFAULT \'\', text TEXT NOT NULL);'
  )
  // migrate existing installs that lack the name column
  try {
    db.execSync('ALTER TABLE notes ADD COLUMN name TEXT NOT NULL DEFAULT \'\';')
  } catch {
    // column already exists, ignore
  }
}

export function getNotes(): Note[] {
  return db.getAllSync<Note>('SELECT * FROM notes ORDER BY id DESC;')
}

export function insertNote(name: string, text: string) {
  db.runSync('INSERT INTO notes (name, text) VALUES (?, ?);', [name, text])
}

export function deleteNote(id: number) {
  db.runSync('DELETE FROM notes WHERE id = ?;', [id])
}
