import { useState, useEffect } from "react"

type barProps = {
    onValidInput: (selection: string) => void
    onInvalidInput: () => void
}

export default function SearchBar( props: barProps ) {
    useEffect(() => {
        const options = {method: 'GET'};
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/movies_list', options)
                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`)
                }
                const data = await response.json()
                setMoviesArray(data)
            } catch (error) {
                console.error("Fetching error:", error)
            }
        }
        fetchMovies()
    }, [])

    const [search, setSearch] = useState('');
    const [showList, setShowList] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [moviesArray, setMoviesArray] = useState<string[]>([])
    const [filteredMovies, setFilteredMovies] = useState(moviesArray)

    useEffect(() => {
        const newFilteredMovies = moviesArray.filter(item => item.toLowerCase().includes(search.toLowerCase()));
        setFilteredMovies(newFilteredMovies.slice(0, 5));
        if (newFilteredMovies.length == moviesArray.length || search == newFilteredMovies[0])
            setShowList(false)
        else
            setShowList(true)
            props.onInvalidInput()
        if (search == newFilteredMovies[0])
            props.onValidInput(search)
    }, [search, props, moviesArray])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
        setInputValue(event.target.value)
    }

    const handleSelect = (item: string) => {
        setSearch(item)
        setInputValue(item)
    }

    return (
        <div className="flex flex-col gap-1">
            <h3 className="text-zinc-200 text-[14px] font-[Roboto]">Search</h3>
            <div className="relative flex flex-col">
                <input
                    type="text"
                    placeholder="Enter movie title"
                    value={inputValue}
                    className="bg-white text-[16px] font-[Roboto] rounded-[6px] py-2 px-3 w-full"
                    onChange={handleSearch}
                />
                {showList && (
                    <ul className="absolute top-[44px] bg-white w-full rounded-[6px]">
                        {filteredMovies.map((item) => (
                            <li
                                key={item}
                                className="text-[16px] font-[Roboto] px-3 my-2 hover:cursor-pointer"
                                onClick={() => handleSelect(item)}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <p className="text-zinc-200/50 text-[12px] font-[Roboto]">Search for your favorite movies</p>
        </div>
    )
}