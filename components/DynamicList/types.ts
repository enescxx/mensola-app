import React from "react";

interface IDynamicListProps<T> {
    title: string;
    data: T[];
    renderItem: ({ item }: { item: T }) => React.ReactElement;
    onSeeAllPress?: () => void;
    variant?: "horizontal" | "vertical";
    ItemSeparatorComponent?: React.ComponentType<any> | null;
}

export { IDynamicListProps };
