import { useRouter } from 'next/router';

import useFollowers from '@/hooks/useFollowers';
import useUser from '@/hooks/useUser'
import useCurrentUser from '@/hooks/useCurrentUser';

import { ClipLoader } from 'react-spinners';

import FollowListItem from '@/components/FollowListItem';
import Header from '@/components/Header';

const Followers = () => {
    const router = useRouter()

    const { userId } = router.query
    const { data: followers = [], isLoading } = useFollowers(userId as string)
    const { data: fetchedUser } = useUser(userId as string)
    const { data: currentUser } = useCurrentUser()

    if (isLoading) {
        return (
        <div className="flex justify-center items-center h-full">
            <ClipLoader color="lightblue" size={80} />
        </div>
        )
    }

    const filteredFollowers = userId === currentUser?.id ?
    followers.filter(user => user.id !== currentUser?.id) :
    followers

    if (!filteredFollowers || filteredFollowers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-60">
                <span className="text-neutral-500 text-lg font-medium">
                    No followers found
                </span>
            </div>
        )
    }

    return (
        <>
            <Header showBackArrow label={fetchedUser?.name} />
            <div className="flex flex-col m-4 gap-y-4">
            {filteredFollowers.map((follower) => (
                <FollowListItem key={follower.id} user={follower} />
            ))}
            </div>
        </>
    )
}

export default Followers