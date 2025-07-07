import { useRouter } from 'next/router';

import useFollowers from '@/hooks/useFollowers';
import useUser from '@/hooks/useUser'

import { ClipLoader } from 'react-spinners';

import FollowListItem from '@/components/FollowListItem';
import Header from '@/components/Header';

const Followers = () => {
    const router = useRouter()

    const { userId } = router.query
    const { data: followers = [], isLoading } = useFollowers(userId as string)
    const { data: fetchedUser } = useUser(userId as string)

    if (isLoading) {
        return (
        <div className="flex justify-center items-center h-full">
            <ClipLoader color="lightblue" size={80} />
        </div>
        )
    }

    if (!followers || followers.length === 0) {
        return <div>No followers found</div> // set the CSS
    }

    return (
        <>
            <Header showBackArrow label={fetchedUser?.name} />
            <div className="flex flex-col m-4 gap-y-4">
            {followers.map((follower) => (
                <FollowListItem key={follower.id} user={follower} />
            ))}
            </div>
        </>
    )
}

export default Followers