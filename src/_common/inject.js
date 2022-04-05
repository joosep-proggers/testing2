import { createContext, useContext } from "react";

const injectDefault = new Map();
const InjectContext = createContext(injectDefault);

const useInject = (original) => {
  const injections = useContext(InjectContext);
  if (injections.has(original)) {
    // This cast is type-safe, because `original` and `mock` were required to have the same type in `defineMock()`.
    // Type-safety not trivial to achieve with native TS: https://stackoverflow.com/a/51573704/177663
    return injections.get(original);
  }
  return original;
};

export const injectableHook = (hook) => {
  // Define a wrapper for 'hook'
  // I tried doing this type-safely but failed -- it would break type arguments of useEnhancedTable<*>
  // (see https://stackoverflow.com/a/54946767/177663)
  const useWrapper = function () {
    return useInject(hook).apply(this, arguments);
  };
  return Object.assign(useWrapper, { originalHook: hook });
};
