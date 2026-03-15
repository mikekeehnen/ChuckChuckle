import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

type JokesHeaderProps = {
  loading: boolean;
  errorMessage?: string;
  visibleCount: number;
  onRefresh: () => void;
};

export function JokesHeader({ loading, errorMessage, visibleCount, onRefresh }: JokesHeaderProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div className="grid gap-1">
          <CardTitle className="text-2xl">
            {errorMessage ? "Could not load jokes" : "Chuck Chuckle"}
          </CardTitle>
          <CardDescription>
            {loading
              ? "Loading jokes from Mesh GraphQL..."
              : errorMessage
                ? errorMessage
                : "Powered by GraphQL Mesh, Apollo, and shadcn/ui."}
          </CardDescription>
        </div>
        {!loading && !errorMessage ? (
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{visibleCount} jokes</Badge>
            <Button variant="outline" onClick={onRefresh}>
              Refresh
            </Button>
          </div>
        ) : null}
      </CardHeader>
      {errorMessage ? (
        <CardContent>
          <Button onClick={onRefresh}>Try again</Button>
        </CardContent>
      ) : null}
    </Card>
  );
}
