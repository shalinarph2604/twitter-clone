import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        const { currentUser } = await serverAuth(req, res)
        const { userId } = req.query

        if (!userId || typeof userId !== 'string') {
            return res.status(400).json(false)
        }

        const isFollowing = currentUser.followingIds.includes(userId)

        return res.status(200).json(isFollowing)
    } catch (error) {
        console.log(error)
        return res.status(500).json(false)
    }
}