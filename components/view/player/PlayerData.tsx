import PlayerFilterForm from "@/components/forms/PlayerFilterForm"
import { Card, CardContent } from "@/components/ui/card"

interface PlayerDataProps {
    playerData: any
    updateData: (data: any) => void
}

const PlayerData: React.FC<PlayerDataProps> = ({ playerData, updateData }) => {
    return (
        <>
            {playerData && <Card className="mb-3">
                <CardContent className="py-3 flex justify-between items-center">
                    <div className="flex justify-between items-center">
                        <h1 className="capitalize inline font-bold text-2xl mr-1">{playerData.playerName}</h1>
                        <p className="text-muted-foreground text-sm">({playerData.playerCountryId})</p>
                    </div>
                    <div className="text-muted-foreground text-sm">
                        {/* <p>{playerData.playerType} {!playerData.bowlingType || playerData.bowlingType === 'NA' ? '' : `(${playerData.bowlingType})`}</p> */}
                        <PlayerFilterForm handleData={updateData} playerData={playerData} />
                    </div>
                </CardContent>
            </Card>}
        </>
    )
}

export default PlayerData