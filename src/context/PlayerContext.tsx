import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { SongType } from '../components/SongType';

interface PlayerContextType {
    currentlyPlayingSong: SongType | undefined;
    remainingTime: number;
    error: string | null;
    refreshSong: () => Promise<void>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
};

const API_URL = `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}`;

async function fetchCurrentlyPlayingSong(): Promise<SongType> {
    const response = await fetch(`${API_URL}/current_song`);
    if (!response.ok) {
        throw new Error(`Failed to fetch currently playing song: ${response.statusText}`);
    }
    return response.json();
}

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentlyPlayingSong, setCurrentlyPlayingSong] = useState<SongType>();
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const refreshSong = async () => {
        try {
            const song = await fetchCurrentlyPlayingSong();
            setCurrentlyPlayingSong(song);
            setRemainingTime(song.time_remaining);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Nepodarilo sa načítať novú pieseň.");
        }
    };

    // Initial fetch
    useEffect(() => {
        refreshSong();
    }, []);

    // Timer interval
    useEffect(() => {
        if (!currentlyPlayingSong) return;

        const interval = setInterval(() => {
            setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [currentlyPlayingSong]);

    // Auto-refresh when timer ends
    useEffect(() => {
        if (currentlyPlayingSong && remainingTime === 0) {
            refreshSong();
        }
    }, [remainingTime, currentlyPlayingSong]);

    return (
        <PlayerContext.Provider value={{ currentlyPlayingSong, remainingTime, error, refreshSong }}>
            {children}
        </PlayerContext.Provider>
    );
};
