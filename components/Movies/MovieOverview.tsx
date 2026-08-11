import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { MovieOverviewProps } from "./types";

export default function MovieOverview({ movie }: MovieOverviewProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [shouldShowMore, setShouldShowMore] = useState(false);

    const overviewText = movie?.description ?? "Bu film hakkında daha fazla bilgi yok.";

    return (
        <TouchableOpacity style={styles.overviewWrapper} onPress={() => setIsExpanded(!isExpanded)} activeOpacity={0.7}>
            <Text
                style={styles.overview}
                numberOfLines={isExpanded ? undefined : 3}
                onTextLayout={(e) => {
                    if (e.nativeEvent.lines.length > 3) {
                        setShouldShowMore(true);
                    }
                }}>
                {overviewText}
            </Text>
            {shouldShowMore && <Text style={styles.expandBtnText}>{isExpanded ? "Daha az" : "Daha fazla"}</Text>}
        </TouchableOpacity>
    );
}
