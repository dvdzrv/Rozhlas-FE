import type { Song } from './Song.ts';

export interface Candidate extends Omit<Song, "time_remaining"> {
    votes: number
}