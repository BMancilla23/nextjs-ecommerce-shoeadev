"use client";

import { editProduct } from "@/app/actions";
import { productSchema } from "@/app/lib/zodSchemas";
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
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { $Enums } from "@prisma/client";

import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "../SubmitButton";
import Image from "next/image";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { categories } from "@/app/lib/categories";

interface EditFormProps {
  data: {
    id: string;
    name: string;
    description: string;
    status: $Enums.ProductStatus;
    price: number;
    images: string[];
    category: $Enums.Category;
    isFeatured: boolean;
  };
}

export const EditForm = ({ data }: EditFormProps) => {
  const [images, setImages] = useState<string[]>(data.images);

  const [lastResult, action] = useFormState(editProduct, undefined);

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

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <input type="hidden" name="productId" value={data.id} />
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        {/* Edit Product */}
        <h1 className="text-xl font-semibold tracking-tight">
          Editar Producto
        </h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          {/* Product Details */}
          <CardTitle>Detalles del Producto</CardTitle>
          {/* In this form you can update your product */}
          <CardDescription>
            En este formulario podrás actualizar tu producto
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
                defaultValue={data.name}
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
                defaultValue={data.description}
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
                defaultValue={data.price}
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
                defaultChecked={data.isFeatured}
              />
              <p className="text-red-500">{fields.isFeatured.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Status */}
              <Label>Estado</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={data.status}
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
                defaultValue={data.category}
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
          {/* Update Product */}

          <SubmitButton text="Actualizar Producto" />
        </CardFooter>
      </Card>
    </form>
  );
};