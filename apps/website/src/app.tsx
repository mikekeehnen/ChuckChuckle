import { useQuery } from "@apollo/client";
import { RandomJokesDocument } from "contracts";

import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import { Skeleton } from "./components/ui/skeleton";

const INITIAL_JOKE_COUNT = 10;

export function App() {
  const { data, loading, error, refetch } = useQuery(RandomJokesDocument, {
    variables: { count: INITIAL_JOKE_COUNT },
  });

  if (loading) {
    return (
      <main className="mx-auto grid min-h-dvh w-full max-w-4xl gap-4 px-4 py-10 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Chuck Chuckle</CardTitle>
            <CardDescription>Loading jokes from Mesh GraphQL...</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </CardContent>
        </Card>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto grid min-h-dvh w-full max-w-4xl gap-4 px-4 py-10 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Could not load jokes</CardTitle>
            <CardDescription>{error.message}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => void refetch()}>Try again</Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto grid min-h-dvh w-full max-w-4xl gap-4 px-4 py-10 md:px-6">
      <Card>
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div className="grid gap-1">
            <CardTitle className="text-2xl">Chuck Chuckle</CardTitle>
            <CardDescription>Powered by GraphQL Mesh, Apollo, and shadcn/ui.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{INITIAL_JOKE_COUNT} jokes</Badge>
            <Button variant="outline" onClick={() => void refetch()}>
              Refresh
            </Button>
          </div>
        </CardHeader>
      </Card>

      <ol className="grid gap-3">
        {data?.randomJokes.map((joke, index) => (
          <li key={`${joke.id ?? "unknown"}-${index}`}>
            <Card size="sm">
              <CardContent className="grid gap-2">
                <p className="text-sm leading-relaxed">{joke.value}</p>
                <Separator />
                <p className="text-xs text-muted-foreground">id: {joke.id ?? "unknown"}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
    </main>
  );
}
