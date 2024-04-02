"use client"

import useGetCalls from '@/hooks/useGetCalls'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard'
import Loader from './Loader'
import { toast } from './ui/use-toast'

// type - ended | recordings | upcoming
export default function CallList({type}) {

    const {endedCalls , isLoading , callRecordings , upCommingCalls} = useGetCalls()

    const [recordings, setRecordings] = useState([])

    const router = useRouter()

    const getCalls = () => {
        switch (type) {
            case 'ended' :
            return endedCalls

            case "recordings" :
            return recordings

            case "upcoming" :
            return upCommingCalls 

            default:
                return [];
        }
    }

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended' :
            return "No Previous Calls"

            case "recordings" :
            return "No Recordings"

            case "upcoming" :
            return "No Upcomming Calls" 

            default:
                return "";
        }
    }

    useEffect(() => {
      const fetchRecordings = async () => {
        try {
        const callData = await Promise.all(callRecordings.map((meeting) => meeting?.queryRecordings()))
        const recordings = callData.filter((call) => call?.recordings?.length > 0)?.flatMap((call) => call?.recordings)
        setRecordings(recordings) 
        } catch (error) {
          toast({
            title : "Try again later"
          })  
        }
      }

      if(type === "recordings") fetchRecordings()
    }, [type , callRecordings])
    
    const calls = getCalls()
    const NoCallsMessage = getNoCallsMessage()

    if(isLoading) return <Loader />

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
        {calls  &&  calls?.length > 0 ? calls?.map?.((meeting) => (
            <MeetingCard 
            key={meeting?.id}
            icon = {type === "ended" ? "/icons/previous.svg": type === "upcoming" ? "/icons/upcoming.svg" : "/icons/recordings.svg"}
            title = {meeting?.state?.custom?.description?.substring(0,25) || meeting?.filename?.substring(0,20) || "Personal Meeting"}
            date = {meeting?.state?.startsAt?.toLocaleString() || meeting?.start_time.toLocaleString()}
            isPreviousMeeting = {type === "ended"}
            buttonIcon1 = {type === "recordings" ? "/icons/play.svg" : undefined}
            buttonText = {type === "recordings" ? "Play" : "Start"}
            handleClick = {type === "recordings" ? () => router.push(`${meeting?.url}`) : () => router.push(`/meeting/${meeting?.id}`)}
            link = {type === "recordings" ? meeting?.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting?.id}`}
            />
        )) : (
            <h1 className=''>{NoCallsMessage}</h1>
        )}
    </div>
  )
}
