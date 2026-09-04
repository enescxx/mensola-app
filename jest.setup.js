jest.mock("@expo/vector-icons", () => {
    const React = require("react");
    const { Text } = require("react-native");

    const mockIcon = props => <Text {...props}>{props.name}</Text>;

    return {
        Ionicons: mockIcon,
        Entypo: mockIcon,
        FontAwesome: mockIcon,
        FontAwesome6: mockIcon,
    };
});

jest.mock("@react-native-async-storage/async-storage", () =>
    require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => key,
        i18n: {
            changeLanguage: () => new Promise(() => {}),
        },
    }),
}));

jest.mock("expo-image", () => {
    const React = require("react");
    const { Image } = require("react-native");
    return { Image: (props) => <Image {...props} /> };
});

jest.mock("react-native-mmkv", () => ({
    createMMKV: () => ({
        set: jest.fn(),
        getString: jest.fn(),
        getNumber: jest.fn(),
        getBoolean: jest.fn(),
        delete: jest.fn(),
        clearAll: jest.fn(),
        contains: jest.fn(),
        getAllKeys: jest.fn(() => []),
    }),
}));
