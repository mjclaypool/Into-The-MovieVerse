import { useContext, useEffect, useState } from "react"

import Button from "../UI/Button"
import LoaderWheel from "./LoaderWheel"
import spiderVerseLogo from "../assets/SpiderVerse.png"
import UserProgressContext from "../store/UserProgressContext"


export default function Header() {
    const userProgressCtx = useContext(UserProgressContext)
    const [btnStatus, setBtnStatus] = useState("enabled")

    useEffect(() => {
        if (userProgressCtx.refreshStatus == "loading" || userProgressCtx.hasRated == false) {
            setBtnStatus("disabled")
        } else {
            // console.log(userProgressCtx.refreshStatus)
            setBtnStatus("enabled")
        }
    }, [userProgressCtx.refreshStatus, userProgressCtx.hasRated])

    function handleRefresh() {
        userProgressCtx.refreshRecs()
    }

    return (
        <div className="mx-auto max-w-screen-xl px-4">
            <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 pb-6 md:pb-15 items-center">
                <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-red-900 rounded-full">
                        <img src={spiderVerseLogo} />
                    </div>
                    <h1 className="text-zinc-200 text-[24px] font-bold font-[Roboto]">Into the Movie-Verse</h1>
                </div>
                <div className="mt-2 md:mt-0" onClick={handleRefresh}>
                    <Button btnLabel="Refresh Recommendations" btnState={btnStatus} size="default" /> 
                </div>
            </div>
            {userProgressCtx.refreshStatus == "loading" && <LoaderWheel />}
        </div>
    )
}