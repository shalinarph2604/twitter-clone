import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth"
import prisma from "@/libs/prismadb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(req, res)

        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        const usersWithFollow = users.map(user => ({
            ...user,
            isFollowing: currentUser.followingIds.includes(user.id)
        }))

        return res.status(200).json(usersWithFollow);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}