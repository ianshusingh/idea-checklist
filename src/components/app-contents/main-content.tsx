import { IdeaChecklistContext } from "@/data/contexts";
import { useContext, useState, useEffect } from "react";
import {
     Tabs,
     TabsContent,
     TabsList,
     TabsTrigger
} from "@/components/ui/tabs";
import {
     AlertDialog,
     AlertDialogAction,
     AlertDialogCancel,
     AlertDialogContent,
     AlertDialogDescription,
     AlertDialogFooter,
     AlertDialogHeader,
     AlertDialogTitle,
     AlertDialogTrigger,
} from "@/components/ui/alert-dialog" 
import useCategorizedIdeas from "@/hooks/use-categorized-ideas";
import IdeaCard from "../idea-card";
import { IdeaStatus } from "@/data/types";
import { Button } from "../ui/button";
import AboutTab from "../app-contents/about-tab";
import { toast } from "sonner";
import { listenEvent } from "@/data/helpers";

export default function MainContent(){
     const {ideas, setIdeas} = useContext(IdeaChecklistContext);
     const {pendingIdeas,completedIdeas,ideasSavedForLater} = useCategorizedIdeas(ideas);
     const [activeTab, setActiveTab] = useState("pending-ideas");
     const changeStatus = (id: number, status: IdeaStatus) => {
          const ideasCopy = [...ideas];
          const index = ideasCopy.findIndex(val=>val.id===id);
          ideasCopy[index].ideaStatus = status;
          localStorage.setItem("stream-ideas",JSON.stringify(ideasCopy))
          setIdeas(ideasCopy);
     }
     const deleteIdea = (id: number) => {
          const ideasCopy = [...ideas];
          const newIdeas = ideasCopy.filter(val=>val.id!==id);
          localStorage.setItem("stream-ideas",JSON.stringify(newIdeas))
          setIdeas(newIdeas);
          toast.success("Idea Deleted Successfully")
     }
     const clearAllIdeasByStatus = (status: IdeaStatus) => {
          const ideasCopy = [...ideas];
          const newIdeas = ideasCopy.filter(val=>val.ideaStatus!==status);
          localStorage.setItem("stream-ideas",JSON.stringify(newIdeas))
          setIdeas(newIdeas);
          toast.success("Ideas Cleared Successfully")
     }
     const onTabChange = (value: string) => setActiveTab(value);
     useEffect(()=>{
          const unlistenPromise = listenEvent("changeView",view=>setActiveTab(view));
          return () => {
               unlistenPromise.then(unlisten=>unlisten())
          }
     },[])
     return (
          <Tabs defaultValue="pending-ideas" value={activeTab} onValueChange={onTabChange}>
               <TabsList className="w-full">
                    <TabsTrigger className="flex-1" value="pending-ideas">Pending</TabsTrigger>
                    <TabsTrigger className="flex-1" value="saved-for-later">Saved For Later</TabsTrigger>
                    <TabsTrigger className="flex-1" value="completed-ideas">Completed</TabsTrigger>
               </TabsList>
               <TabsContent value="pending-ideas">
                    {pendingIdeas.length===0 ? (
                         <p className="text-muted-foreground text-center">You Have Completed Every Idea</p>
                    ) : (
                         <div className="space-y-2">
                              {pendingIdeas.map(idea=>(
                                   <IdeaCard
                                        key={idea.id}
                                        data={idea}
                                        completeIdea={(id)=>changeStatus(id,"completed")}
                                        saveIdeaForLater={(id)=>changeStatus(id,"later")}
                                        restoreIdeaToPending={(id)=>changeStatus(id,"pending")}
                                        deleteIdea={deleteIdea}
                                   />
                              ))}
                         </div>
                    )}
               </TabsContent>
               <TabsContent value="saved-for-later">
                    {ideasSavedForLater.length===0 ? (
                         <p className="text-muted-foreground text-center">Some Ideas Will Be Saved Here For Later</p>
                    ) : (
                         <div className="space-y-2">
                              {ideasSavedForLater.map(idea=>(
                                   <IdeaCard
                                        key={idea.id}
                                        data={idea}
                                        completeIdea={(id)=>changeStatus(id,"completed")}
                                        saveIdeaForLater={(id)=>changeStatus(id,"later")}
                                        restoreIdeaToPending={(id)=>changeStatus(id,"pending")}
                                        deleteIdea={deleteIdea}
                                   />
                              ))}
                              <AlertDialog>
                                   <AlertDialogTrigger asChild>
                                        <Button variant="destructive">Clear All Ideas</Button>
                                   </AlertDialogTrigger>
                                   <AlertDialogContent>
                                        <AlertDialogHeader>
                                             <AlertDialogTitle>Are you sure to delete all saved ideas?</AlertDialogTitle>
                                             <AlertDialogDescription>This action cannot be undone and will permanently delete all saved ideas.</AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                             <AlertDialogCancel>Cancel</AlertDialogCancel>
                                             <AlertDialogAction onClick={()=>clearAllIdeasByStatus("later")}>Clear All</AlertDialogAction>
                                        </AlertDialogFooter>
                                   </AlertDialogContent>
                              </AlertDialog>
                         </div>
                    )}
               </TabsContent>
               <TabsContent value="completed-ideas">
                    {completedIdeas.length===0 ? (
                         <p className="text-muted-foreground text-center">All Completed Ideas Will Be Added Here</p>
                    ) : (
                         <div className="space-y-2">
                              {completedIdeas.map(idea=>(
                                   <IdeaCard
                                        key={idea.id}
                                        data={idea}
                                        completeIdea={(id)=>changeStatus(id,"completed")}
                                        saveIdeaForLater={(id)=>changeStatus(id,"later")}
                                        restoreIdeaToPending={(id)=>changeStatus(id,"pending")}
                                        deleteIdea={deleteIdea}
                                   />
                              ))}
                              <AlertDialog>
                                   <AlertDialogTrigger asChild>
                                        <Button variant="destructive">Clear All Ideas</Button>
                                   </AlertDialogTrigger>
                                   <AlertDialogContent>
                                        <AlertDialogHeader>
                                             <AlertDialogTitle>Are you sure to delete all completed ideas?</AlertDialogTitle>
                                             <AlertDialogDescription>This action cannot be undone and will permanently delete all completed ideas.</AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                             <AlertDialogCancel>Cancel</AlertDialogCancel>
                                             <AlertDialogAction onClick={()=>clearAllIdeasByStatus("completed")}>Clear All</AlertDialogAction>
                                        </AlertDialogFooter>
                                   </AlertDialogContent>
                              </AlertDialog>
                         </div> 
                    )}
               </TabsContent>
               <TabsContent value="about">
                    <AboutTab/>
               </TabsContent>
        </Tabs>
     )
}