import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeFeed: async (parent, args, {request, isAuthenticated}, info) => {
            isAuthenticated(request);

            const { user } = request;
            const following = await prisma.user({id: user.id}).following();

            return prisma.posts({
                where: {
                    user: {
                        id_in: [...following.map(user => user.id), user.id]
                    }
                }
            });
        }
    }
};