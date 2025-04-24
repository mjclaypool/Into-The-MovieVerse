type titleSectionProps = {
    sectionTitle: string
}

export default function TitleSection( props: titleSectionProps ) {
    return (
        <h2 className="text-zinc-200 text-[40px] font-bold font-[Roboto] w-full">{props.sectionTitle}</h2>
    )
}