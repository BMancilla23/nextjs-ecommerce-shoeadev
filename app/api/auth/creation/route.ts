import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();

    const user = await getUser();

    // Verifica si el usuario está autenticado
    if (!user || user === null || !user.id) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }
    // Buscar usuario en la base de datos
    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    // Si no se encuentra el usuario, crearlo
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          firstName: user.given_name ?? "",
          lastName: user.family_name ?? "",
          email: user.email ?? "",
          profileImage:
            user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
        },
      });
    }

    // Redirigir al usuario a la página principal
    return NextResponse.redirect("http://localhost:3000/");
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
