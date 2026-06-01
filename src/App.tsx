import Header from "./components/Header";
import CurrentlyPlaying from "./components/CurrentlyPlaying.tsx";
import Playlist from "./components/Playlist.tsx";
import Voting from "./components/Voting.tsx";
import Footer from "./components/Footer.tsx";
import { PlayerProvider } from "./context/PlayerContext";

function App() {
  return (
      <PlayerProvider>
          <Header />
          <CurrentlyPlaying />
          <Voting />
          <Playlist />
          <Footer />
      </PlayerProvider>
  )
}

export default App
