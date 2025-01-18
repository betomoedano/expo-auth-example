const environment = process.env.NODE_ENV;

export const myUrl =
  environment === "development"
    ? "http://localhost:8080"
    : "https://cwb-course-app.expo.app";

export default {
  name: "rn-course-app-2",
  slug: "rn-course-app-2",
  owner: "betoatexpo",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "rncourseapp2",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.betoatexpo.rncourseapp2",
  },
  android: {
    package: "com.betoatexpo.rncourseapp2",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    bundler: "metro",
    output: "server",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    [
      "expo-router",
      {
        origin: myUrl,
      },
    ],
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: "4d527113-4fb8-4f74-a95c-6c70aa9565af",
    },
  },
};
