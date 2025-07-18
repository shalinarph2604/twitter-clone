import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb"

export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        const { userId } = req.query

        if (!userId || typeof userId !== 'string') {
            throw new Error ('Invalid ID')
        }

        // find all `user` who has specific ${userId} in their following list
        const followers = await prisma.user.findMany({
            where: {
                followingIds: { has: userId }
            },
            select: {
                id: true,
                name: true,
                username: true,
            }
        })
        return res.status(200).json(followers)
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }

}