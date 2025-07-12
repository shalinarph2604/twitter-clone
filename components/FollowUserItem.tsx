import Avatar from "./Avatar"
import Button from "./Button"

import useFollow from "@/hooks/useFollow"
import useUsers from "@/hooks/useUsers"
import useCurrentUser from "@/hooks/useCurrentUser"

interface FollowUserItemProps {
    user: {
        id: string;
        name: string;
        username: string;
    }
}

const FollowUserItem: React.FC<FollowUserItemProps> = ({ user }) => {

    const { isFollowing, toggleFollow } = useFollow(user.id)
    const { mutate } = useUsers()
    const { mutate: mutateCurrentUser} = useCurrentUser()
    
    const handleClick = async () => {
        await toggleFollow()
        await Promise.all([mutate(), mutateCurrentUser()])
    }

    return (
        <div className="flex flex-row items-center gap-4">
            <div className="flex-shrink-0">
                <Avatar userId={user.id} />
            </div>
            <div className="flex flex-col min-w-0">
                <p className="text-white font-semibold text-sm truncate max-w-[120px]">
                    {user.name}
                </p>
                <p className="text-neutral-400 text-sm truncate max-w-[120px]">
                    @{user.username}
                </p>
            </div>
            <div className="ml-auto">
                <Button 
                    onClick={handleClick}
                    label={isFollowing ? 'Following' : 'Follow'}
                    secondary={isFollowing}
                    outline={isFollowing}
                />
            </div>
        </div>
    )
}

export default FollowUserItem