import React, { createContext, useState, useContext } from 'react';
import { INote } from '@/interfaces/INote';

interface NoteContextType {
    notes: INote[];
    addNote: (note: INote) => void;
    deleteNote: (id: string) => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
    const [notes, setNotes] = useState<INote[]>([]);

    const addNote = (note: INote) => {
        setNotes([...notes, note]);
    };

    const deleteNote = (id: string) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote }}>
            {children}
        </NoteContext.Provider>
    )
}

export function useNotes() {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error('useNotes must be used within NoteProvider');
    }
    return context;
}