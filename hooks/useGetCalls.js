import { useUser } from "@clerk/nextjs"
import { useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export default function useGetCalls() {

    const [calls, setCalls] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const client = useStreamVideoClient()
    const user = useUser();

    useEffect(() => {
        
       const loadCalls = async () => {
            if(!client || !user?.user?.id) return;

            setIsLoading(true);

            try {
                const { calls } = await client.queryCalls({
                    sort : [{field: 'starts_at' , direction: -1}],
                    filter_conditions: {
                        starts_at: {$exists: true},
                        $or: [
                            {
                                created_by_user_id: user?.user?.id
                            },
                            {
                                members: {$in: [user?.user?.id]}
                            }
                        ]
                    }
                });

                setCalls(calls)


            } catch (error) {
                console.log(error.message)                
            } finally {
                setIsLoading(false)
            }
       } 

       loadCalls()

    }, [client, user?.user?.id])


    const now = new Date()

    const endedCalls = calls.filter(({state: {startsAt , endedAt }}) => {
        return (startsAt && new Date(startsAt) < now || !!endedAt)
    })
    const upCommingCalls = calls.filter(({state: {startsAt}}) => {
        return (startsAt && new Date(startsAt) > now)
    })
    

  return {
    endedCalls ,
    upCommingCalls , 
    callRecordings: calls , 
    isLoading
  }
}
