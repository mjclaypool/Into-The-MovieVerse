import testBanner from "../assets/test-banner-Wicked.png"

export default function Featured() {
    return (
        <div className="relative py-15">
            <div className="relative h-[292px] rounded-[12px] overflow-hidden">
                <img className="object-cover" src={testBanner} />
                <div className="absolute inset-y-0 left-0 w-full bg-linear-to-r from-zinc-950 from-15% to-zinc-50/0 to-85%" />
            </div>
            <div className="absolute inset-y-0 left-0 flex flex-col justify-center pl-11">
                <h3 className="text-zinc-200 text-[40px] font-bold font-[Roboto]">Wicked</h3>
                <h4 className="text-zinc-200 text-[28px] font-medium font-[Roboto]">4.6/5</h4>
            </div>
        </div>
    )
}