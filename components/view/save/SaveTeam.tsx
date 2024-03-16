import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { FaCheck, FaShare } from "react-icons/fa"

interface SaveTeamProps {
    pickedPlayersArray: any[]
    slugs: any
    playerIds: any | undefined
    reviewPlayerIds: any | undefined
}

const SaveTeam: React.FC<SaveTeamProps> = ({ pickedPlayersArray, slugs, playerIds, reviewPlayerIds }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [shareLink, setShareLink] = useState<string>('')
    const [copyStatus, setCopyStatus] = useState<boolean>(false)
    const playerIdLength = Object.entries(playerIds).length

    // Save team
    const saveTeam = async () => {
        if (playerIdLength === 11) {
            setIsLoading(true)

            const teamName: string = `${slugs[0]}/${slugs[1]}/${slugs[2]}/${slugs[3]}`
            const team: any = {
                teamName,
                matchFormat: slugs[2].toUpperCase(),
                venueId: slugs[3],
                teamAId: slugs[0].toUpperCase(),
                teamBId: slugs[1].toUpperCase()
            }

            const postObject = {
                team,
                savedTeamPlayers: playerIds,
                reviewTeamPlayers: reviewPlayerIds,
                ...(slugs?.[4] ? { shortUrl: slugs[4] } : {})
            }

            await axios.post(`/api/user/save-team`, postObject)
                .then(response => {
                    setShareLink(`${process.env.NEXT_PUBLIC_APP_URL}/t/${response.data.shortUrl}`)
                })
                .catch(err => {
                    toast.error(err.response.data)
                })
            setIsLoading(false)
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopyStatus(true)
    }

    return (
        <div className="bg-secondary flex gap-4 shadow-sm px-2 rounded py-1 text-center fixed bottom-3 left-1/2 -translate-x-[50%] z-50">
            {pickedPlayersArray.length > 0 && pickedPlayersArray.map(item => {
                return <Badge key={item[0]} className="relative rounded-sm px-3 py-1 bg-white text-slate-900 hover:bg-white">
                    {item[0]}
                    <span
                        className={`absolute -top-3 -right-3 text-center text-xs border-2 rounded-full text-white border-white ${parseInt(item[1] as string) <= 7 ? 'bg-emerald-600' : 'bg-red-500'} shadow-md w-5 h-5 grid items-center`}
                    >
                        {item[1] as string}
                    </span>
                </Badge>
            })}

            {pickedPlayersArray.length > 0 && <Dialog>
                {playerIdLength === 11 ? <DialogTrigger asChild>
                    <div>
                        <Badge
                            onClick={saveTeam}
                            className={`relative rounded-sm px-3 py-1 cursor-pointer`}
                        >
                            <span
                                className={`absolute -top-3 -right-3 text-center text-xs border-2 rounded-full text-white border-white bg-black shadow-md w-[22px] h-[22px] grid items-center`}
                            >
                                <FaShare className="w-full" />
                            </span>
                            Share
                        </Badge>
                    </div>
                </DialogTrigger> : <Badge
                    onClick={saveTeam}
                    className={`relative rounded-sm px-3 py-1 bg-gray-500 cursor-not-allowed`}
                >
                    Share
                    <span
                        className={`absolute -top-3 -right-3 text-center text-xs border-2 rounded-full text-white border-white ${playerIdLength !== 11 && 'bg-black'} shadow-md w-[22px] h-[22px] grid items-center`}
                    >
                        {playerIdLength}
                    </span>
                </Badge>}

                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Share link</DialogTitle>
                        <DialogDescription>
                            {isLoading ? 'Generating sharable link. Please wait...' : 'Anyone who has this link will be able to view this.'}
                        </DialogDescription>
                    </DialogHeader>
                    {!isLoading && !!shareLink && <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Input
                                id="link"
                                defaultValue={shareLink}
                                readOnly
                            />
                        </div>
                        <Button type="submit" size="sm" className="px-3" onClick={() => copyToClipboard(shareLink)}>
                            <span className="sr-only">Copy</span>
                            {copyStatus ? <FaCheck className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                        </Button>
                    </div>}
                </DialogContent>
            </Dialog>}
        </div>
    )
}

export default SaveTeam