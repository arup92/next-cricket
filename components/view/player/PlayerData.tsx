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
                <CardContent className="flex items-center justify-between py-3">
                    <div className="flex items-center justify-between">
                        <h1 className="inline mr-2 text-lg font-bold capitalize lg:text-2xl">{playerData.playerName}</h1>
                        <p className="flex text-sm text-muted-foreground">
                            <span className="flex gap-1">
                                {playerData.playerTeams.map(
                                    (item: { teamId: string }) =>
                                        <span className="px-1 border rounded-sm shadow-sm" key={item.teamId}>{item.teamId}</span>
                                )}
                            </span>
                        </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {/* <p>{playerData.playerType} {!playerData.bowlingType || playerData.bowlingType === 'NA' ? '' : `(${playerData.bowlingType})`}</p> */}
                        <PlayerFilterForm handleData={updateData} playerData={playerData} />
                    </div>
                </CardContent>
            </Card>}
        </>
    )
}

export default PlayerData