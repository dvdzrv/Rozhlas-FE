import {useEffect, useState} from "react";
import { fetchCurrentlyPlaylingSong } from "./fetchCurrentSong.ts";
import type { CandidateType } from "./CandidateType.ts";
import VotingCard from "./VotingCard.tsx"



const API_URL = `${import.meta.env.VITE_API_URL || 'https://api.sostrv.org'}`;



async function fetchCurrentCandidates():Promise<[CandidateType]> {
    const response = await fetch(`${API_URL}/voting`);

    if (!response.ok) {
        throw new Error(`Failed to fetch currently candidates:${response.statusText}`)
    }

    return await response.json();
}



function Voting() {
    //Vytvorenie stavu momentálnych kandidátov
    const [currentCandidates, setCurrentCandidates] = useState<[CandidateType]>();

    //Vytvorenie stavu počtu sekúnd do konca prehrávanej piesne
    const [remainingTime, setRemainingTime] = useState<number>(0);

    //Vytvorenie stavu pre hlasovanie
    const [voted, setVoted] = useState<boolean>(false);

    //setError nastaví error na nejaký string, ktorý vypíšeme používateľovi
    const [error, setError] = useState<null | string>(null);

    //Prvé načítanie
    useEffect(() => {
        //Fetchne kandidátov
        fetchCurrentCandidates()
            .then((data) => {
                //Setne kandidátov
                setCurrentCandidates(data);
                setError(null);
            })
            .catch((err) => {
                setError(err);
            })

        //Fetchne ostávajúci čas na momentálne prehrávajúcej piesni
        fetchCurrentlyPlaylingSong()
            .then((data) => {
                //Setne ostávajúci čas na momentálne prehrávajúcej piesni
                setRemainingTime(data.time_remaining)
                setError(null);
            })
            .catch((err) => {
                setError(err);
            })
    }, []);

    //Časovač, refreshne sa keď sa vymenia kandidáti
    useEffect(() => {
        //Ak nemáme kandidátov, nerob nič
        if (!currentCandidates) return;

        //Nastav časovač o 1 sekundu menej každú sekundu
        const interval = setInterval(() => {
            setRemainingTime(prev => prev - 1)
        }, 1000);

        //Vymaž tento časovač na konci
        return () => clearInterval(interval);

        //Vykonaj vždy keď sú zmenený kandidáti
    }, [currentCandidates]);


    useEffect(() => {
        //Pokiaľ je timer viac ako 0 nerob nič
        if (remainingTime > 0) return;

        async function refreshVoting() {
            try {
                const candidates = await fetchCurrentCandidates();
                //Vymeň kandidátov
                setCurrentCandidates(candidates);
                //Fetchovanie času do konca novej prehrávanej piesne
                fetchCurrentlyPlaylingSong()
                    .then((data) => {
                        setRemainingTime(data.time_remaining)
                        setError(null);
                    })
                    .catch((err) => {
                        setError(err);})
                    setVoted(false);
            } catch (err) {
                setError("Nepodarilo sa načítať novú pieseň.")
                console.log(err);
            }
        }

        refreshVoting();

        //Vykonaj vždy keď sa zmení časovač
    }, [remainingTime]);


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
                    <VotingCard id={index} embedUrl={candidate.embed_url} vote={voted} setVote={setVoted} />
                )
            )}
        </div>
    )
}


export default Voting;