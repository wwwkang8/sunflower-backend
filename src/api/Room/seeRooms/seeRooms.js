import { deserializeUser } from "passport";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeRooms: async(parent, args, { request, isAuthenticated }, info) => {
            isAuthenticated(request);
            const { user } = request;
            return prisma.rooms({
                where: {
                    participants_some: {
                        id: user.id
                    }
                }
            })
        }
    }
}