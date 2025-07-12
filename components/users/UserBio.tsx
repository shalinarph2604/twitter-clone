/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../Button";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/useEditModal";
import useFollow from "@/hooks/useFollow";

import { format } from "date-fns";
import { useMemo } from "react";
import { useRouter } from "next/router"
import { BiCalendar } from "react-icons/bi";


interface UserBioProps {
    userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
    const router = useRouter()
    
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedUser } = useUser(userId);

    const editModal = useEditModal();

    const { isFollowing, toggleFollow } = useFollow(userId)

    const createdAt = useMemo(() => {
        if (!fetchedUser?.createdAt) {
            return null;
        }
        return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
    }, [fetchedUser?.createdAt]);

    const followersCount = useMemo(() => {
        if (!fetchedUser?.followersCount) return 0

        if (
                Array.isArray(
                fetchedUser?.followersIds) && 
                currentUser?.id &&
                fetchedUser.followersIds.includes(currentUser.id)
            ) {
                return Math.max(0, fetchedUser.followersIds.length - 1);
            }

        if (Array.isArray(fetchedUser?.followersIds)) {
            return fetchedUser.followersIds.length
        }
        return fetchedUser.followersCount
    }, [fetchedUser?.followersCount, fetchedUser?.followersIds, currentUser?.id])
    console.log(followersCount)

    const followingCount = useMemo(() => {
        if (!fetchedUser?.followingCount) return 0

        if (Array.isArray(fetchedUser?.followingIds) &&
            currentUser?.id && 
            fetchedUser.followingIds.includes(currentUser.id)
        ) {
            return Math.max(0, fetchedUser.followingIds.length - 1);
        }

        if (Array.isArray(fetchedUser?.followingIds)) {
            return fetchedUser.followingIds.length
        }
        return fetchedUser.followingCount
    }, [fetchedUser?.followingCount, fetchedUser?.followingIds, currentUser?.id])

    return (
        <div className="border-b-[1px] border-neutral-800 p-4">
            <div className="flex justify-end p-2">
                {currentUser?.id === userId ? (
                    <Button secondary label="Edit" onClick={editModal.onOpen} /> 
                ) : (
                    <Button
                        onClick={toggleFollow}
                        label={isFollowing ? 'Following' : 'Follow'}
                        secondary={isFollowing}
                        outline={isFollowing}
                    />
                )}
            </div>
            <div className="mt-8 px-4">
                <div className="flex flex-col">
                    <p className="text-white text-2xl font-semibold">
                        {fetchedUser?.name}
                    </p>
                    <p className="text-md text-neutral-500">
                        @{fetchedUser?.username}
                    </p>
                </div>
                <div className="flex flex-col mt-4">
                    <p className="text-white">
                        {fetchedUser?.bio}
                    </p>
                    <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
                        <BiCalendar size={24} />
                        <p>Joined {createdAt}</p>
                    </div>
                    <div className="flex flex-row items-center gap-6 mt-4">
                        <div 
                            onClick={() => router.push(`/users/${userId}/following`)}
                            className="flex flex-row items-center gap-1 cursor-pointer"
                        >
                            <p className="text-white"> 
                                {followingCount}
                            </p>
                            <p className="text-neutral-500">Following</p>
                        </div>
                        <div
                            onClick={() => router.push(`/users/${userId}/followers`)}
                            className="flex flex-row items-center gap-1 cursor-pointer"
                        >
                            <p className="text-white">
                                {followersCount}
                            </p>
                            <p className="text-neutral-500">Followers</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBio;