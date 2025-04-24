// import testImg from "../assets/test-img-Inception.png"

type cardProps = {
    date: number
    title: string
    rating: string
    genre: string
    poster: string
}

export default function MovieCard( props: cardProps ) {

    return (
        <div className="flex flex-col w-[245px] h-full gap-5 hover:cursor-pointer">
            <div className="flex justify-center h-[363px] w-full">
                <img className="object-contain h-[363px]" src={props.poster} />
            </div>
            <div className="flex flex-col w-full h-full gap-2">
                <h3 className="text-zinc-200 text-[20px] font-[Roboto] text-center">{props.title}</h3>
                <p className="text-zinc-200/50 text-[16px] font-[Roboto] text-center">{props.genre}</p>
                {/* <h4 className="text-zinc-200 text-[28px] font-medium font-[Roboto] text-center">{props.rating}</h4> */}
            </div>
        </div>
    )
}