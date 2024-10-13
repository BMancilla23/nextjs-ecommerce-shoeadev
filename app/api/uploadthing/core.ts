import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

// Inicializamos `uploadthing` usando `createUploadthing`, que nos permite configurar rutas de subida
const f = createUploadthing();

// Definimos el `FileRouter` para gestionar varias rutas de subida de archivos
export const ourFileRouter = {
  // Definimos una ruta de subida llamada `imageUploader`
  imageUploader: f({
    // Especificamos que solo aceptamos imágenes, con un tamaño máximo de archivo de 4MB
    // y un máximo de 10 archivos por subida.
    image: { maxFileSize: "4MB", maxFileCount: 10 },
  })
    // Middleware: Define permisos y validaciones antes de la subida
    .middleware(async ({}) => {
      // Obtenemos la sesión del usuario autenticado usando Kinde
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      // Si el usuario no existe o no tiene el email autorizado, lanzamos un error de autorización
      if (!user || user.email !== "bmancilla119@gmail.com")
        throw new UploadThingError("Unauthorized"); // Prohíbe la subida si el usuario no está autorizado

      // Retornamos el `userId` como `metadata`, el cual será accesible en `onUploadComplete`
      return { userId: user.id };
    })
    // Evento que se ejecuta cuando la subida se ha completado con éxito
    .onUploadComplete(async ({ metadata, file }) => {
      // Este código se ejecuta en el servidor una vez la subida ha sido completada

      // Logueamos el `userId` del usuario que ha subido el archivo
      console.log("Upload complete for userId:", metadata.userId);

      // Logueamos la URL del archivo subido
      console.log("file url", file.url);

      // Devolvemos un objeto que será enviado al cliente en el callback `onClientUploadComplete`
      return { uploadedBy: metadata.userId };
    }),

  bannerImageRoute: f({
    // Especificamos que solo aceptamos imágenes, con un tamaño máximo de archivo de 4MB
    // y un máximo de 10 archivos por subida.
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    // Middleware: Define permisos y validaciones antes de la subida
    .middleware(async ({}) => {
      // Obtenemos la sesión del usuario autenticado usando Kinde
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      // Si el usuario no existe o no tiene el email autorizado, lanzamos un error de autorización
      if (!user || user.email !== "bmancilla119@gmail.com")
        throw new UploadThingError("Unauthorized"); // Prohíbe la subida si el usuario no está autorizado

      // Retornamos el `userId` como `metadata`, el cual será accesible en `onUploadComplete`
      return { userId: user.id };
    })
    // Evento que se ejecuta cuando la subida se ha completado con éxito
    .onUploadComplete(async ({ metadata, file }) => {
      // Este código se ejecuta en el servidor una vez la subida ha sido completada

      // Logueamos el `userId` del usuario que ha subido el archivo
      console.log("Upload complete for userId:", metadata.userId);

      // Logueamos la URL del archivo subido
      console.log("file url", file.url);

      // Devolvemos un objeto que será enviado al cliente en el callback `onClientUploadComplete`
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter; // El objeto debe cumplir con la estructura de `FileRouter`

// Exportamos el tipo de `FileRouter` para que se pueda usar en otras partes del código
export type OurFileRouter = typeof ourFileRouter;
