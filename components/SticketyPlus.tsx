'use client'
import { HiMiniPlusCircle } from "react-icons/hi2";
import StatsTeamFormV2 from "./forms/StatsTeamFormV2";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";

const SticketyPlus = () => {
    const [open, setOpen] = useState<boolean>(false)

    const isFetched = (value: boolean) => {
        setOpen(!value)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="fixed bottom-0 right-0 z-50 inline-block pb-2 pr-2 cursor-pointer">
                    <HiMiniPlusCircle className="text-5xl bg-white border-2 rounded-full shadow-xl border-slate-950" />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <StatsTeamFormV2 isFetched={isFetched} />
            </DialogContent>
        </Dialog>
    )
}

export default SticketyPlus