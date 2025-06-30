/* eslint-disable @typescript-eslint/no-unused-vars */
import useSWR from "swr"
import axios from "axios"
import toast from "react-hot-toast"

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const useFollow = (userId: string) => {
    const { data: isFollowing, mutate } = useSWR(
        userId ? `/api/follow-status?userId=${userId}` : null,
        fetcher
    )
    
    const toggleFollow = async () => {
        try {
            if (isFollowing) {
                await axios.delete('/api/follow', { data: { userId }})
            } else {
                await axios.post('/api/follow', { userId })
            }
            mutate();
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    return { 
        isFollowing: !!isFollowing,
        toggleFollow,
    }
}

export default useFollow 