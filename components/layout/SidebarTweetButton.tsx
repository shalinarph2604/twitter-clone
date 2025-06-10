import { FaFeather } from "react-icons/fa"
import { useCallback } from "react"
import useLoginModal from "@/hooks/useLoginModal"

const SidebarTweetButton = () => {

    // if user haven't login, the tweetButton will direct user to login first
    const loginModal = useLoginModal();

    const onClick = useCallback(() => {
        loginModal.onOpen();
    }, [loginModal]);

    return (
        <div onClick={onClick}>
            <div className="
                mt-6
                lg:hidden
                rounded-full
                h-14
                w-14
                p-4
                flex
                items-center
                justify-center
                bg-sky-500
                hover:bg-opacity-80
                transition
                cursor-pointer">
                <FaFeather size={24} color="white" />
            </div>
            <div className="
                mt-6
                hidden
                lg:block
                rounded-full
                bg-sky-500
                hover:bg-opacity-90
                cursor-pointer
                transition">
                <p className="
                    hidden
                    lg:block
                    text-center
                    text-white
                    text-[20px]
                    font-semibold">
                  Tweet  
                </p>
            </div>
        </div>
    )
}

export default SidebarTweetButton