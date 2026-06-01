import SongBar from "./SongBar.tsx";
import { usePlayer } from "../context/PlayerContext";

function CurrentlyPlaying() {
    const { currentlyPlayingSong, remainingTime, error } = usePlayer();

    if (error) {
        return (
            <div className="text-red-500 font-bold border-8 border-red-500">
                {error}
            </div>
        )
    }

    if (!currentlyPlayingSong) {
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