export default function LoaderWheel() {
    return (
        <div className="flex justify-center items-center py-4">
            <div className="loader border-t-4 border-red-900 rounded-full w-8 h-8 animate-spin"></div>
            <p className="text-zinc-200 font-[Roboto] ml-4">Loading recommendations...</p>
        </div>
    )
}