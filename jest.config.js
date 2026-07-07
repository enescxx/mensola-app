module.exports = {
    preset: "jest-expo",
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
    setupFiles: ["./jest.setup.js"] // Yeni ayarımız
};
