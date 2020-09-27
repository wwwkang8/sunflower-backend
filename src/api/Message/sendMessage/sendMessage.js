import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        sendMessage: async (parent, args, { request, isAuthenticated }, info) => {
            isAuthenticated(request);
            const {  user } = request;
            const { roomId, message, toId } = args;
            let room;
            if(roomId === undefined){
                if(user.id !== toId){
                    room = await prisma.createRoom({
                        participants: 
                        {
                            connect: [{id: toId}, {id: user.id}]
                        }
                    });
                }
            }else {
                room = await prisma.room({id: roomId});

            }

            if(!room){

                throw Error("Room not found");
            }

            const participants = await prisma.room({ id: room.id }).participants();
            const getTo = participants.filter(
                participant => participant.id !== user.id
            )[0];
            const newMessage = await prisma.createMessage({
                text: message,
                from : {
                    connect: {id: user.id}
                },
                to: {
                    connect: {id : roomId ? getTo.id : toId}
                },
                room: {
                    connect: {
                        id: room.id
                    }
                }
            });

            return newMessage;

        }
    }
};