import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar as CalendarIcon } from "lucide-react";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string({
    required_error: "Atas Nama harus diisi",
  }),
  account_number: z.number({
    required_error: "Nomor rekening harus diisi",
    invalid_type_error: "Nomor rekening harus berupa angka",
  }),
  bank_name: z.string({
    required_error: "Bank harus diisi",
  }),
  bank_branch: z.string({
    required_error: "Cabang Bank harus diisi",
  }),
});

const CreateDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      account_number: 0,
      bank_name: "",
      bank_branch: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setOpen(false);
    form.reset();
    toast("Invoice Berhasil Dibuat");
    console.log(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Invoice Baru</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Atas Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukan Atas Nama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bank_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Bank</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukan Nama Bank" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bank_branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cabang</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukan Cabang" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="account_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Rekening</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukan Nomor Rekening" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Tanggal */}

              {/* Submit */}
              <div className="flex items-center justify-end gap-2">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
