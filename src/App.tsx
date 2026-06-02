import Header from "./components/Header";
import CurrentlyPlaying from "./components/CurrentlyPlaying.tsx";
import Playlist from "./components/Playlist.tsx";
import Voting from "./components/Voting.tsx";
import Footer from "./components/Footer.tsx";

const API_URL = `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}`;

function App() {
    console.log(API_URL)
    return (
        <>
            <Header />
            <CurrentlyPlaying />
            <Voting/>
            <Playlist />
            <Footer />
        </>
    )
}

export default App
