import React from "react";
import { Text, View } from "react-native";
import { headerStyles } from "./styles";

export default function HomeHeader() {
    return (
        <View style={headerStyles.header}>
            <View style={headerStyles.logoGroup}>
                <Text style={headerStyles.logoText}>mensola</Text>
            </View>
        </View>
    );
}
