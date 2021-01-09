import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createSogeting: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;

            const { title, intro, questions } = args;

            const sogeting = await prisma.createSogeting({
                title,
                intro,
                questiongs,
                user: { connect: {id: user.id} }
            });

            questions.forEach(
                async question => {
                    await prisma.createQuestion({
                        question: question,
                        questioner:
                    });
                }
            )

        }
    }
}