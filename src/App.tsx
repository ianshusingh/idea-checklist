import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";
import {Info, Plus} from "lucide-react"
import IdeaForm from "./components/form/idea-form";
import IdeaContextProvider from "./components/providers/idea-context";
import MainContent from "@/components/app-contents/main-content";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import ResponsiveDialog from "./components/responsive-dialog";
import BulkAddForm from "./components/form/bulk-add-form";
import { listenEvent } from "./data/helpers";

export default function App() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  useEffect(()=>{
    const unlistenPromise = listenEvent("callAction",(action)=>{
      switch(action){
        case "add-idea":
          setIsAddOpen(true);
          setIsImportOpen(false);
          break;
        case "bulk-add":
          setIsImportOpen(true);
          setIsAddOpen(false);
          break;
        default:
          console.error("Invalid Action")
      }
    })
    return () => {
      unlistenPromise.then(unlisten=>unlisten());
    }
  },[])
  return (
    <IdeaContextProvider>
      <ResponsiveDialog
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        title="Add an Idea"
        description="Add a Malware Test Idea Or Windows Experiment Idea Provided By a Viewer of the Stream"
      >
        <IdeaForm setOpen={setIsAddOpen}/>
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isImportOpen}
        setIsOpen={setIsImportOpen}
        title="Bulk Add Ideas From Text"
        description="Bulk add existing ideas written in Notepad to the checklist."
      >
        <BulkAddForm setOpen={setIsImportOpen}/>
      </ResponsiveDialog>
      <div className="p-4 space-y-3.5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold">Idea Checklist</h1>
          <div className="flex items-center justify-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" title="Add an Idea"><Plus/></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm">
                  <button onClick={()=>setIsAddOpen(true)} className="cursor-pointer flex justify-start rounded-md p-2 transition-all duration-75 hover:bg-accent w-full">
                    Add An Idea
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm">
                  <button onClick={()=>setIsImportOpen(true)} className="cursor-pointer flex justify-start rounded-md p-2 transition-all duration-75 hover:bg-accent w-full">
                    Bulk Add Ideas
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle/>
          </div>
        </div>
        <div className="flex items-center gap-1.5"><Info/><p>Be Patient and Wait Until He Marks Your Idea As Completed.</p></div>
        <MainContent/>
      </div>
    </IdeaContextProvider>
  )
}