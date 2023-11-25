'use client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Card, CardContent } from "../ui/card"
import { getFullNameByCode } from "@/utils/utils"
import { GiCricketBat } from "react-icons/gi";
import { BiSolidCricketBall } from "react-icons/bi";
import { GiFastArrow } from "react-icons/gi";
import { GiFlameSpin } from "react-icons/gi";

interface VenueStatsProps {
    venue: string
}

const VenueStats: React.FC<VenueStatsProps> = ({ venue }) => {

    const getVenueStats = async () => {
        return await axios.get(`/api/view/venue-get/${venue}`)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error)
                return []
            })
    }

    const { data } = useQuery({
        queryKey: ['venueStats'],
        queryFn: getVenueStats
    })


    console.log(data);


    return (
        <>
            <Card className="mb-3">
                <CardContent className="p-3 flex items-center justify-between">
                    <div className="block lg:flex lg:items-center">
                        <div className="px-5 flex items-center justify-between mb-2 lg:mb-0">
                            <p className="text-lg mr-2">IND</p>
                            <p className="text-muted-foreground text-sm px-1 border rounded shadow-sm">314/4</p>
                        </div>
                        <span className="text-muted-foreground text-sm hidden lg:block">VS</span>
                        <div className="px-5 flex items-center justify-between flex-row-reverse lg:flex-row">
                            <p className="text-muted-foreground text-sm px-1 border rounded shadow-sm">254/8</p>
                            <p className="text-lg mr-2 lg:ml-2">NZ</p>
                        </div>
                    </div>

                    <span className="text-muted-foreground text-sm px-1 border-b rounded shadow-sm">Nov/23</span>

                    <div className="flex items-center">
                        <div className="flex items-center">
                            <GiCricketBat className='inline mr-1 text-gray-800' />
                            <p className="rounded-sm w-[24px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase bg-emerald-600 text-white">W</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center">
                            <GiCricketBat className='inline mr-1 text-gray-800' />
                            <p className="text-muted-foreground text-sm px-1 border rounded shadow-sm">117</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center">
                            <BiSolidCricketBall className='inline mr-1 text-gray-800' />
                            <p className="text-muted-foreground text-sm px-1 mr-1 border rounded shadow-sm">5/23</p>
                            <GiFastArrow />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-3">
                <CardContent className="p-3 flex items-center justify-between">
                    <div className="block lg:flex items-center">
                        <div className="px-5 flex items-center justify-between mb-2 lg:mb-0">
                            <p className="text-lg mr-2">IND</p>
                            <p className="text-muted-foreground text-sm px-1 border rounded shadow-sm">314/4</p>
                        </div>
                        <span className="text-muted-foreground text-sm hidden lg:block">VS</span>
                        <div className="px-5 flex items-center justify-between flex-row-reverse lg:flex-row">
                            <p className="text-muted-foreground text-sm px-1 border rounded shadow-sm">254/9</p>
                            <p className="text-lg mr-2 lg:ml-2">NZ</p>
                        </div>
                    </div>

                    <span className="text-muted-foreground text-sm px-1 border-b rounded shadow-sm">Nov/23</span>

                    <div className="flex items-center">
                        <div className="flex items-center">
                            <GiCricketBat className='inline mr-1 text-gray-800' />
                            <p className="rounded-sm w-[24px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase bg-red-600 text-white">L</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center">
                            <GiCricketBat className='inline mr-1 text-gray-800' />
                            <p className="text-muted-foreground text-sm px-1 border rounded shadow-sm">117</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center">
                            <BiSolidCricketBall className='inline mr-1 text-gray-800' />
                            <p className="text-muted-foreground text-sm px-1 mr-1 border rounded shadow-sm">5/23</p>
                            <GiFlameSpin />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default VenueStats
