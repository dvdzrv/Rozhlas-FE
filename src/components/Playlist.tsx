import { useState, useEffect } from "react";
import type {PlaylistType} from "./PlaylistType.ts";

const API_URL = `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}`;

async function fetchCurrentPlaylist(): Promise<PlaylistType> {
    const response = await fetch(`${API_URL}/playlist`);

    if (!response.ok) {
        throw new Error(`Failed to fetch current playlist:${response.statusText}`)
    }

    const data = await response.json();
    return data;
}

function Playlist() {
    //setCurrentPlaylist nastaví currentPlaylist a prerenderuje všetky elementy používajúce túto premennú
    const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistType>();

    //setError nastaví error na nejaký string, ktorý vypíšeme používateľovi
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        fetchCurrentPlaylist()
            .then((data) => {
                //Nastavíme momentálny playlist na fetchnutý playlist
                setCurrentPlaylist(data)

                //Nenastal error, takže nastavíme error na null
                setError(null);
            })
            .catch((err) => {
                setError(err);
            })
    }, []);

    if(error) {
        return (
            <div className="text-red-500 font-bold border-8 border-red-500">
                Nepodarilo sa načítať momentálny playlist.
            </div>
        )
    }

    if(!currentPlaylist) {
        return (
            <>
                Načítavam...
            </>
        )
    }

    return (
        <div className="mt-10">
            <iframe data-testid="embed-iframe" className="border-radius:12px"
                    src={currentPlaylist.embed_url}
                    width="100%" height="600"
                    loading="lazy">
            </iframe>
        </div>
    )
}

export default Playlist;