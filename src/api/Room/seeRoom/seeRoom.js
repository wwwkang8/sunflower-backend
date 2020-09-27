import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeRoom: async (parent, args, {request, isAuthenticated}, info) => {
            isAuthenticated(request);
            const { id } = args;
            const { user } = request;
            const canSee = await prisma.$exists.room({
                participants_some: {
                    id: user.id
                }
            });

            if(canSee){

                const room = await prisma.room({ id });

                return room;

            }else{
                throw Error("You can't see this");
            }
        }
    }
}