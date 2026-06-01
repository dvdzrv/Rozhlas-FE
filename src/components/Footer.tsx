function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-[#191414] text-white pt-10 mt-[60px] rounded-t-[30px] max-md:rounded-t-[20px] max-md:pt-[30px]">
            <div className="max-w-[1200px] mx-auto px-5 pb-[30px] grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10 max-md:grid-cols-1 max-md:gap-[30px] max-md:pb-5">
                <div className="px-[15px] max-md:px-0">
                    <h3 className="text-[1.8rem] text-[#1DB954] mb-[15px] font-bold max-md:text-[1.6rem]">Školský Rozhlas</h3>
                    <p className="text-[#b3b3b3] leading-[1.6] text-[0.95rem]">
                        Interaktívny hudobný systém pre Strednú odbornú školu Technickú v Rožňave.
                    </p>
                </div>
                <div className="px-[15px] max-md:px-0">
                    <h4 className="text-[1.2rem] text-white mb-5 pb-2.5 border-b-2 border-[#1DB954] inline-block">Informácie</h4>
                    <ul className="list-none p-0 m-0">
                        <li className="mb-3 text-[#b3b3b3] text-[0.95rem] flex items-center gap-2.5 before:content-['•'] before:text-[#1DB954] before:font-bold before:text-[1.2rem]"> Pre všetkých v školskej sieti. </li>
                        <li className="mb-3 text-[#b3b3b3] text-[0.95rem] flex items-center gap-2.5 before:content-['•'] before:text-[#1DB954] before:font-bold before:text-[1.2rem]"> Hlasuj za svoju obľúbenú pesničku. </li>
                        <li className="mb-3 text-[#b3b3b3] text-[0.95rem] flex items-center gap-2.5 before:content-['•'] before:text-[#1DB954] before:font-bold before:text-[1.2rem]"> Vyberaj spolu so spolužiakmi čo bude hrať v rozhlase. </li>
                    </ul>
                </div>
            </div>

            <div className="text-center py-[25px] px-5 bg-black/30 border-t border-white/10">
                <p className="my-[5px] text-[#b3b3b3] text-[0.9rem]">© {currentYear} Stredná odborná škola Technická Hviezdoslavova 5, Rožňava | Vyvíjal Tomašík a Szomolai</p>
            </div>
        </footer>
    );
}

export default Footer;