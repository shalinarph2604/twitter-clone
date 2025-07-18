import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import usePost from "@/hooks/usePost";

import { useState } from "react";
import { useCallback } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";

interface FormProps {
    placeholder: string;
    isComment?: boolean;
    postId?: string;
}

const Form: React.FC<FormProps> = ({
    placeholder,
    isComment,
    postId
}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser()
    const { mutate: mutatePosts } = usePosts()
    const { mutate: mutatePost } = usePost(postId as string)

    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts'

            await axios.post(url, { body })

            toast.success('Tweet created')

            setBody('')

            mutatePosts();
            mutatePost();
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [body, mutatePosts, isComment, postId, mutatePost]);

    return (
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
            {currentUser ? (
                <div className="flex flex-row gap-4">
                    <div>
                        <Avatar userId={currentUser.id} />
                    </div>
                    <div className="w-full">
                        <textarea
                            disabled={isLoading}
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                            placeholder={placeholder}
                            className="
                                disabled:opacity-80
                                peer
                                resize-none
                                mt-3
                                w-full
                                bg-black
                                ring-0
                                text-[20px]
                                placeholder-neutral-500
                                text-white
                            "
                        >
                        </textarea>
                        <hr
                            className="
                                opacity-0
                                peer-focus:opacity-100
                                h-[1px]
                                w-full
                                border-neutral-800
                                transition
                            " 
                        />
                        <div className="mt-4 flex flex-row justify-end">
                            <Button 
                                disabled={isLoading || !body}
                                onClick={onSubmit}
                                label="Tweet"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-8">
                    <h1 
                        className="
                            text-white
                            text-2xl
                            text-center
                            mb-4
                            font-semibold
                        ">
                        Welcome to Twitter
                    </h1>
                    <div className="flex flex-row items-center justify-center gap-4">
                        <Button label="Login" onClick={loginModal.onOpen}/>
                        <Button label="Register" onClick={registerModal.onOpen} secondary/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Form;