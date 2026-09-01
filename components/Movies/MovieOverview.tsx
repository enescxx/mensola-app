import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { MovieOverviewProps } from "./types";
import { useTranslation } from "react-i18next";

export default function MovieOverview({ movie }: MovieOverviewProps) {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const [shouldShowMore, setShouldShowMore] = useState(false);

    const overviewText = movie?.overview ?? t("movies.detail.emptyOverview");

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
            {shouldShowMore && <Text style={styles.expandBtnText}>{isExpanded ? t("movies.detail.seeLess") : t("movies.detail.seeMore")}</Text>}
        </TouchableOpacity>
    );
}
