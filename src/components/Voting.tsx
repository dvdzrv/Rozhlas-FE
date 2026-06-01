import { useEffect, useState } from "react";
import type { CandidateType } from "./CandidateType.ts";
import VotingCard from "./VotingCard.tsx";
import { usePlayer } from "../context/PlayerContext";

const API_URL = `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}`;

async function fetchCurrentCandidates(): Promise<CandidateType[]> {
    const response = await fetch(`${API_URL}/voting`);

    if (!response.ok) {
        throw new Error(`Failed to fetch current candidates: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}

function Voting() {
    const [currentCandidates, setCurrentCandidates] = useState<CandidateType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { currentlyPlayingSong } = usePlayer();

    const refreshCandidates = async () => {
        try {
            const data = await fetchCurrentCandidates();
            setCurrentCandidates(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Nepodarilo sa načítať kandidátov.");
        }
    };

    // Refresh candidates when component mounts OR when the currently playing song changes
    useEffect(() => {
        refreshCandidates();
    }, [currentlyPlayingSong]);

    if (error) {
        return (
            <div className="text-red-500 font-bold border-8 border-red-500">
                {error}
            </div>
        )
    }

    if (!currentCandidates.length) {
        return (
            <div className="text-white text-center py-10">
                Načítavam kandidátov...
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 gap-y-12 py-10 justify-items-center text-white">
            {currentCandidates.map((candidate, index) => (
                <VotingCard 
                    key={candidate.id || index} 
                    id={candidate.id || index} 
                    embedUrl={candidate.embed_url} 
                    voted={false} 
                />
            ))}
        </div>
    )
}

export default Voting;