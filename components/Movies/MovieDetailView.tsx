import { useState } from "react";
import { ScrollView } from "react-native";
import MovieHero from "./MovieHero";
import MovieOverview from "./MovieOverview";
import LatestComments from "./LatestComments";
import { MovieDetailViewProps } from "./types";

export default function MovieDetailView({ movie, isLoading, error }: MovieDetailViewProps) {
    const [isInteractionSheetOpen, setIsInteractionSheetOpen] = useState<boolean>(false);

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
            <MovieHero
                movie={movie}
                isLoading={isLoading}
                error={error}
                isInteractionSheetOpen={isInteractionSheetOpen}
                onInteractionSheetOpenChange={setIsInteractionSheetOpen}
            />
            <MovieOverview movie={movie} />
            <LatestComments
                interactions={movie?.interactions ?? []}
                onRateReviewPress={() => setIsInteractionSheetOpen(true)}
            />
        </ScrollView>
    );
}