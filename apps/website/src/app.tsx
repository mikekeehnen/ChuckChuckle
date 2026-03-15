import { QueryStateSwitch } from "./components/query-state-switch";
import { INITIAL_JOKE_COUNT } from "./features/jokes/constants";
import { useFavorites } from "./features/favorites/hooks/use-favorites";
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
  const { favoriteIds, favoriteCount, toggleFavorite, limitErrorMessage } = useFavorites();

  return (
    <main className="mx-auto grid min-h-dvh w-full max-w-4xl gap-4 px-4 py-10 md:px-6">
      <JokesHeader
        loading={loading}
        errorMessage={errorMessage}
        visibleCount={jokes.length || INITIAL_JOKE_COUNT}
        favoriteCount={favoriteCount}
        favoritesLimitMessage={limitErrorMessage}
        isTimerEnabled={isTimerEnabled}
        secondsUntilNextTick={secondsUntilNextTick}
        onToggleTimer={toggleTimer}
        onRefresh={refresh}
      />

      <QueryStateSwitch
        isLoading={loading && jokes.length === 0}
        isError={isError}
        loadingComponent={<JokesLoading />}
        errorComponent={null}
      >
        <JokesList jokes={jokes} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
      </QueryStateSwitch>
    </main>
  );
}
