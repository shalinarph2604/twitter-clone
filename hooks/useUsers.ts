import useSWR from "swr";

import fetcher from "@/libs/fetcher";

export interface Users {
    id: string;
    name: string;
    username: string;
}

const useUsers = () => {
    const { 
        data,
        error,
        isLoading,
        mutate
    } = useSWR<Users[]>('/api/users', fetcher);

    return {
        data,
        error,
        isLoading,
        mutate,
    }
};

export default useUsers;