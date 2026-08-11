import { ScrollView, View } from "react-native";
import MovieHero from "./MovieHero";
import MovieOverview from "./MovieOverview";
import LatestComments from "./LatestComments";

export default function MovieDetailView() {
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
            <MovieHero />
            <MovieOverview />
            <LatestComments />
        </ScrollView>
    );
}