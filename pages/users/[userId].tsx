import Header from "@/components/Header";
import { useRouter } from "next/router";

import { ClipLoader } from "react-spinners";

import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import UserBio from "@/components/users/UserBio";
import PostFeed from "@/components/posts/PostFeed";

const UserView = () => {
    const router = useRouter();
    const { userId } = router.query;

    const { data: fetchedUser, isLoading } = useUser(userId as string);

    if (isLoading || !fetchedUser) {
        return (
            <div
                className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

    return (
        <>
            <Header showBackArrow label={fetchedUser?.name}/>
            <UserHero userId={userId as string} />
            <UserBio userId={userId as string} />
            <PostFeed userId={userId as string}/>
        </>
    );
}

export default UserView;