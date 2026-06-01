const API_URL = `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}`;


function VotingCard(
    {id, embedUrl, vote, setVote}:
    {id: number, embedUrl: string, vote:boolean, setVote: React.Dispatch<React.SetStateAction<boolean>>}
) {
    return (
        <div className="flex flex-col items-center p-1 w-full">
            <iframe data-testid="embed-iframe" className="rounded-[12px] w-110 h-72"
                    src={embedUrl}
                    height="200"
            >
            </iframe>
            <button className={`text-white font-bold py-2 px-4 rounded-[12px] w-96 ${vote? "bg-green-900 hover:bg-green-950" : "bg-green-500 hover:bg-green-700"}`}
            onClick={() => {
                fetch(`${API_URL}/vote?song_id=${id}`, {method: "POST"});
                setVote(true)
            }}
            disabled={vote}
            >
                {vote? "Už si hlasoval" : "Hlasuj."}
            </button>
        </div>
    )
}

export default VotingCard;