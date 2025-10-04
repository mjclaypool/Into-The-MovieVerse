import { useContext, useState } from "react"
import { createPortal } from "react-dom"

import Button from "../UI/Button"
import testImg from "../assets/test-img-load.png"
import UserProgressContext from "../store/UserProgressContext"


export default function Modal() {
    const userProgressCtx = useContext(UserProgressContext)
    const [inputValue, setInputValue] = useState(2.5)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(Number(event.target.value))
    }

    return createPortal(
        <>
            <dialog className="fixed flex items-center top-0 w-full h-full justify-center bg-zinc-950/50" open onClick={userProgressCtx.hideModal}>
                <div
                className="relative w-full max-w-4xl mx-auto bg-zinc-200 rounded-lg p-6 md:p-12 grid grid-cols-1 md:[grid-template-columns:300px_1fr] gap-6 md:gap-12 max-h-[90vh] overflow-hidden"
                onClick={e => e.stopPropagation()}
                >
                    <div className="absolute top-3 right-3 z-10">
                        <button
                        onClick={userProgressCtx.hideModal}
                        className="text-[16px] font-medium underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900"
                        >
                        Close
                        </button>
                    </div>
                    <div className="w-full md:w-[300px] h-44 md:h-[445px] flex items-center justify-center bg-zinc-100 rounded-md overflow-hidden">
                        <img
                        src={userProgressCtx.activeMovie.poster || testImg}
                        alt={userProgressCtx.activeMovie.movie_name || 'movie poster'}
                        className="object-contain w-full h-full"
                        />
                    </div>
                    <div className="flex flex-col h-full w-full justify-between">
                        <div className="space-y-3 overflow-auto pr-1">
                            <h2 className="text-lg md:text-2xl font-medium font-[Roboto] text-zinc-900">
                                {userProgressCtx.activeMovie.movie_name}
                            </h2>
                            <h3 className="text-sm md:text-base font-[Roboto] text-zinc-700">
                                {userProgressCtx.activeMovie.genre}
                            </h3>
                            <p className="text-sm md:text-base font-[Roboto] text-zinc-700 max-h-48 md:max-h-56 overflow-auto">
                                {userProgressCtx.activeMovie.plot}
                            </p>
                        </div>
                        <div className="my-4">
                            <h4 className="text-base md:text-lg font-medium font-[Roboto]">Rating:</h4>
                            <div className="flex flex-col md:flex-row md:items-center gap-3 mt-2">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="5.0"
                                        step="0.5"
                                        value={inputValue}
                                        onChange={handleChange}
                                        className="w-full md:w-[114px] accent-red-900 rounded-md"
                                    />
                                    <p className="text-sm md:text-base font-[Roboto]">{`${inputValue.toFixed(1)}/5`}</p>
                                </div>
                                <div className="flex" onClick={() => userProgressCtx.postRating(inputValue)}>
                                    <Button btnLabel="Update" btnState="enabled" size="small" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </>, document.getElementById('modal')!
    )
}