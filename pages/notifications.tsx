import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Header from "@/components/Header";
import NotificatonFeed from "@/components/NotificatonFeed";

// protect the /notifications if unauthorized
export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            session
        }
    }
}

const Notifications = () => {
    return (
        <>
         <Header label="Notifications" showBackArrow />
         <NotificatonFeed />
        </>
    )
}

export default Notifications