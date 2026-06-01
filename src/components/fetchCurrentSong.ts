import type {SongType} from "./SongType.ts";

const API_URL = `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}`;

export async function fetchCurrentlyPlaylingSong(): Promise<SongType> {
    const response = await fetch(`${API_URL}/current_song`);

    if (!response.ok) {
        throw new Error(`Failed to fetch currently playing song:${response.statusText}`)
    }

    return await response.json();
}