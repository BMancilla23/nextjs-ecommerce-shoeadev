/* import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components"; */

import { CategorySelection } from "../../components/store/CategorySelection";
import { FeaturedProducts } from "../../components/store/FeaturedProducts";
import { Hero } from "../../components/store/Hero";

export default function HomePage() {
  return (
    <>
      {/* Usar cuando crees un dashboard del administrador para logearte y luego descartarlo */}
      {/* <div>
        <Button asChild>
          <LoginLink>Login</LoginLink>
        </Button>
        <Button asChild>
          <RegisterLink>Register</RegisterLink>
        </Button>
      </div> */}

      <div className="py-12">
        <Hero />
        <CategorySelection />
        <FeaturedProducts />
      </div>
    </>
  );
}
