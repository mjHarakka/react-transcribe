import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseSync('notes.db')

export type Note = {
  id: number
  name: string
  text: string
  transcription: string | null
  summary: string | null
}

export function setupDatabase() {
  db.execSync(
    'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL DEFAULT \'\', text TEXT NOT NULL);'
  )
  const migrations = [
    'ALTER TABLE notes ADD COLUMN name TEXT NOT NULL DEFAULT \'\';',
    'ALTER TABLE notes ADD COLUMN transcription TEXT;',
    'ALTER TABLE notes ADD COLUMN summary TEXT;',
  ]
  for (const sql of migrations) {
    try { db.execSync(sql) } catch { /* column already exists */ }
  }
}

export function getNotes(): Note[] {
  return db.getAllSync<Note>('SELECT * FROM notes ORDER BY id DESC;')
}

export function insertNote(name: string, text: string): number {
  const result = db.runSync('INSERT INTO notes (name, text) VALUES (?, ?);', [name, text])
  return result.lastInsertRowId
}

export function updateNoteTranscription(id: number, transcription: string, summary: string) {
  db.runSync('UPDATE notes SET transcription = ?, summary = ? WHERE id = ?;', [transcription, summary, id])
}

export function deleteNote(id: number) {
  db.runSync('DELETE FROM notes WHERE id = ?;', [id])
}
