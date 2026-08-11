import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function MovieOverview() {
    const [isExpanded, setIsExpanded] = useState(false)
    const [shouldShowMore, setShouldShowMore] = useState(false);

    return (
        <TouchableOpacity style={styles.overviewWrapper} onPress={() => { setIsExpanded(!isExpanded) }} activeOpacity={0.7}>
            <Text style={styles.overview} numberOfLines={isExpanded ? undefined : 3} onTextLayout={(e) => {
                if (e.nativeEvent.lines.length > 3) {
                    setShouldShowMore(true);
                }
            }}>
                Lorem qui minim exercitation aute aliqua.
                Elit esse labore Lorem cupidatat mollit ea voluptate consectetur sit ut.
                Aute elit dolore fugiat sit nisi dolor ea exercitation velit.
                Deserunt enim proident aliquip amet proident.
                Lorem qui minim exercitation aute aliqua.
                Elit esse labore Lorem cupidatat mollit ea voluptate consectetur sit ut.
                Aute elit dolore fugiat sit nisi dolor ea exercitation velit.
                Deserunt enim proident aliquip amet proident.

            </Text>
            {shouldShowMore && (
                <Text style={styles.expandBtnText}>{isExpanded ? "Daha az" : "Daha fazla"}</Text>
            )}
        </TouchableOpacity>
    )
}