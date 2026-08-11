import { ScrollView } from "react-native";
import MovieHero from "./MovieHero";
import MovieOverview from "./MovieOverview";
import LatestComments from "./LatestComments";
import { MovieDetailViewProps } from "./types";

export default function MovieDetailView({ movie, isLoading, error }: MovieDetailViewProps) {
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
            <MovieHero movie={movie} isLoading={isLoading} error={error} />
            <MovieOverview movie={movie} />
            <LatestComments interactions={movie?.interactions ?? []} />
        </ScrollView>
    );
}