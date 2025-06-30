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

        // find a specific user, and take the following list from `followingIds`
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { followingIds: true }
        })

        if (!user) return res.status(404).end()

        // in each specific ${user}, find all their following by filtering another user (by their id) in user.followingIds array
        const following = await prisma.user.findMany({
            where: {
                id: { in: user.followingIds }
            },
            select: {
                id: true,
                name: true,
                username: true,
            }
        })
        return res.status(200).json(following)
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}