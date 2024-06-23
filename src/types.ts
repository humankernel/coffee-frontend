import { LinkProps } from "@tanstack/react-router";

export type LinkItem = {
  name: string;
  href: LinkProps["to"];
};
