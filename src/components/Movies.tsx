import { PropsWithChildren } from "react";

export default function Movies( {children} : PropsWithChildren) {

    return (
        <div className="flex flex-col gap-10 py-8 md:py-15 text-center mx-auto max-w-screen-xl px-4">
            {children}
        </div>
    )
}