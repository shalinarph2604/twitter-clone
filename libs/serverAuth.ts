import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Session } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/libs/prismadb";

const serverAuth = async (
    req: NextApiRequest,
    res: NextApiResponse,
) => {
    const session = await getServerSession(req, res, authOptions) as Session;

    if (!session?.user?.email) {
        throw new Error('Not signed in');
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    if (!currentUser) {
        throw new Error('Not signed in');
    }

    return { currentUser };
}

export default serverAuth;