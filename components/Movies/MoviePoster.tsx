import { Image, View } from "react-native";
import { styles } from "./styles";

export default function MoviePoster() {
    return (
        <View style={styles.posterWrapper}>
            <Image source={{ uri: "aaa.jpg" }} style={styles.poster} />
        </View>
    )
}