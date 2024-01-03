import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { GoCheck, GoCode } from "react-icons/go"
import { z } from "zod"
import { Button } from "../ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { MatchFormat } from "@/types/MatchFormat"

const formSchema = z.object({
    matchFormat: z.string().min(2),
})

interface VenueMatchFilterFormProps {
    venueId: any
    handleData?: (item: any) => void
}

const VenueMatchFilterForm: React.FC<VenueMatchFilterFormProps> = ({ venueId, handleData }) => {
    const [open, setOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [searchData, setSearchData] = useState<string>('')

    // Hook Form
    const {
        formState: { errors },
        handleSubmit,
        setValue,
        watch
    } = useForm({
        mode: 'onChange',
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (values: any) => {
        values.venueId = venueId
        const searchParams = new URLSearchParams(values).toString()

        if (searchData !== searchParams) {
            setLoading(true)
            setSearchData(searchParams)
            await axios.get(`/api/view/player-get?${searchParams}`)
                .then((response) => {
                    // handleData(response.data)
                    setLoading(false)
                    setDialogOpen(false)
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)
                    setDialogOpen(false)
                })
        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="default">Filter Format</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Filter by Match Format</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="mb-3 space-y-3">
                    <div>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="justify-between w-full bg-white"
                                >
                                    {MatchFormat && watch().matchFormat ?
                                        watch().matchFormat.toUpperCase() : 'Match Format'
                                    }
                                    <span className="rotate-90"><GoCode /></span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent side="bottom" avoidCollisions={false} className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Match Format..." />
                                    <CommandEmpty>No Team Found.</CommandEmpty>
                                    <CommandGroup>
                                        {MatchFormat && MatchFormat.map((format: any) => (
                                            <CommandItem
                                                key={format}
                                                value={format}
                                                onSelect={(currentValue) => {
                                                    setValue('matchFormat', currentValue.toUpperCase())
                                                    setOpen(false)
                                                }}
                                            >
                                                {format}
                                                <span className={watch().matchFormat === format ? 'ml-auto opacity-100' : 'opacity-0'}>
                                                    <GoCheck />
                                                </span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <DialogFooter>
                        <Button>
                            {loading ? <>
                                <svg className="absolute w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg> <span className="invisible opacity-0">Filter</span>
                            </> : 'Filter'}
                        </Button>
                    </DialogFooter>
                </form>

                {errors.matchFormat && (
                    <p className="mb-5">{errors.matchFormat.message as any}</p>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default VenueMatchFilterForm
