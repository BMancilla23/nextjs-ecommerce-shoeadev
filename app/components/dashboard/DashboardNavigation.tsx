"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  {
    // Summary
    name: "Resumen",
    href: "/dashboard",
  },
  {
    // Orders
    name: "Pedidos",
    href: "/dashboard/orders",
  },
  {
    // Products
    name: "Productos",
    href: "/dashboard/products",
  },
  {
    // Banner Picture
    name: "Banner",
    href: "/dashboard/banner",
  },
];

export const DashboardNavigation = () => {
  const pathname = usePathname();

  return (
    <>
      {links.map(({ href, name }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "relative text-muted-foreground hover:text-foreground transition-colors duration-200 ease-in-out",
            href === pathname
              ? "text-black font-bold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-black"
              : "hover:after:content-[''] hover:after:absolute hover:after:-bottom-1 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-muted-foreground"
          )}
        >
          {name}
        </Link>
      ))}
    </>
  );
};
