import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function BaseContainer({ children }: { children: ReactNode }) {
  return <Container maxW="container.lg">{children}</Container>;
}
