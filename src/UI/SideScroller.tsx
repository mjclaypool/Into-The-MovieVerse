import { useContext, useEffect, useState } from "react"
import UserProgressContext from "../store/UserProgressContext"

type scrollerProps = {
    optionType?: string
    children?: React.ReactNode
}

export default function SideScroller( props: scrollerProps ) {
    const userProgressCtx = useContext(UserProgressContext)
    const [displayScroller, setDisplayScroller] = useState(true)

    useEffect(() => {
        if (props.optionType == "personal") {
            if (userProgressCtx.initialLoad == true) {
                setDisplayScroller(false)
            } else {
                setDisplayScroller(true)
            }
        }
    }, [userProgressCtx.initialLoad, props.optionType])

    return (
        <>
            {displayScroller ?
                <div className="flex flex-nowrap overflow-x-auto space-x-10 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
                    {props.children}
                </div>
            :
                <div>
                    <h3 className="text-zinc-200/50 text-[16px] font-[Roboto] text-center">Rate movies for personalized recommendations!</h3>
                </div>
            }
        </>
    )
}