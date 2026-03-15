import type { ReactNode } from "react";

type QueryStateSwitchProps = {
  isLoading: boolean;
  isError: boolean;
  loadingComponent?: ReactNode | null;
  errorComponent?: ReactNode | null;
  children: ReactNode;
};

export function QueryStateSwitch({
  isLoading,
  isError,
  loadingComponent,
  errorComponent,
  children,
}: QueryStateSwitchProps) {
  if (isLoading) {
    return loadingComponent;
  }

  if (isError) {
    return errorComponent;
  }

  return children;
}
