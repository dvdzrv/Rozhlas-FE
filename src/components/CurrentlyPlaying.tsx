import { useState, useEffect } from 'react';
import {fetchCurrentlyPlaylingSong} from "./fetchCurrentSong.ts";
import type { SongType } from './SongType.ts';
import SongBar from "./SongBar.tsx";



function CurrentlyPlaying() {
    //setCurrentlyPlayingSong nastaví currentlyPlayingSong a prerenderuje všetky elementy používajúce túto premennú
    const [currentlyPlayingSong, setCurrentlyPlayingSong] = useState<SongType>();

    //Vytvorenie stavu počtu sekúnd do konca prehrávanej piesne
    const [remainingTime, setRemainingTime] = useState<number>(0);

    //setError nastaví error na nejaký string, ktorý vypíšeme používateľovi
    const [error, setError] = useState<null | string>(null);

    //Toto je taká haluška, že už píšem komenty
    //Fetchovanie momentálne prehrávanej piesne na prvom renderi
    //Vykoná sa iba na prvom render, kvôli [], ako 2. argument useEffect
    useEffect(() => {
        //Fetch momentálne prehrávanej piesne
        fetchCurrentlyPlaylingSong()
            //Keď príde response, vykoná sa lambda funkcia s argumentom data
            .then((data) => {
                //Nastavíme momentálne prehrávanú pieseň na fetchnutú pieseň
                setCurrentlyPlayingSong(data);

                //Nastavenie ostávajúceho času
                setRemainingTime(data.time_remaining);

                //Nenastal error, takže nastavíme error na null
                setError(null);
            })
            //Error handling ak response nie je ok
            //Vytvoríme lambda funkciu, ktorá setne error
            .catch((err) => {
                setError(err);
            })
    }, []);



    //Timer do konca prehrávanej piesne
    useEffect(() => {
        //Ak nie je prehrávaná pesnička, nevykonávaj nič
        if (!currentlyPlayingSong) return;

        //Nastav časovač o 1 sekundu menej každú sekundu
        const interval = setInterval(() => {
            setRemainingTime(prev => prev - 1)
        }, 1000);

        //Vymaž tento časovač na konci
        return () => clearInterval(interval);

        //Vykonaj vždy keď je zmenená prehrávaná pieseň
    }, [currentlyPlayingSong]);



    //Vymeň prehrávanú pieseň keď skončí timer
    useEffect(() => {
        //Pokiaľ je timer viac ako 0 nerob nič
        if (remainingTime > 0) return;

        //Vytvorenie funkcie, ktorá vymení pieseň
        async function refreshSong() {
            try {
                //Fetchni novú pieseň
                const song = await fetchCurrentlyPlaylingSong();

                //Nastav momentálne prehrávanú skladbu na fetchnutú pieseň
                setCurrentlyPlayingSong(song);

                //Nastav nový časovač
                setRemainingTime(song.time_remaining);

            } catch (err) {
                setError("Nepodarilo sa načítať novú pieseň.")
            }
        }

        refreshSong();

        //Vykonaj vždy keď sa zmení časovač
    }, [remainingTime]);








    if(error) {
        return (
            <div className="text-red-500 font-bold border-8 border-red-500">
                Nepodarilo sa načítať momentálne prehrávanú pieseň.
            </div>
        )
    }

    if(!currentlyPlayingSong) {
        return (
            <>
                Načítavam...
            </>
        )
    }

    return (
        <>
            <iframe data-testid="embed-iframe" className="border-radius:12px"
                    src={currentlyPlayingSong.embed_url} width="100%"
                    height="152"
                    loading="lazy">
            </iframe>
            <div className="mt-2 mb-2">
                <SongBar remainingTime={remainingTime} durationSeconds={currentlyPlayingSong.duration_seconds} fillColor="#24AC50"/>
            </div>
        </>
    )
}

export default CurrentlyPlaying;