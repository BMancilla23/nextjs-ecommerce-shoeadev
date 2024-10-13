import Image from "next/image";
import Link from "next/link";
import React from "react";
import all from "@/public/all.jpg";
import men from "@/public/men.jpg";
import women from "@/public/women.jpg";

export const CategorySelection = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="flex justify-between items-center">
        {/* Shop by category */}
        <h2 className="text-2xl font-bold tracking-tight">
          Comprar por categoría
        </h2>

        {/* Browse all Products */}
        <Link
          className="text-sm font-semibold text-primary hover:text-primary/80"
          href="/products/all"
        >
          Explorar todos los productos &rarr;
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:aspect-w-1 sm:row-span-2">
          <Image
            src={all}
            alt="All Products Image"
            className="object-cover object-center"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55" />
          <div className="p-6 flex items-end">
            <Link href="/products/all">
              {/* All Products */}
              <h3 className="text-white font-semibold">Todos los productos</h3>
              {/* Shop Now */}
              <p className="mt-1 text-sm text-white">Comprar ahora</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={men}
            alt="Products for men Image"
            className="object-cover object-center sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
          <div className="p-6 flex items-end sm:absolute sm:inset-0">
            <Link href="/products/men">
              {/* Men */}
              <h3 className="text-white font-semibold">
                Productos para hombres
              </h3>
              {/* Shop Now */}
              <p className="mt-1 text-sm text-white">Comprar ahora</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={women}
            alt="Women product image"
            className="object-cover object-center sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
          <div className="p-6 flex items-end sm:absolute sm:inset-0">
            <Link href="/products/women">
              {/* Women */}
              <h3 className="text-white font-semibold">
                Productos para mujeres
              </h3>
              {/* Shop Now */}
              <p className="mt-1 text-sm text-white">Comprar ahora</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
