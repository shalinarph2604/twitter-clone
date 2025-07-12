import { useRouter } from "next/router";

import useFollowing from "@/hooks/useFollowing";
import useUser from "@/hooks/useUser";
import useCurrentUser from "@/hooks/useCurrentUser";

import { ClipLoader } from "react-spinners";

import FollowListItem from "@/components/FollowListItem";
import Header from "@/components/Header";

const Following = () => {
    const router = useRouter()
    
    const { userId } = router.query
    const { data: followingList = [], isLoading } = useFollowing(userId as string)
    const { data: fetchedUser } = useUser(userId as string)
    const { data: currentUser } = useCurrentUser()

    if (isLoading) {
        return (
        <div className="flex justify-center items-center h-full">
            <ClipLoader color="lightblue" size={80} />
        </div>
        )
    }

    const filteredList = userId === currentUser?.id ? 
    followingList.filter(user => user.id !== currentUser?.id) :
    followingList

    if (!filteredList || filteredList.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-60">
                <span className="text-neutral-500 text-lg font-medium">
                    No following found
                </span>
            </div>
        )
    }

    return (
        <>
            <Header showBackArrow label={fetchedUser?.name} />
            <div className="flex flex-col m-4 gap-y-4">
                {filteredList.map((following) => (
                    <FollowListItem key={following.id} user={following} />
                ))}
            </div>
        </>
    )
}

export default Following