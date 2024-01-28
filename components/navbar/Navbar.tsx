'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { BiSolidCricketBall } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { IoMdAddCircle, IoMdArrowRoundBack, IoMdLogOut } from "react-icons/io";
import { RiTeamFill } from "react-icons/ri";
import SearchForm from "../forms/SearchForm";
import NavlinkUi from "./NavlinkUi";
import { MdOutlineSearch } from "react-icons/md";

const Navbar = () => {
   const [searchDisplay, setSearchDisplay] = useState<string>('hidden')
   const { data: session } = useSession()
   const inputRef = useRef<any>(null)

   const showSearch = () => {
      setSearchDisplay('block')
      setTimeout(() => {
         // Focus the input element
         inputRef.current.focus()
         inputRef.current.select()
      }, 0)
   }

   const hideSearch = () => {
      setSearchDisplay('hidden')
   }

   return (
      <header className="relative z-30">
         <div className="relative z-20 bg-white border-b">
            <div className="px-6 md:px-12 lg:container lg:mx-auto lg:px-6 lg:py-4">

               {/* Search nav bar */}
               <div className={searchDisplay}>
                  <div className="absolute top-0 left-0 w-full h-full z-30 backdrop-blur-md"></div>
                  <div className="absolute flex items-center top-[50%] left-[50%] z-40 -translate-x-1/2 -translate-y-1/2">
                     <IoMdArrowRoundBack onClick={hideSearch} className="cursor-pointer mr-2" />
                     <SearchForm fref={inputRef} width="w-[350px]" displayMobile="flex" />
                  </div>
               </div>

               <div className="flex items-center justify-between">
                  <div className="relative z-20">
                     <Link href={'/'}>
                        <div className="flex items-center text-md lg:text-3xl font-bold">
                           <BiSolidCricketBall />
                           <span className="ml-1">Fantasy11</span>
                        </div>
                        <p className="text-muted-foreground text-[10px] lg:text-sm text-right -top-1.5 relative">Cricket Statistics</p>
                     </Link>
                  </div>

                  {/* Desktop Search Form */}
                  <SearchForm displayMobile="hidden" />

                  <div className="flex items-center">
                     {/* Mobile search icon */}
                     <div className='px-5 lg:hidden' onClick={showSearch}>
                        <MdOutlineSearch className="cursor-pointer text-xl" />
                     </div>

                     <div className="flex items-center justify-end border-l lg:border-l-0">
                        <input type="checkbox" name="hamburger" id="hamburger" className="peer" hidden />
                        <label htmlFor="hamburger" className="relative z-20 block p-6 -mr-6 cursor-pointer peer-checked:hamburger lg:hidden">
                           <div className="m-auto h-0.5 w-6 mt-0 rounded bg-custom-alpha transition duration-300"></div>
                           <div className="m-auto h-0.5 w-6 mt-2 rounded bg-custom-alpha transition duration-300"></div>
                        </label>

                        <div className="peer-checked:translate-x-0 fixed inset-0 w-[calc(100%-4.5rem)] translate-x-[-100%] bg-white border-r shadow-xl transition duration-300 lg:border-r-0 lg:w-auto lg:static lg:shadow-none lg:translate-x-0">
                           <div className="flex flex-col justify-between h-full lg:items-center lg:flex-row">
                              <ul className="px-6 pt-32 space-y-8 text-custom-alpha md:px-12 lg:space-y-0 lg:flex lg:items-center lg:space-x-12 lg:pt-0">
                                 <NavlinkUi linkto="/view/create-new-11">Make New 11</NavlinkUi>
                                 {(session) ?
                                    (
                                       <>
                                          <NavlinkUi className="flex items-center" linkto="/dashboard/add-match">
                                             <IoMdAddCircle /> <span className="ml-[2px]">Match</span>
                                          </NavlinkUi>
                                          <NavlinkUi className="flex items-center" linkto="/dashboard/add-team">
                                             <RiTeamFill /> <span className="ml-[2px]">Team</span>
                                          </NavlinkUi>
                                          <NavlinkUi className="flex items-center" linkto="/dashboard/edit-player">
                                             <FaUserEdit /> <span className="ml-[2px]">Player</span>
                                          </NavlinkUi>
                                          <NavlinkUi className="flex items-center" linkto="/matches">
                                             Matches
                                          </NavlinkUi>
                                          <NavlinkUi type="signout" linkto="#"><IoMdLogOut /></NavlinkUi>
                                       </>
                                    ) : (
                                       <>
                                          <NavlinkUi linkto="/login">Login</NavlinkUi>
                                          <NavlinkUi type='navBtn' linkto="/register">Register</NavlinkUi>
                                       </>
                                    )
                                 }
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </header>
   )
}

export default Navbar
