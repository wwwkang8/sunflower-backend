import { prisma } from "../../../../generated/prisma-client";

export default {

    User: {

        fullName: async (_, __, { request, isAuthenticated }) => {
            const userId = request.userId
            const { user } = await prisma.user({id: userId});
            
            
        }

    }


}