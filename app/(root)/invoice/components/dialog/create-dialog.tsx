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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  date: z.date(),
  name: z.string().min(2, {
    message: "Nama Cabang Harus Diisi.",
  }),
  items: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      unit: z.string(),
      price: z.number(),
    })
  ),
  received_bank: z.string().min(2, {
    message: "Nama Bank Harus Diisi.",
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
      date: new Date(),
      name: "",
      items: [],
      received_bank: "",
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
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tanggal</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Cabang</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukan Nama Cabang" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Tanggal */}

              {/* Items */}
              {form.watch("items").length > 0 && (
                <div className="border p-4 rounded-md">
                  <div className="mb-3 grid grid-cols-4">
                    <FormLabel>Nama</FormLabel>
                    <FormLabel>Jumlah</FormLabel>
                    <FormLabel>Satuan</FormLabel>
                    <FormLabel>Harga</FormLabel>
                  </div>
                  {form.watch("items").map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 mb-3"
                    >
                      <FormField
                        control={form.control}
                        name={`items.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Barang" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Quantity */}
                      <FormField
                        control={form.control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Quantity"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Unit */}
                      <FormField
                        control={form.control}
                        name={`items.${index}.unit`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Satuan" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Price */}
                      <FormField
                        control={form.control}
                        name={`items.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  <div className="flex items-center justify-end gap-2">
                    <Label>Total</Label>
                    <Input
                      placeholder="Total"
                      className="w-fit"
                      type="currency"
                      disabled
                      value={form
                        .watch("items")
                        .reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        )}
                    />
                  </div>
                </div>
              )}

              {form.watch("items").length === 0 && (
                <div className="border p-4 rounded-md">
                  <p className="text-center">
                    Silahkan klik tombol tambah barang
                  </p>
                </div>
              )}

              {form.watch("items").length > 0 && (
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Bank Penerima" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      BTN Sukabumi - Rien Sulami
                    </SelectItem>
                    <SelectItem value="dark">
                      BTN Sukabumi - Rien Sulami
                    </SelectItem>
                    <SelectItem value="bold">
                      BTN Sukabumi - Rien Sulami
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}

              {/* Submit */}
              <div className="flex items-center justify-end gap-2">
                <Button
                  type="button"
                  onClick={() =>
                    form.setValue("items", [
                      ...form.getValues("items"),
                      { name: "", quantity: 0, unit: "", price: 0 },
                    ])
                  }
                >
                  Tambah Barang
                </Button>
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
