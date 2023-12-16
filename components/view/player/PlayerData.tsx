import { Card, CardContent } from "@/components/ui/card"

interface PlayerDataProps {
    playerData: any
}

const PlayerData: React.FC<PlayerDataProps> = ({ playerData }) => {
    return (
        <>
            {playerData && <Card className="mb-3">
                <CardContent className="py-3 flex justify-between items-center">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="capitalize inline font-bold text-2xl">{playerData.playerName}</h1>
                            <p className="inline"> ({playerData.playerCountryId})</p>
                        </div>
                    </div>
                    <div className="text-muted-foreground text-sm">
                        <p>{playerData.playerType} {!playerData.bowlingType || playerData.bowlingType === 'NA' ? '' : `(${playerData.bowlingType})`}</p>
                    </div>
                </CardContent>
            </Card>}
        </>
    )
}

export default PlayerData