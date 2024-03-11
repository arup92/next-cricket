import { Badge } from "@/components/ui/badge"
import axios from "axios"
import toast from "react-hot-toast"

interface SaveTeamProps {
    pickedPlayersArray: any[]
    slugs: any
    playerIds: any | undefined
    reviewPlayerIds: any | undefined
}

const SaveTeam: React.FC<SaveTeamProps> = ({ pickedPlayersArray, slugs, playerIds, reviewPlayerIds }) => {
    // Save team
    const saveTeam = async () => {
        if (Object.entries(playerIds).length === 11) {
            const teamName: string = `${slugs[0]}/${slugs[1]}/${slugs[2]}/${slugs[3]}`
            const team: any = {
                teamName,
                matchFormat: slugs[2].toUpperCase(),
                venueId: slugs[3],
                teamAId: slugs[0].toUpperCase(),
                teamBId: slugs[1].toUpperCase(),
            }

            const postObject = {
                team,
                savedTeamPlayers: playerIds,
                reviewTeamPlayers: reviewPlayerIds
            }

            await axios.post(`/api/user/save-team`, postObject)
                .then(response => {
                    console.log(response.data);
                    const push = `/t/${response.data.shortUrl}`
                })
                .catch(err => {
                    toast.error(err.response.data)
                })
        }
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

            {pickedPlayersArray.length > 0 && <Badge
                onClick={saveTeam}
                className={`relative rounded-sm px-3 py-1 cursor-pointer ${Object.entries(playerIds).length !== 11 && 'bg-gray-500 cursor-not-allowed'}`}
            >
                Share
            </Badge>}
        </div>
    )
}

export default SaveTeam