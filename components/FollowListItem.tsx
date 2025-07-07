import useUser from "@/hooks/useUser"
import useFollow from "@/hooks/useFollow"
import useCurrentUser from "@/hooks/useCurrentUser"

import Avatar from "@/components/Avatar"
import Button from "@/components/Button"

interface FollowItemListProps {
    user: {
        id: string;
        name: string;
        username: string;
    }
}

const FollowListItem: React.FC<FollowItemListProps> = ({ user }) => {
    
    const { isFollowing, toggleFollow } = useFollow(user.id)
    const { mutate } = useUser(user.id)
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()

    const handleClick = async () => {
        await toggleFollow()
        await Promise.all([mutate(), mutateCurrentUser()])
    }

    return (
        <div className="flex flex-row gap-6 items-center">
            <Avatar userId={user.id} />
            <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">
                    {user.name}
                </p>
                <p className="text-neutral-400 text-sm">
                    @{user.username}
                </p>
            </div>
            <div className="ml-auto">
                {currentUser?.id !== user.id && (
                    <Button 
                        onClick={handleClick}
                        label={isFollowing ? 'Following' : 'Follow'}
                        secondary={isFollowing}
                        outline={isFollowing}
                    />
                )}
            </div>
        </div>
    )
}

export default FollowListItem