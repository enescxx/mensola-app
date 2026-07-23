import React, { FlatListProps } from "react-native";

interface IDynamicListProps<T> extends Partial<FlatListProps<T>> {
    title?: string;
    data: T[];
    renderItem: ({ item }: { item: T }) => React.ReactElement;
    onSeeAllPress?: () => void;
    variant?: "horizontal" | "vertical";
    ItemSeparatorComponent?: React.ComponentType<any> | null;
}

export { IDynamicListProps };
