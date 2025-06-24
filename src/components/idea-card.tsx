import { CheckCircle, Clock, Edit, RotateCw, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { IdeaAction, IStreamIdea } from "@/data/types";
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
     DialogTrigger
} from "@/components/ui/dialog";
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
import IdeaForm from "./form/idea-form";
import { useState } from "react";

interface IdeaCardProps{
     data: IStreamIdea,
     completeIdea: IdeaAction,
     saveIdeaForLater: IdeaAction,
     restoreIdeaToPending: IdeaAction,
     deleteIdea: IdeaAction
}
export default function IdeaCard({
     data,
     completeIdea,
     saveIdeaForLater,
     restoreIdeaToPending,
     deleteIdea
}: IdeaCardProps){
     const {viewerIdea,viewerName,ideaStatus,id} = data;
     const [open, setOpen] = useState(false);
     return (
          <div className="p-4 border shadow bg-card text-card-foreground rounded-xl flex justify-between items-center">
               <div className="w-3/4 break-words">
                    <h2 className="text-xl font-semibold">{viewerIdea}</h2>
                    <p className="text-muted-foreground">{viewerName}</p>
               </div>
               <div className="flex items-center gap-2">
                    {ideaStatus==="pending" && (
                         <>
                              <Button size="icon" title="Complete" onClick={()=>completeIdea(id)}><CheckCircle/></Button>
                              <Button size="icon" variant="outline" title="Save For Later" onClick={()=>saveIdeaForLater(id)}><Clock/></Button>
                              <Dialog open={open} onOpenChange={setOpen}>
                                   <DialogTrigger asChild>
                                        <Button size="icon" variant="outline" title="Edit an Idea"><Edit/></Button>
                                   </DialogTrigger>
                                   <DialogContent>
                                        <DialogHeader>
                                             <DialogTitle>Edit an Idea</DialogTitle>
                                             <DialogDescription>Edit an Existing a Malware Test Idea Or Windows Experiment Idea To The New One</DialogDescription>
                                        </DialogHeader>
                                        <IdeaForm data={data} setOpen={setOpen}/>
                                   </DialogContent>
                              </Dialog>
                         </>
                    )}
                    {(ideaStatus==="completed" || ideaStatus==="later") && (
                         <>
                              <Button size="icon" title="Restore" onClick={()=>restoreIdeaToPending(id)}><RotateCw/></Button>
                              <AlertDialog>
                                   <AlertDialogTrigger asChild>
                                        <Button size="icon" variant="outlineDestructive" title="Delete"><Trash/></Button>
                                   </AlertDialogTrigger>
                                   <AlertDialogContent>
                                        <AlertDialogHeader>
                                             <AlertDialogTitle>Are you sure to delete this idea?</AlertDialogTitle>
                                             <AlertDialogDescription>This action cannot be undone and will permanently delete the idea.</AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                             <AlertDialogCancel>Cancel</AlertDialogCancel>
                                             <AlertDialogAction onClick={()=>deleteIdea(id)}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                   </AlertDialogContent>
                              </AlertDialog>
                         </>
                    )}
               </div>
          </div>
     )
}