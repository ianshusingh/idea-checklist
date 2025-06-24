import * as z from "zod";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { IdeaFormSchema } from "@/schemas";
import {
     Form,
     FormControl,
     FormField,
     FormItem,
     FormLabel,
     FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormSuccess } from "@/components/form/form-success";
import { useContext, useState } from "react";
import { FormError } from "./form-error";
import { addIdea, editIdea } from "@/data/helpers";
import { IdeaChecklistContext } from "@/data/contexts";
import { IFormResult, IStreamIdea } from "@/data/types";
import { toast } from "sonner";

interface IdeaFormProps{
     data?: IStreamIdea,
     setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function IdeaForm({data, setOpen}: IdeaFormProps){
     const context = useContext(IdeaChecklistContext);
     const [success, setSuccess] = useState<string | undefined>("");
     const [error, setError] = useState<string | undefined>("");
     const form = useForm<z.infer<typeof IdeaFormSchema>>({
          resolver: zodResolver(IdeaFormSchema),
          defaultValues: {
               username: data?.viewerName || "",
               idea: data?.viewerIdea || ''
          }
     })
     const currForm = form.watch();
     const initalData: z.infer<typeof IdeaFormSchema> = {
          username: data?.viewerName || "",
          idea: data?.viewerIdea || ''
     }
     const isEditMode = !!data;
     const isSameData = JSON.stringify(currForm)===JSON.stringify(initalData);
     const handleSubmit = (values: z.infer<typeof IdeaFormSchema>) => {
          setError("");
          setSuccess("");
          const result: IFormResult = isEditMode ? editIdea(values,context,data.id) as IFormResult : addIdea(values,context);
          if(result?.error) setError(result?.error)
          if(result?.success) {
               if(isEditMode){
                    toast.success(result?.success)
                    setOpen(false)
               } else {
                    setSuccess(result?.success);
                    form.reset()
               }
          }
     }
     const handleCloseForm = () => {
          form.reset();
          setOpen(false);
     }
     return (
          <Form {...form}>
               <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <div className="space-y-4">
                         <FormField
                              control={form.control}
                              name="username"
                              render={({field})=>(
                                   <FormItem>
                                        <FormLabel>Viewer Name</FormLabel>
                                        <FormControl>
                                             <Input
                                                  {...field}
                                                  placeholder="John Doe"
                                             />
                                        </FormControl>
                                        <FormMessage/>
                                   </FormItem>
                              )}
                         />
                         <FormField
                              control={form.control}
                              name="idea"
                              render={({field})=>(
                                   <FormItem>
                                        <FormLabel>Idea Name</FormLabel>
                                        <FormControl>
                                             <Input
                                                  {...field}
                                                  placeholder="Test Malware Against Antivirus"
                                             />
                                        </FormControl>
                                        <FormMessage/>
                                   </FormItem>
                              )}
                         />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <div className="flex items-center gap-2">
                         <Button type="submit" disabled={isEditMode && isSameData}>{isEditMode ? "Edit" : "Add"} an Idea</Button>
                         {isEditMode && (
                              <Button variant="outline" type="reset" onClick={handleCloseForm}>Cancel</Button>
                         )}
                    </div>
               </form>
          </Form>
     )
}