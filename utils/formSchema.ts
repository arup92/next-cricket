import { z } from "zod";

export const addTeamSchema = z.object({
    teamId: z.string().trim().min(2, 'Minimum 2 chars').toUpperCase(),
    teamName: z.string().trim().min(2, 'Minimum 2 chars'),
    teamType: z.string().optional(),
})