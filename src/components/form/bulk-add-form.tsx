import * as z from "zod";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { BulkAddFormSchema } from "@/schemas";
import {
     Form,
     FormControl,
     FormField,
     FormItem,
     FormLabel,
     FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { FormError } from "./form-error";
import { IFormResult } from "@/data/types";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { bulkAddIdea } from "@/data/helpers";
import { IdeaChecklistContext } from "@/data/contexts";

interface BulkAddFormProps{
     setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function BulkAddForm({setOpen}: BulkAddFormProps){
     const context = useContext(IdeaChecklistContext);
     const [error, setError] = useState<string | undefined>("");
     const form = useForm<z.infer<typeof BulkAddFormSchema>>({
          resolver: zodResolver(BulkAddFormSchema),
          defaultValues: {
               text: ""
          }
     })
     const handleSubmit = (values: z.infer<typeof BulkAddFormSchema>) => {
          setError("");
          const result: IFormResult = bulkAddIdea(values,context)
          if(result?.error) setError(result?.error)
          if(result?.success) {
               toast.success(result?.success)
               setOpen(false)
               form.reset()
          }
     }
     return (
          <Form {...form}>
               <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <div className="space-y-4">
                         <FormField
                              control={form.control}
                              name="text"
                              render={({field})=>(
                                   <FormItem>
                                        <FormLabel>Ideas as a Text Format</FormLabel>
                                        <FormControl>
                                             <Textarea
                                                  {...field}
                                                  placeholder="John Doe&#10;Do Some Windows Experiments&#10;&#10;TechYT&#10;Antivirus VS Malware (later)&#10;..."
                                                  className="min-h-32 max-h-52"
                                             />
                                        </FormControl>
                                        <FormMessage/>
                                   </FormItem>
                              )}
                         />
                    </div>
                    <FormError message={error}/>
                    <div className="flex items-center gap-2">
                         <Button type="submit">Bulk Add Ideas</Button>
                    </div>
               </form>
          </Form>
     )
}