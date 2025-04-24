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
        <div>
            <div className="flex justify-between pb-15">
                <div className="flex gap-4">
                    <div className="w-10 h-10 bg-red-900 rounded-full">
                        <img src={spiderVerseLogo} />
                    </div>
                    <h1 className="text-zinc-200 text-[24px] font-bold font-[Roboto]">Into the Movie-Verse</h1>
                </div>
                <div onClick={handleRefresh}>
                <Button btnLabel="Refresh Recommendations" btnState={btnStatus} size="default" /> 
                </div>
            </div>
            {userProgressCtx.refreshStatus == "loading" && <LoaderWheel />}
        </div>
    )
}