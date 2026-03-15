import { QueryStateSwitch } from "./components/query-state-switch";
import { INITIAL_JOKE_COUNT } from "./features/jokes/constants";
import { JokesHeader } from "./features/jokes/components/jokes-header";
import { JokesList } from "./features/jokes/components/jokes-list";
import { JokesLoading } from "./features/jokes/components/jokes-loading";
import { useJokesFeed } from "./features/jokes/hooks/use-jokes-feed";

export function App() {
  const {
    jokes,
    loading,
    isError,
    errorMessage,
    isTimerEnabled,
    secondsUntilNextTick,
    toggleTimer,
    refresh,
  } = useJokesFeed();

  return (
    <main className="mx-auto grid min-h-dvh w-full max-w-4xl gap-4 px-4 py-10 md:px-6">
      <JokesHeader
        loading={loading}
        errorMessage={errorMessage}
        visibleCount={jokes.length || INITIAL_JOKE_COUNT}
        isTimerEnabled={isTimerEnabled}
        secondsUntilNextTick={secondsUntilNextTick}
        onToggleTimer={toggleTimer}
        onRefresh={refresh}
      />

      <QueryStateSwitch
        isLoading={loading}
        isError={isError}
        loadingComponent={<JokesLoading />}
        errorComponent={null}
      >
        <JokesList jokes={jokes} />
      </QueryStateSwitch>
    </main>
  );
}
