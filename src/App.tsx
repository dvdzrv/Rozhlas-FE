import Header from "./components/Header";
import CurrentlyPlaying from "./components/CurrentlyPlaying.tsx";
import Playlist from "./components/Playlist.tsx";
import Voting from "./components/Voting.tsx";
import Footer from "./components/Footer.tsx";

function App() {
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
