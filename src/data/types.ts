import React from "react"

export type IdeaStatus = "pending" | "completed" | "later"
export type Theme = "dark" | "light" | "system" | "terminal";
export type IdeaAction = (id: number) => void
type EventActions = "add-idea" | "bulk-add"
type View = "pending-ideas" | "saved-for-later" | "completed-ideas" | "about"
export type EventPayloadMapping = {
     changeView: View,
     callAction: EventActions
}

export interface IStreamIdea{
     id: number,
     viewerName: string,
     viewerIdea: string,
     ideaStatus: IdeaStatus
}

export interface IdeaContextProviderState{
     ideas: IStreamIdea[],
     setIdeas: React.Dispatch<React.SetStateAction<IStreamIdea[]>>
}

export interface IFormResult {
     error?: string,
     success?: string
}