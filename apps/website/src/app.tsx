import { useQuery } from "@apollo/client";
import { RandomJokesDocument } from "contracts";

import { QueryStateSwitch } from "./components/query-state-switch";
import { JokesHeader } from "./features/jokes/components/jokes-header";
import { JokesList } from "./features/jokes/components/jokes-list";
import { JokesLoading } from "./features/jokes/components/jokes-loading";

const INITIAL_JOKE_COUNT = 10;

export function App() {
  const { data, loading, error, refetch } = useQuery(RandomJokesDocument, {
    variables: { count: INITIAL_JOKE_COUNT },
  });
  const jokes = data?.randomJokes ?? [];
  const errorMessage = error?.message;

  return (
    <main className="mx-auto grid min-h-dvh w-full max-w-4xl gap-4 px-4 py-10 md:px-6">
      <JokesHeader
        loading={loading}
        errorMessage={errorMessage}
        visibleCount={INITIAL_JOKE_COUNT}
        onRefresh={() => void refetch()}
      />

      <QueryStateSwitch
        isLoading={loading}
        isError={Boolean(error)}
        loadingComponent={<JokesLoading />}
      >
        <JokesList jokes={jokes} />
      </QueryStateSwitch>
    </main>
  );
}
