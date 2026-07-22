jest.mock("@expo/vector-icons", () => {
    const React = require("react");
    const { Text } = require("react-native");

    const mockIcon = props => <Text {...props}>{props.name}</Text>;

    return {
        Ionicons: mockIcon,
        Entypo: mockIcon
    };
});

jest.mock("@react-native-async-storage/async-storage", () =>
    require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
