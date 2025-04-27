"use client";

import Container from "@/components/common/page-containter";
import React, { FC } from "react";
import { z } from "zod";

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
import { useRouter } from "next/navigation";
import HeaderIntro from "@/components/common/header-intro";
import { error } from "console";

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
  total_amount: z.number(),
  received_bank: z.string().min(2, {
    message: "Nama Bank Harus Diisi.",
  }),
});

interface CreateInvoicePageProps {
  breadcrumb: any[];
}

const CreateInvoicePage: FC<CreateInvoicePageProps> = ({ breadcrumb }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      name: "",
      items: [],
      total_amount: 0,
      received_bank: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/invoice", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          total_amount: values.items.reduce(
            (total, item) => total + item.quantity * item.price,
            0
          ),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        console.log("Form successfully submitted!");
        toast("Invoice Berhasil Dibuat");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <HeaderIntro title="Buat Invoice" breadcrumbs={breadcrumb} canBack />
      <Container container="fluid">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-5 border p-4 rounded-md"
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
                <div className="mb-3 grid grid-cols-4 gap-3">
                  <FormLabel>Nama</FormLabel>
                  <FormLabel>Jumlah</FormLabel>
                  <FormLabel>Satuan</FormLabel>
                  <FormLabel>Harga</FormLabel>
                </div>
                {form.watch("items").map((_, index) => (
                  <div key={index} className="grid grid-cols-4 gap-3 mb-3">
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
              <FormField
                control={form.control}
                name="received_bank"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
      </Container>
    </>
  );
};

export default CreateInvoicePage;
