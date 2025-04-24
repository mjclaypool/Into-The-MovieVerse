import { PropsWithChildren } from "react";

export default function Movies( {children} : PropsWithChildren) {

    return (
        <div className="flex flex-col gap-10 py-15 text-center">
            {children}
        </div>
    )
}