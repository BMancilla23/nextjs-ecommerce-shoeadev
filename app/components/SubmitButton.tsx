"use client";

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { useFormStatus } from "react-dom";

interface submitButtonProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

export const SubmitButton = ({ text, variant }: submitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {/* Please Wait */}
          Espere por favor
        </Button>
      ) : (
        <Button variant={variant}>{text}</Button>
      )}
    </>
  );
};

export const ShoppingBagButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full mt-5">
          <Loader2 className="mr-4 h-5 w-5 animate-spin" />
          {/* Please Wait */}
          Espere por favor
        </Button>
      ) : (
        <Button size="lg" className="w-full mt-5" type="submit">
          <ShoppingBag className="mr-4 h-5 w-5" />
          Añadir al Carrito
        </Button>
      )}
    </>
  );
};

export const DeleteItem = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button disabled className="font-medium text-primary text-end">
          Removiendo...
        </button>
      ) : (
        <button type="submit" className="font-medium text-primary text-end">
          Remover
        </button>
      )}
    </>
  );
};

export const CheckoutButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full mt-5">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          {/* Please Wait */}
          Espere por favor
        </Button>
      ) : (
        <Button size="lg" className="w-full mt-5" type="submit">
          <ShoppingBag className="mr-4 h-5 w-5" />
          Comprobar
        </Button>
      )}
    </>
  );
};
