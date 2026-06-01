function SongBar(
    //Vytvorenie vstupov
    {remainingTime, durationSeconds, fillColor}:
    //Pretypovanie
    {remainingTime: number, durationSeconds: number, fillColor: string}) {

    //Výpočet v akom čase je prehrávaná pieseň
    const elapsedTime = durationSeconds - remainingTime;

    //Vypočítanie progresu v %
    const progressPercentage = (elapsedTime / durationSeconds) * 100

    //Vytvorenie funkcie ktorá zo sekúnd vytvorí naformátovaný čas vo formáte MM:SS
    function formatTime(seconds: number){
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    }

    return (
        <div className="w-full flex flex-col gap-2 font-mono text-sm">
            {/* Kontajner progress baru */}
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                {/* Vyfarbený progress bar */}
                <div
                    className="h-full transition-all ease-out duration-1000"
                    style={{
                        width: `${progressPercentage}%`,
                        backgroundColor: fillColor
                    }}
                ></div>
            </div>

            {/* Časové značky */}
            <div className="flex justify-between text-gray-600">
                <span>{formatTime(elapsedTime)}</span>
                <span>{formatTime(durationSeconds)}</span>
            </div>

        </div>
    )
}

export default SongBar;