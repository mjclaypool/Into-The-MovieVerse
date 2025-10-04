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
            <dialog className="fixed top-0 w-full h-full justify-center bg-zinc-950/70" open onClick={userProgressCtx.hideModal}>
                <div
                    className="fixed m-auto inset-0 flex items-center justify-center h-[563px] w-[900px] gap-12 bg-zinc-200 rounded-[12px] py-12 px-24"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="absolute top-3 right-5" onClick={userProgressCtx.hideModal}>
                        <button className="hover:cursor-pointer underline text-[16px] font-medium font-[Roboto]">Close</button>
                    </div>
                    <div className="h-[445px] w-[300px]">
                        {userProgressCtx.activeMovie.poster == "" ? <img src={testImg} /> : <img src={userProgressCtx.activeMovie.poster} />}
                    </div>
                    <div className="flex flex-col h-full w-[340px] justify-between py-14">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-[20px] font-medium font-[Roboto]">{userProgressCtx.activeMovie.movie_name}</h2>
                            <h3 className="text-[16px] font-[Roboto]">{userProgressCtx.activeMovie.genre}</h3>
                            <p className="text-[16px] font-[Roboto]">{userProgressCtx.activeMovie.plot}</p>
                        </div>
                        <div className="relative flex flex-col gap-2">
                            <h2 className="text-[20px] font-medium font-[Roboto]">Rating:</h2>
                            <div className="flex gap-3">
                                <div className="flex items-center gap-1">
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="5.0"
                                        step="0.5"
                                        value={inputValue}
                                        className="bg-white accent-red-900 text-[16px] font-[Roboto] w-[114px] rounded-[6px] py-2 px-3"
                                        onChange={handleChange}
                                    />
                                    <p className="text-[16px] font-[Roboto]">{`${inputValue.toFixed(1)}/5`}</p>
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