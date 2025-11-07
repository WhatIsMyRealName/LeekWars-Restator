import { createContext } from "react";

export interface RestatorContextType {
  level: number;
}

const RestatorContext = createContext<RestatorContextType>({
  level: 1,
});

export default RestatorContext;
