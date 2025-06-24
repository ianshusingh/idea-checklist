import * as z from "zod"

export const IdeaFormSchema = z.object({
     username: z.string().min(1,"Please Enter a Username, That Provided an Idea"),
     idea: z.string().min(1,"Please add an Idea Name (Malware Test or Windows Test)")
})

export const BulkAddFormSchema = z.object({
     text: z.string().min(1,"Add Some Ideas From Notepad To Here")
})