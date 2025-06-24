import { IdeaChecklistContext } from "@/data/contexts";
import { getIdeasFromLocalStorage } from "@/data/helpers";
import React, { useState } from "react";

interface IdeaContextProviderProps{
     children: React.ReactNode
}

export default function IdeaContextProvider({children}: IdeaContextProviderProps){
     const [ideas, setIdeas] = useState(getIdeasFromLocalStorage());
     return (
          <IdeaChecklistContext.Provider value={{ideas, setIdeas}}>
               {children}
          </IdeaChecklistContext.Provider>
     )
}