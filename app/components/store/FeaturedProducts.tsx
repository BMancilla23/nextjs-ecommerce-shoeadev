import prisma from "@/app/lib/db";
import React, { Suspense } from "react";
import { LoadingProductCard, ProductCard } from "./ProductCard";

async function getData() {
  /*   await new Promise((resolver) => setTimeout(resolver, 5000)); */
  const data = await prisma.product.findMany({
    where: {
      status: "published",
      isFeatured: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      price: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return data;
}

export const FeaturedProducts = () => {
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">Featured Items</h2>
      <Suspense fallback={<LoadingRows />}>
        <LoadFeaturedproducts />
      </Suspense>
    </>
  );
};

export async function LoadFeaturedproducts() {
  const data = await getData();
  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {data.map((item) => (
        <ProductCard item={item} key={item.id} />
      ))}
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
    </div>
  );
}
