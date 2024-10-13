"use client";

import { createBanner } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButton";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { bannerSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function BannerCreatePage() {
  const [image, setImages] = useState<string | undefined>(undefined);
  const [lastResult, action] = useFormState(createBanner, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, {
        schema: bannerSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        {/* New Banner */}
        <h1 className="text-xl font-semibold tracking-tight">Nuevo banner</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          {/* Banner Details */}
          <CardTitle>Detalles del banner</CardTitle>
          {/* Create your banner right here */}
          <CardDescription>Crea tu banner aquí mismo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-3">
              {/* Name */}
              <Label>Nombre</Label>
              {/* Create title for Banner */}
              <Input
                type="text"
                placeholder="Crea título para banner"
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
              />
              <p className="text-red-500">{fields.title.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Image */}
              <Label>Imagen</Label>
              <input
                type="hidden"
                value={image}
                key={fields.imageString.key}
                name={fields.imageString.name}
                defaultValue={fields.imageString.initialValue}
              />
              {image !== undefined ? (
                <div className="aspect-square overflow-hidden w-48 h-48 relative">
                  <Image
                    src={image}
                    alt="Product image"
                    fill
                    className="object-cover border rounded-lg"
                  />
                </div>
              ) : (
                <UploadDropzone
                  onClientUploadComplete={(res) => {
                    setImages(res[0].url);
                  }}
                  onUploadError={() => {
                    alert("Something went wrong");
                  }}
                  endpoint="bannerImageRoute"
                  appearance={{
                    button: "ut-ready:bg-[#E43359] ut-uploading:bg-[#E43359]",
                  }}
                />
              )}
              <p className="text-red-500">{fields.imageString.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {/* Create Banner */}
          <SubmitButton text="Crear banner" />
        </CardFooter>
      </Card>
    </form>
  );
}
