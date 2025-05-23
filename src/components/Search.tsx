import { useState, useContext } from "react"

import BrowseBar from "./BrowserBar"
import Button from "../UI/Button"
import Modal from "./Modal"
import SearchBar from "./SearchBar"
import TitleSection from "./TitleSection"
import UserProgressContext from "../store/UserProgressContext"


type searchProps = {
    title: string
}

export default function Search( props: searchProps ) {
    const userProgressCtx = useContext(UserProgressContext)
    const [btnStatus, setBtnStatus] = useState("disabled")
    const [movieTitle, setMovieTitle] = useState("")

    function handleValidInput(selection: string) {
        setBtnStatus("enabled")
        setMovieTitle(selection)
    }

    function handleInvalidInput() {
        setBtnStatus("disabled")
    }

    function handleClick(title: string) {
        if (btnStatus == "enabled")
            userProgressCtx.getMovieFromTitle(title)
            userProgressCtx.showModal()
    }

    return (
        <div className="flex items-center gap-15 py-15">
            <div className="w-1/2">
                <TitleSection sectionTitle={props.title}/>
            </div>
            <div className="flex flex-col gap-6 w-1/2">
                {props.title == "Search Movies" ?
                    <SearchBar onValidInput={handleValidInput} onInvalidInput={handleInvalidInput} />
                :
                    <BrowseBar onSelectMovie={handleValidInput}/>
                }
                <div className="w-fit" onClick={() => handleClick(movieTitle)}>
                    <Button btnLabel="Go to Movie" btnState={btnStatus} size="default"/>
                </div>
            </div>
            {userProgressCtx.modalStatus && <Modal />}
        </div>
    )
}