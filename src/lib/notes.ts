import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';

import { makeId } from './store';
import { tokens } from './tokens';

// On-device note store (the "actually works" feature). Add a note -> it appears
// in the grid and persists across reloads via AsyncStorage. No backend.

export type Note = { id: string; title: string; body: string; color: string };

const c = tokens.colors.note;
const SEED: Note[] = [
  {
    id: 'seed-1',
    title: 'Willkommen bei Google Notizen',
    body: 'Mit Google Notizen können Sie schnell Ihre Gedanken festhalten.\n\nZum Erstellen einer neuen Notiz verwenden Sie oben die Leiste „Notiz hinzufügen".',
    color: c.olive,
  },
  {
    id: 'seed-2',
    title: 'Liste erstellen',
    body: '☑ Sie können die Punkte in der Liste per Drag & Drop neu anordnen.\n☑ Haken Sie erledigte Notizen ab.',
    color: c.teal,
  },
  {
    id: 'seed-3',
    title: 'Alles an einem Ort',
    body: 'Wie auch immer Sie auf Ihre Notizen zugreifen, sie werden immer synchronisiert.\n\nIm Web: keep.google.com',
    color: c.brown,
  },
  {
    id: 'seed-4',
    title: 'Defqon Überleben',
    body: '6x Dosen Thunfisch\n4x Dosen Linseneintopf\n4x Packungen Harzer Roller\n1x Glas Erdnussbutter\n2x Packungen Toastbrot',
    color: c.default,
  },
];

const KEY = 'keep.notes';
let notes: Note[] = SEED;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function persist() {
  void AsyncStorage.setItem(KEY, JSON.stringify(notes));
  emit();
}

if (typeof window !== 'undefined') {
  void AsyncStorage.getItem(KEY).then((raw) => {
    if (raw) {
      notes = JSON.parse(raw) as Note[];
      emit();
    }
  });
}

export function addNote(title: string, body: string, color = c.default) {
  notes = [{ id: makeId(), title: title.trim(), body: body.trim(), color }, ...notes];
  persist();
}

export function useNotes(): Note[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => notes,
    () => notes,
  );
}
