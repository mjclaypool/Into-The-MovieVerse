import Modal from "./Modal";
import MovieCard from "./MovieCard"
import UserProgressContext from '../store/UserProgressContext';

import { useContext, useEffect, useState } from "react";

type jsonData = {
    movie_date: number,
    movie_name: string,
    prediction: number,
    genre: string
    plot: string,
    poster: string
}

type movieOptionsProps = {
    optionType: string
}

export default function MovieOptions( props: movieOptionsProps ) {
    const userProgressCtx = useContext(UserProgressContext)
    const [movieOptions, setMovieOptions] = useState<jsonData[]>([]);

    useEffect(() => {
        if (props.optionType == "personal") {
            const recLength = userProgressCtx.personalRecs.length
            let returnArr: jsonData[] = []
            for (let i = 0; i < recLength; i++) {
                if (!userProgressCtx.ratedMovies.includes(userProgressCtx.personalRecs[i].movie_name)) {
                    returnArr = [...returnArr, userProgressCtx.personalRecs[i]]
                }
            }
            setMovieOptions(returnArr);
        } else {
            const popLength = userProgressCtx.popularRecs.length
            let returnArr: jsonData[] = []
            for (let i = 0; i < popLength; i++) {
                if (!userProgressCtx.ratedMovies.includes(userProgressCtx.popularRecs[i].movie_name)) {
                    returnArr = [...returnArr, userProgressCtx.popularRecs[i]]
                }
            }
            setMovieOptions(returnArr);
        }
    }, [props.optionType, userProgressCtx.personalRecs, userProgressCtx.popularRecs, userProgressCtx.ratedMovies]);

    function handleClick(movieSelection: jsonData) {
        userProgressCtx.setActiveMovie(movieSelection)
        userProgressCtx.showModal()
    }

    return (
        <div className="flex space-x-6">
            {movieOptions.map(item => (
                <div key={item.movie_name} className="min-w-[220px] md:min-w-0" onClick={() => handleClick(item)}>
                    <MovieCard
                        date={item.movie_date}
                        title={item.movie_name}
                        rating={`${item.prediction}/5`}
                        genre={item.genre}
                        poster={item.poster}
                    />
                </div>
            ))}
            {userProgressCtx.modalStatus && <Modal />}
        </div>
    )
}