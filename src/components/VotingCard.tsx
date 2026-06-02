const API_URL = `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}`;


function VotingCard(
    {id, embedUrl, vote, setVote}:
    {id: number, embedUrl: string, vote:boolean, setVote: React.Dispatch<React.SetStateAction<boolean>>}
) {
    return (
        <div className="flex flex-col items-center p-1 w-full md:w-auto">
            <iframe data-testid="embed-iframe" className="rounded-[12px] w-full max-w-[440px] xl:max-w-[560px] 2xl:max-w-[800px] h-72 xl:h-80 2xl:h-96"
                    src={embedUrl}
                    height="200"
            >
            </iframe>
            <button className={`text-black font-bold py-2 px-4 rounded-[12px] w-full max-w-[384px] xl:max-w-[480px] 2xl:max-w-[600px] ${!vote? "bg-[#E3C207] hover:bg-[#A0A207]" : "bg-[#6e6b37] hover:bg-[#3e3b17]"}`}
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