"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// Lista de enlaces del navbar
export const navbarLinks = [
  {
    id: 0,
    name: "Inicio",
    href: "/",
  },
  {
    id: 1,
    name: "Productos",
    href: "/products/all",
  },
  {
    id: 2,
    name: "Hombre",
    href: "/products/men",
  },
  {
    id: 3,
    name: "Mujer",
    href: "/products/women",
  },
  {
    id: 4,
    name: "Niños",
    href: "/products/kids",
  },
];

// Componente de los enlaces del navbar
export const NavbarLinks = () => {
  const location = usePathname(); // Obtener la ruta actual

  return (
    <div className="hidden md:flex justify-center items-center gap-x-6 ml-10">
      {navbarLinks.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={cn(
            location === item.href
              ? "text-primary" // Estilo activo
              : "text-gray-700 hover:text-primary", // Hover sobre enlaces inactivos
            "group p-2 font-medium rounded-md transition-colors duration-300 ease-in-out" // Transición suave
          )}
        >
          {/* Subrayado y animación al hacer hover */}
          <span
            className={cn(
              location === item.href
                ? "w-full bg-primary"
                : "w-0 group-hover:w-full bg-primary",
              "block h-1 transition-all duration-500 ease-in-out"
            )}
          />
          {item.name}
        </Link>
      ))}
    </div>
  );
};
