import type { SongType } from './SongType.ts';

export interface CandidateType extends Omit<SongType, "time_remaining"> {
    votes: number
}