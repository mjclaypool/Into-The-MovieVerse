import { useState, useEffect, createContext, ReactNode } from "react";

type jsonData = {
    movie_date: number,
    movie_name: string,
    prediction: number,
    genre: string
    plot: string,
    poster: string
}

interface UserProgressContextType {
    activeMovie: jsonData,
    initialLoad: boolean,
    personalRecs: jsonData[],
    popularRecs: jsonData[],
    modalStatus: boolean,
    refreshStatus: string,
    hasRated: boolean,
    ratedMovies: string[]
    getMovieFromTitle: (title: string) => void,
    setActiveMovie: (selection: jsonData) => void,
    showModal: () => void,
    hideModal: () => void,
    postRating: (rating: number) => void,
    refreshRecs: () => void
}

const UserProgressContext = createContext<UserProgressContextType>({
    activeMovie: {
        movie_date: 0,
        movie_name: '',
        prediction: 0,
        genre: '',
        plot: '',
        poster: ''
    },
    initialLoad: true,
    personalRecs: [],
    popularRecs: [],
    modalStatus: false,
    refreshStatus: "",
    hasRated: false,
    ratedMovies: [],
    getMovieFromTitle: () => {},
    setActiveMovie: () => {},
    showModal: () => {},
    hideModal: () => {},
    postRating: () => {},
    refreshRecs: () => {}
})

export function UserProgressContextProvider( {children}: {children: ReactNode} ) {
    const [isOpen, setIsOpen] = useState(false)
    const [movieSelection, setMovieSelection] = useState({
        movie_date: 0,
        movie_name: '',
        prediction: 0,
        genre: '',
        plot: '',
        poster: ''
    })
    const [newUser, setNewUser] = useState(0)
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [userHasRated, setUserHasRated] = useState(false)
    const [personalizedRecs, setPersonalizedRecs] = useState<jsonData[]>([])
    const [popRecs, setPopRecs] = useState<jsonData[]>([])
    const [refreshStat, setRefreshStat] = useState("")
    const [myRatedMovies, setMyRatedMovies] = useState<string[]>([])

    useEffect(() => {
        const options = {method: 'GET'};
        fetch('https://mjclaypool.pythonanywhere.com/new_user', options)
        .then(response => response.json())
        .then(data => {
            setNewUser(data)
        })
        .catch(err => {
            console.error(err)
        });
    }, [])

    useEffect(() => {
        const options = {method: 'GET'};
        fetch('https://mjclaypool.pythonanywhere.com/popular_movies_list', options)
        .then(response => response.json())
        .then(data => {
            getPopularMovies(data)
        })
        .catch(err => {
            console.error("Error fetching popular movies list:", err);
        });
    }, [])

    function getPopularMovies(movies: string[]) {
        const options = {method: 'GET'}
        Promise.all(
            movies.map((movie) => {
            const year = movie.substring(movie.length - 5, movie.length - 1);
            let title = movie.substring(0, movie.length - 7);
            title = title.replace(/\([^)]*\)/g, "");
            let joinedStrTitle: string = title;
            if (title.includes(", ")) {
                const titleArr: string[] = title.split(", ");
                joinedStrTitle = titleArr.reverse().join(" ");
            }
            return fetch(`https://mjclaypool.pythonanywhere.com/omdb?t=${joinedStrTitle}&y=${year}`, options)
                .then(response => response.json())
                .then(data => ({
                    movie_date: Number(year),
                    movie_name: movie,
                    prediction: 0,
                    genre: String(data.Genre),
                    plot: String(data.Plot),
                    poster: String(data.Poster)
                }))
                .catch(err => {
                    console.error(err);
                    return null;
                });
            })
        ).then(results => {
            const validMovies = results.filter((movie): movie is jsonData => movie !== null);
            setPopRecs(validMovies);
        });
    }

    function getMovieFromTitle(movieTitle: string) {
        const options = {method: 'GET'};
        const year = movieTitle.substring(movieTitle.length - 5, movieTitle.length - 1)
        let title = movieTitle.substring(0, movieTitle.length - 7)
        title = title.replace(/\([^)]*\)/g, "");
        let joinedStrTitle: string = title
        if (title.includes(", ")) {
            const titleArr: string[] = title.split(", ")
            joinedStrTitle = titleArr.reverse().join(" ")
        }
        fetch(`https://mjclaypool.pythonanywhere.com/omdb?t=${joinedStrTitle}&y=${year}`, options)
            .then(response => response.json())
            .then(data => {
                const newProps = {
                    movie_date: Number(year),
                    movie_name: movieTitle,
                    prediction: 0,
                    genre: String(data.Genre),
                    plot: String(data.Plot),
                    poster: String(data.Poster)
                }
                setActiveMovie(newProps)
                console.log(newProps)
            })
            .catch(err => console.error(err));
    }

    function setActiveMovie(selection: jsonData) {
        setMovieSelection(selection)
    }

    function resetSelection() {
        setMovieSelection({
            movie_date: 0,
            movie_name: '',
            prediction: 0,
            genre: '',
            plot: '',
            poster: ''
        })
    }

    function showModal() {
        setIsOpen(true)
    }

    function hideModal() {
        setIsOpen(false)
        resetSelection()
    }

    function updateData(movieData: jsonData[]) {
        const fetchPromises = movieData.map((movie) => {
          const options = {method: 'GET'};
          const year = movie.movie_date
          const title = movie.movie_name.replace(/\([^)]*\)/g, "");
          let joinedStrTitle: string = title
          if (title.includes(", ")) {
            const titleArr: string[] = title.split(", ")
            joinedStrTitle = titleArr.reverse().join(" ")
          }
          return fetch(`https://mjclaypool.pythonanywhere.com/omdb?t=${joinedStrTitle}&y=${year}`, options)
            .then(response => response.json())
            .then(data => {
              return {
                ...movie,
                movie_name: movie.movie_name + " (" + movie.movie_date + ")",
                genre: data.Genre || "Unknown",
                plot: data.Plot || "No plot available",
                poster: data.Poster || "",
              }
            })
            .catch(err => {
              console.error(err)
              return movie
            })
        })
        Promise.all(fetchPromises).then((updatedMovieData) => {
          setPersonalizedRecs(updatedMovieData)
          setRefreshStat("complete")
          setIsInitialLoad(false)
        })
      }

    function postRating(rating: number) {
        fetch('https://mjclaypool.pythonanywhere.com/rating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user_id": newUser,
                "movie_title": movieSelection.movie_name,
                "rating": rating
            })
        })
        .then(response => {
            if (response.ok) {
                setMyRatedMovies([...myRatedMovies, movieSelection.movie_name])
                setUserHasRated(true)
                alert("Rating sucessfully updated!")
            } else {
                throw new Error("Failed to update rating.")
            }
        })
        .catch(error => {
            alert(`Error: ${error.message}`)
        })
        hideModal()
    }

    function refreshRecs() {
        setRefreshStat("loading")
        const options = {method: 'GET'};
        fetch(`https://mjclaypool.pythonanywhere.com/${newUser}/recommendations`, options)
        .then(response => response.json())
        .then(data => {
            updateData(data)
        })
        .catch(err => {
            console.error(err)
            setRefreshStat("")
        });
    }

    const userProgressCtx = {
        activeMovie: movieSelection,
        initialLoad: isInitialLoad,
        personalRecs: personalizedRecs,
        popularRecs: popRecs,
        modalStatus: isOpen,
        refreshStatus: refreshStat,
        hasRated: userHasRated,
        ratedMovies: myRatedMovies,
        getMovieFromTitle,
        setActiveMovie,
        showModal,
        hideModal,
        postRating,
        refreshRecs
    }

    return <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
}

export default UserProgressContext