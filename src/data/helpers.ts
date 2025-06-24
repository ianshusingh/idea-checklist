import { IdeaContextProviderState, IdeaStatus, IFormResult, IStreamIdea } from "./types";
import * as z from "zod";
import { BulkAddFormSchema, IdeaFormSchema } from "@/schemas";
import {EventCallback, listen} from "@tauri-apps/api/event"
import { EventPayloadMapping } from "./types"

export function listenEvent<Key extends keyof EventPayloadMapping>(
     event: Key,
     callback: (payload: EventPayloadMapping[Key]) => void
){
     const eventCallback: EventCallback<EventPayloadMapping[Key]> = (event) => {
          callback(event.payload)
     }
     return listen(event,eventCallback)
}

export const getIdeasFromLocalStorage = (): IStreamIdea[] => JSON.parse(localStorage.getItem("stream-ideas") as string) || []
export const getIdeasByStatus = (ideas: IStreamIdea[], status: IdeaStatus) => ideas.filter(val=>val.ideaStatus===status);

export const addIdea = (
     values: z.infer<typeof IdeaFormSchema>,
     context: IdeaContextProviderState
): IFormResult => {
     const {ideas, setIdeas} = context
     const ideasCopy = [...ideas];
     const validatedFields = IdeaFormSchema.safeParse(values);
     if(!validatedFields.success)
          return {error: "All Fields are Invalid"};
     const {username,idea} = validatedFields.data
     const newIdea: IStreamIdea = {
          id: ideasCopy.length+1,
          viewerName: username,
          viewerIdea: idea,
          ideaStatus: "pending",
     }
     ideasCopy.push(newIdea);
     localStorage.setItem("stream-ideas",JSON.stringify(ideasCopy))
     setIdeas(ideasCopy);
     return {success: "Idea Added Successfully"}
}

export const editIdea = (
     values: z.infer<typeof IdeaFormSchema>,
     context: IdeaContextProviderState,
     id: number
): IFormResult => {
     const {ideas, setIdeas} = context
     const ideasCopy = [...ideas];
     const validatedFields = IdeaFormSchema.safeParse(values);
     if(!validatedFields.success)
          return {error: "All Fields are Invalid"};
     const {username,idea} = validatedFields.data;
     const i = ideasCopy.findIndex(val=>val.id===id)
     ideasCopy[i] = {id, viewerName: username, viewerIdea: idea, ideaStatus: "pending"}
     localStorage.setItem("stream-ideas",JSON.stringify(ideasCopy))
     setIdeas(ideasCopy);
     return {success: "Idea Edited Successfully"}
}

export const bulkAddIdea = (
     values: z.infer<typeof BulkAddFormSchema>,
     context: IdeaContextProviderState,
) => {
     const {ideas, setIdeas} = context
     const ideasCopy = [...ideas];
     const validatedFields = BulkAddFormSchema.safeParse(values);
     if(!validatedFields.success)
          return {error: "All Fields are Invalid"};
     const {text} = validatedFields.data;
     const lines = text.split("\n").map(line=>line.trim()).filter(line=>line!=="")
     for(let i=0;i<lines.length;i+=2){
          const name = lines[i];
          const idea = lines[i+1];
          const status: IdeaStatus = idea.toLowerCase().includes("(later)") ? "later" : "pending"
          const newIdea: IStreamIdea = {
               id: ideasCopy.length+1,
               viewerName: name,
               viewerIdea: idea.replace(/\(later\)/gi,"").trim(),
               ideaStatus: status
          }
          ideasCopy.push(newIdea)
     }
     localStorage.setItem("stream-ideas",JSON.stringify(ideasCopy))
     setIdeas(ideasCopy);
     return {success: "All Ideas Added Successfully"}
}