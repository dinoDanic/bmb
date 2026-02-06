import { Route } from "next";

export type Href<T extends string = string> = Route<T> | URL;
