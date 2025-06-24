import { getIdeasByStatus } from "@/data/helpers";
import { IStreamIdea } from "@/data/types";
import { useMemo } from "react";

export default function useCategorizedIdeas(ideas: IStreamIdea[]){
     const pendingIdeas = useMemo(()=>getIdeasByStatus(ideas,"pending"),[ideas]);
     const ideasSavedForLater = useMemo(()=>getIdeasByStatus(ideas,"later"),[ideas]);
     const completedIdeas = useMemo(()=>getIdeasByStatus(ideas,"completed"),[ideas]);
     return {
          pendingIdeas,
          ideasSavedForLater,
          completedIdeas
     }
}