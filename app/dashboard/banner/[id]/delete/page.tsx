import { deleteBanner } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DeleteBannerPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          {/* Are youn absolutely sure?*/}
          <CardTitle>¿Estás absolutamente seguro?</CardTitle>
          {/* This actions cannot be undone. This will permanently delete this product and remove all data our servers*/}
          <CardDescription>
            Este acción no se puede deshacer. Se eliminará permanentemente este
            banner y eliminará toda la información de nuestros servidores.
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          {/* Cancel */}
          <Button variant="secondary" asChild>
            <Link href="/dashboard/banner">Cancelar</Link>
          </Button>
          {/* Continue */}
          <form action={deleteBanner}>
            <input type="hidden" name="bannerId" value={params.id} />
            {/* <Button variant="destructive">Continuar</Button> */}
            <SubmitButton variant="destructive" text="Eliminar" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
