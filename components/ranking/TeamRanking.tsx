import Link from 'next/link'
import { BiSolidCricketBall } from 'react-icons/bi'
import { MdSportsCricket } from 'react-icons/md'

interface TeamRankingProps {
    battingRanking: any[]
    bowlingRanking: any[]
    handle: string
}

const TeamRanking: React.FC<TeamRankingProps> = ({ battingRanking, bowlingRanking, handle }) => {
    if (handle === 'index') handle = 'odi'

    // Mark common players
    const batters: any = {}
    const commonPlayers: any = {}
    battingRanking.forEach((player) => {
        batters[player.playerId] = 1
    })

    bowlingRanking.forEach((player) => {
        if (batters.hasOwnProperty(player.playerId)) {
            commonPlayers[player.playerId] = 1
        }
    })

    return (
        <div className='lg:flex lg:justify-between lg:gap-5'>
            <div className="relative p-5 mb-3 border border-b rounded-md shadow-sm lg:w-1/2 text-card-foreground bg-card">
                <h3 className='flex items-center justify-center mb-3 font-bold text-center uppercase'>
                    <MdSportsCricket className='mr-2' />Batting
                </h3>
                <div className="flex items-center justify-between px-3 py-1 pb-2 mb-2 border-b-2 lg-py-0 border-b-slate-800">
                    <span className="text-muted-foreground text-sm w-[10%]">
                        Pos
                    </span>

                    <span className="text-muted-foreground text-sm w-[50%]">
                        Player
                    </span>

                    <span className="text-muted-foreground text-center text-sm w-[20%]">
                        Team
                    </span>

                    <span className="text-muted-foreground text-center text-sm w-[20%]">
                        Pts
                    </span>
                </div>

                {battingRanking.map((item: any, index: number) => {
                    return <div key={item.playerId} className={`flex items-center justify-between px-3 py-2 border-b border-b-grey-300 lg-py-0`}>
                        <span className="w-[10%]">
                            {index + 1}
                        </span>

                        <span className="w-[50%]">
                            <Link
                                href={`/view/player/${item.playerId}/${handle}`}
                                className={`text-blue-700 hover:underline ${commonPlayers[item.playerId] && 'text-emerald-600 font-bold'}`}
                            >
                                {item.playerName}
                            </Link>
                        </span>

                        <span className={`w-[20%] text-center ${commonPlayers[item.playerId] && 'text-emerald-600 font-bold'}`}>
                            {item.teamId}
                        </span>

                        <span className={`w-[20%] text-center ${commonPlayers[item.playerId] && 'text-emerald-600 font-bold'}`}>
                            {parseInt(item.total_points)}
                        </span>
                    </div>
                })}
            </div>

            <div className="relative p-5 mb-3 border border-b rounded-md shadow-sm lg:w-1/2 text-card-foreground bg-card">
                <h3 className='flex items-center justify-center mb-3 font-bold text-center uppercase'>
                    <BiSolidCricketBall className='mr-2' />Bowling
                </h3>
                <div className="flex items-center justify-between px-3 py-1 pb-2 mb-2 border-b-2 lg-py-0 border-b-slate-800">
                    <span className="text-muted-foreground text-sm w-[10%]">
                        Pos
                    </span>

                    <span className="text-muted-foreground text-sm w-[50%]">
                        Player
                    </span>

                    <span className="text-muted-foreground text-center text-sm w-[20%]">
                        Team
                    </span>

                    <span className="text-muted-foreground text-center text-sm w-[20%]">
                        Pts
                    </span>
                </div>

                {bowlingRanking.map((item: any, index: number) => {
                    return <div key={item.playerId} className={`flex items-center justify-between px-3 py-2 border-b border-b-grey-300 lg-py-0`}>
                        <span className="w-[10%]">
                            {index + 1}
                        </span>

                        <span className="w-[50%]">
                            <Link
                                href={`/view/player/${item.playerId}/${handle}`}
                                className={`text-blue-700 hover:underline ${commonPlayers[item.playerId] && 'text-emerald-600 font-bold'}`}
                            >
                                {item.playerName}
                            </Link>
                        </span>

                        <span className={`w-[20%] text-center ${commonPlayers[item.playerId] && 'text-emerald-600 font-bold'}`}>
                            {item.teamId}
                        </span>

                        <span className={`w-[20%] text-center ${commonPlayers[item.playerId] && 'text-emerald-600 font-bold'}`}>
                            {parseInt(item.total_points)}
                        </span>
                    </div>
                })}
            </div>
        </div>
    )
}

export default TeamRanking
