import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { FavoritesList } from "./features/favorites/components/favorites-list";
import { useFavorites } from "./features/favorites/hooks/use-favorites";

export function FavoritesApp() {
  const { favorites, favoriteCount, removeFavorite } = useFavorites();

  return (
    <main className="mx-auto grid min-h-dvh w-full max-w-4xl gap-4 px-4 py-10 md:px-6">
      <Card>
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div className="grid gap-1">
            <CardTitle className="text-2xl">Favorite jokes</CardTitle>
            <CardDescription>Your saved Chuck Norris jokes, persisted locally.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{favoriteCount}/10 favorites</Badge>
            <Button variant="outline" asChild>
              <a href="/">Back to jokes</a>
            </Button>
          </div>
        </CardHeader>
      </Card>

      <FavoritesList favorites={favorites} onRemoveFavorite={removeFavorite} />
    </main>
  );
}
