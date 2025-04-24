import { useState, useEffect } from "react";

type barProps = {
    onSelectMovie: (selection: string) => void;
};

export default function BrowseBar(props: barProps) {
    const [moviesArray, setMoviesArray] = useState<string[]>([]);
    const [selectedMovie, setSelectedMovie] = useState("Select a movie");
    const [openMenu, setOpenMenu] = useState(false)

    useEffect(() => {
        const options = { method: "GET" };
        const fetchMovies = async () => {
            try {
                const response = await fetch("https://mjclaypool.pythonanywhere.com/movies_list", options);
                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`);
                }
                const data = await response.json();
                setMoviesArray(data);
            } catch (error) {
                console.error("Fetching error:", error);
            }
        };
        fetchMovies();
    }, []);

    function toggleOpenMenu() {
        if (openMenu) {
            setOpenMenu(false)
        } else {
            setOpenMenu(true)
        }
    }

    return (
        <div className="flex flex-col gap-1">
            <h3 className="text-zinc-200 text-[14px] font-[Roboto]">Browse</h3>
            <div className="relative flex flex-col">
                <div
                    className="flex justify-between items-center bg-white text-[16px] font-[Roboto] rounded-[6px] py-2 px-3 w-full cursor-pointer"
                    onClick={toggleOpenMenu}
                >
                    <p>{selectedMovie}</p>
                    <div className="flex justify-center w-5 h-5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
                    </div>
                    
                </div>
                {openMenu && 
                    <div className="absolute top-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-full z-10 h-[286px] overflow-scroll">
                        {moviesArray.map((movie) => (
                            <div
                                key={movie + Math.random()}
                                className="px-3 py-2 text-[16px] font-[Roboto] hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setSelectedMovie(movie);
                                    props.onSelectMovie(movie);
                                    setOpenMenu(false)
                                }}
                            >
                                {movie}
                            </div>
                        ))}
                    </div>
                }
            </div>
            <p className="text-zinc-200/50 text-[12px] font-[Roboto]">Browse and select a movie from the list</p>
        </div>
    );
}