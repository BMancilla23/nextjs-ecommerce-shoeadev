"use client";

import { createProduct } from "@/app/actions";
import { UploadDropzone } from "@/app/lib/uploadthing";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/zodSchemas";
import { useState } from "react";
import Image from "next/image";
import { categories } from "@/app/lib/categories";
import { SubmitButton } from "@/app/components/SubmitButton";

export default function ProductCreatePage() {
  const [lastResult, action] = useFormState(createProduct, undefined);
  const [images, setImages] = useState<string[]>([]);

  // Configuración del formulario con validación zod
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: productSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  // Función para eliminar imágenes seleccionadas
  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        {/* New Product */}
        <h1 className="text-xl font-semibold tracking-tight">Nuevo Producto</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          {/* Product Details */}
          <CardTitle>Detalles del Producto</CardTitle>
          {/* In this form you can create your product */}
          <CardDescription>
            En este formulario podrás crear tu producto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              {/* Name */}
              <Label>Nombre</Label>
              {/* Product Name */}
              <Input
                type="text"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={fields.name.initialValue}
                className="w-full"
                placeholder="Nombre del producto"
              />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Description */}
              <Label>Descripción</Label>
              {/* Write your description right here...*/}
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={fields.description.initialValue}
                className="w-full"
                placeholder="Escribe tu descripción aquí..."
              />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Price */}
              <Label>Precio</Label>
              {/* Product Price */}
              <Input
                type="number"
                key={fields.price.key}
                name={fields.price.name}
                defaultValue={fields.price.initialValue}
                className="w-full"
                placeholder="$55"
              />
              <p className="text-red-500">{fields.price.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Featured Product */}
              <Label>Producto Destacado</Label>
              <Switch
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                defaultValue={fields.isFeatured.initialValue}
              />
              <p className="text-red-500">{fields.isFeatured.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Status */}
              <Label>Estado</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={fields.status.initialValue}
              >
                <SelectTrigger>
                  {/* Select status */}
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>

                <SelectContent>
                  {/* Draft */}
                  <SelectItem value="draft">Borrador</SelectItem>
                  {/* published */}
                  <SelectItem value="published">Publicado</SelectItem>
                  {/* Archived */}
                  <SelectItem value="archived">Archivado</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.status.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Category */}
              <Label>Categoria</Label>
              <Select
                key={fields.category.key}
                name={fields.category.name}
                defaultValue={fields.category.initialValue}
              >
                <SelectTrigger>
                  {/* Select category */}
                  <SelectValue placeholder="Selecciona una categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.category.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Images */}
              <Label>Imágenes</Label>
              <input
                type="hidden"
                value={images}
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={fields.images.initialValue as string[]}
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-[100px] h-[100px]">
                      <Image
                        src={image}
                        fill
                        className="object-contain rounded-lg border"
                        alt="Product Image"
                      />
                      <button
                        onClick={() => handleDelete(index)}
                        className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadDropzone
                  appearance={{
                    button: {
                      backgroundColor: "#E43359",
                    },
                  }}
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url));
                  }}
                  onUploadError={() => {
                    alert("Something went wrong");
                  }}
                />
              )}

              <p className="text-red-500">{fields.images.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {/* Create Product */}
          {/*  <Button type="submit" size="lg">
            Crear Producto
          </Button> */}
          <SubmitButton text={"Crear Producto"} />
        </CardFooter>
      </Card>
    </form>
  );
}
