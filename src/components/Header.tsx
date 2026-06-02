import logo from "../assets/hammerwerk_b.svg";

function Header() {
    return (
        <div className="flex-1 p-5 mx-auto w-full">
            <div className="text-center py-[30px] px-5 bg-linear-to-br from-[#E3C207] to-[#191414] rounded-[20px] mb-[30px] text-white shadow-[0_10px_30px_rgba(29,185,84,0.2)]">
                <button className="bg-[#191414] absolute top-10 left-10 text-white hover:text-[#E3C207] transition-colors duration-300 rounded-full p-2">
                    <a href="https://hammerwerk.sostrv.org">{"<"}</a>
                </button>
                <a href="https://hammerwerk.sostrv.org" className="inline-block">
                    <img src={logo} alt="LOGO" className="mx-auto w-[500px] mb-[30px] "/>
                </a>
                {/*<h1 className="text-[2.8rem] mb-[15px]">🎧 Vitajte v školskom rozhlase Hammerwerk!</h1>*/}
                <p className="text-[1.3rem] opacity-90 max-w-[600px] mx-auto">
                    Hlasujte aká pesnička zahrá ako ďalšia v rozhlase.
                </p>
            </div>
        </div>
    );
}

export default Header;