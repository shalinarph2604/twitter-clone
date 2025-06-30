/* eslint-disable @typescript-eslint/no-explicit-any */
import useUsers from "@/hooks/useUsers";
import { User } from "@/hooks/useUsers";
import useCurrentUser from "@/hooks/useCurrentUser";

import FollowUserItem from "../FollowUserItem";

const FollowBar = () => {
    const { data: users = [] } = useUsers()
    const { data: currentUser } = useCurrentUser()

    const filteredUsers = users.filter((user: Record<string, any>) => user.id !== currentUser?.id)
    
    if (filteredUsers.length === 0) {
        return null;
    }
    
    return (
        <div className="px-6 py-4 hidden lg:block w-xs">
            <div className="bg-neutral-800 rounded-xl p-4">
                <h2 className="text-white text-xl font-semibold">Who to follow</h2>
                <div className="flex flex-col gap-6 mt-4">
                    {filteredUsers.map((user: User) => (
                        <FollowUserItem key={user.id} user={user}/>
                    ))}
                </div> 
            </div>
        </div>
    )
}

export default FollowBar