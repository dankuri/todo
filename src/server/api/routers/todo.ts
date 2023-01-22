import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const todoRouter = createTRPCRouter({
    createTodo: publicProcedure
        .input(
            z.object({
                title: z.string().min(1, 'Your title should not be empty'),
                description: z.string().optional()
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.todo.create({
                data: input
            })
        }),
    updateTodo: publicProcedure
        .input(
            z.object({
                title: z.string().min(1, 'Your title should not be empty'),
                description: z.string().optional(),
                completed: z.boolean(),
                id: z.string().cuid('No id :(')
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.todo.update({
                data: {
                    title: input.title,
                    description: input.description,
                    completed: input.completed
                },
                where: {
                    id: input.id
                }
            })
        }),
    deleteTodo: publicProcedure
        .input(
            z.object({
                id: z.string().cuid('No id :(')
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.todo.delete({
                where: {
                    id: input.id
                }
            })
        }),
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.todo.findMany()
    })
})
