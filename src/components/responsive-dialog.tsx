import { Button } from "./ui/button";
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
} from "@/components/ui/dialog"
import {
     Drawer,
     DrawerClose,
     DrawerContent,
     DrawerDescription,
     DrawerFooter,
     DrawerHeader,
     DrawerTitle
} from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query";
import React from "react";

interface ResponsiveDialogProps{
     children: React.ReactNode,
     isOpen: boolean,
     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
     title: string,
     description?: string
}
export default function ResponsiveDialog({
     children,
     isOpen,
     setIsOpen,
     title,
     description
}: ResponsiveDialogProps){
     const isDesktop = useMediaQuery("(min-width: 768px)");
     return isDesktop ? (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
               <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                         <DialogTitle>{title}</DialogTitle>
                         {description && (
                              <DialogDescription>{description}</DialogDescription>
                         )}
                    </DialogHeader>
                    {children}
               </DialogContent>
          </Dialog>
     ) : (
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
               <DrawerContent>
                    <DrawerHeader className="text-left">
                         <DrawerTitle>{title}</DrawerTitle>
                         {description && (
                              <DrawerDescription>{description}</DrawerDescription>
                         )}
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                         {children}
                    </div>
                    <DrawerFooter className="pt-2">
                         <DrawerClose asChild>
                              <Button variant="outline">Cancel</Button>
                         </DrawerClose>
                    </DrawerFooter>
               </DrawerContent>
          </Drawer>
     )
}