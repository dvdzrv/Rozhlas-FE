import logo from "../assets/hammerwerk_b.svg";

function Header() {
    return (
        <div className="flex-1 p-5 mx-auto w-full">
            <div className="text-center py-[30px] px-5 bg-linear-to-br from-[#1DB954] to-[#191414] rounded-[20px] mb-[30px] text-white shadow-[0_10px_30px_rgba(29,185,84,0.2)]">
                <img src={logo} alt="LOGO" className="mx-auto w-[500px] mb-[30px] "/>
                {/*<h1 className="text-[2.8rem] mb-[15px]">🎧 Vitajte v školskom rozhlase Hammerwerk!</h1>*/}
                <p className="text-[1.3rem] opacity-90 max-w-[600px] mx-auto">
                    Hlasujte aká pesnička zahrá ako ďalšia v rozhlase.
                </p>
            </div>
        </div>
    );
}

export default Header;