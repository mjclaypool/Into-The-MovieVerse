type btnProps = {
    btnLabel: string
    btnState: string
    size: string
}

export default function Button( props: btnProps ) {
    type variants = {
        [key: string]: string
    }
    const colorVariants: variants = {
        enabled: "bg-red-900 hover:cursor-pointer",
        disabled: "bg-zinc-500"
    }
    const sizeVariants: variants = {
        default: "py-3 px-8 md:px-16",
        small: "py-1 px-4"
    }
    return (
        <button
            className={`${colorVariants[props.btnState]} ${sizeVariants[props.size]} text-zinc-200 text-[16px] font-medium font-[Roboto] rounded-[8px]`}
        >
            {props.btnLabel}
        </button>
    )
}