import { Card, CardContent } from "@/components/ui/card"
import { getFullNameByCode } from "@/utils/utils"

interface Head2HeadProps {
    h2h: any[]
    sTeamA: any
    sTeamB: any
}

const Head2Head: React.FC<Head2HeadProps> = ({ h2h, sTeamA, sTeamB }) => {
    return (
        <>
            {sTeamA?.team && <Card className="mb-6">
                <CardContent className="py-3">
                    <div className="flex justify-between">
                        <div>
                            <p className="font-semibold text-sm mb-1">
                                {getFullNameByCode(sTeamA?.team)}
                            </p>

                            {sTeamA.stats.length > 0 && sTeamA.stats.map((result: string, index: number) => {
                                let style = ``
                                if (result === 'w') {
                                    style = 'bg-emerald-600 text-white'
                                } else if (result === 'l') {
                                    style = 'bg-red-600 text-white'
                                }

                                return <span key={index} className={`rounded-sm shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${style}`}>{result}</span>
                            })}
                        </div>

                        <div>
                            <p className="font-semibold text-sm mb-2 text-center">Head to Head</p>
                            <p className="text-sm text-muted-foreground capitalize text-center">
                                {h2h.length > 0 ? h2h.map((item, index) =>
                                    <span key={index} className="rounded-sm px-1 mr-1 border">{item.result}</span>
                                ) : <span className="rounded-md px-2 mr-1 border">No matches to display</span>}
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold text-sm mb-1 text-right">
                                {getFullNameByCode(sTeamB?.team)}
                            </p>

                            {sTeamB.stats.length > 0 && sTeamB.stats.map((result: string, index: number) => {
                                let style = ``
                                if (result === 'w') {
                                    style = 'bg-emerald-600 text-white'
                                } else if (result === 'l') {
                                    style = 'bg-red-600 text-white'
                                }

                                return <span key={index} className={`rounded-sm shadow px-1 ml-1 text-muted-foreground text-sm uppercase ${style}`}>{result}</span>
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>}
        </>
    )
}

export default Head2Head
