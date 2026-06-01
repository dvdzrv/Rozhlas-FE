const API_URL = `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}`;


function VotingCard(
    {id, embedUrl, voted}:
    {id: number, embedUrl: string, voted: boolean}
) {
    return (
        <div className="flex flex-col items-center p-1 w-full">
            <iframe data-testid="embed-iframe" className="rounded-[12px] w-110 h-72"
                    src={embedUrl}
                    height="200"
            >
            </iframe>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-[12px] w-96"
            onClick={() => {
                fetch(`${API_URL}/vote?song_id=${id}`, {method: "POST"});
            }}
            disabled={!voted}
            >
                Hlasuj.
            </button>
        </div>
    )
}

export default VotingCard;