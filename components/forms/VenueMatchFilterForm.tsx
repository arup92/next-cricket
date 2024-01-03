import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MatchFormat } from "@/types/MatchFormat"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { GoCheck, GoCode } from "react-icons/go"
import { z } from "zod"
import { Button } from "../ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

const formSchema = z.object({
    matchFormat: z.string().min(2),
})

interface VenueMatchFilterFormProps {
    venueId: any
    handleData: (item: any) => void
}

const VenueMatchFilterForm: React.FC<VenueMatchFilterFormProps> = ({ venueId, handleData }) => {
    const [open, setOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [searchData, setSearchData] = useState<string>('')

    const router = useRouter()

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
        if (searchData !== values.matchFormat) {
            setSearchData(values.matchFormat)
            router.push(`/view/venue/${venueId}/${values.matchFormat.toLowerCase()}`)
            setDialogOpen(false)
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
                        <Button>Filter</Button>
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
