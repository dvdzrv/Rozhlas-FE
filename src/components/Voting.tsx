import {useEffect, useState} from "react";
import type {CandidateType} from "./CandidateType.ts";
import VotingCard from "./VotingCard.tsx"

const API_URL = `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}`;

async function fetchCurrentCandidates():Promise<[CandidateType]> {
    const response = await fetch(`${API_URL}/voting`);

    if (!response.ok) {
        throw new Error(`Failed to fetch currently candidates:${response.statusText}`)
    }

    const data = await response.json();
    return data;
}



function Voting() {
    //Vytvorenie stavu momentálnych kandidátov
    const [currentCandidates, setCurrentCandidates] = useState<[CandidateType]>();

    //setError nastaví error na nejaký string, ktorý vypíšeme používateľovi
    const [error, setError] = useState<null | string>(null);


    useEffect(() => {
        fetchCurrentCandidates()
            .then((data) => {
                setCurrentCandidates(data);
                setError(null);
            })
            .catch((err) => {
                setError(err);
            })
    }, []);





    if(error) {
        return (
            <div className="text-red-500 font-bold border-8 border-red-500">
                Nepodarilo sa načítať momentálne prehrávanú pieseň.
            </div>
        )
    }

    if(!currentCandidates) {
        return (
            <div className="text-white">
                Načítavam...
            </div>
        )
    }


    return (
        <div className="flex flex-row justify-center">
            {currentCandidates.map(
                (candidate, index) => (
                    <VotingCard id={index} embedUrl={candidate.embed_url} voted={false} />
                )
            )}
        </div>
    )
}


export default Voting;