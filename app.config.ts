const environment = process.env.NODE_ENV;
const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

interface EnvironmentValues {
  name: string;
  bundleIdentifier: string;
  package: string;
}

function getEnvironmentValues(): EnvironmentValues {
  if (IS_DEV) {
    return {
      name: "Course App Dev",
      bundleIdentifier: "com.betoatexpo.rncourseapp2.dev",
      package: "com.betoatexpo.rncourseapp2.dev",
    };
  }

  if (IS_PREVIEW) {
    return {
      name: "Course App Preview",
      bundleIdentifier: "com.betoatexpo.rncourseapp2.preview",
      package: "com.betoatexpo.rncourseapp2.preview",
    };
  }

  return {
    name: "Course App CWB",
    bundleIdentifier: "com.betoatexpo.rncourseapp2",
    package: "com.betoatexpo.rncourseapp2",
  };
}

export const myUrl =
  environment === "development"
    ? "http://localhost:8080"
    : "https://cwb-course-app.expo.app";

export default {
  name: getEnvironmentValues().name,
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
    bundleIdentifier: getEnvironmentValues().bundleIdentifier,
    config: {
      usesNonExemptEncryption: false,
    },
  },
  android: {
    package: getEnvironmentValues().package,
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
  updates: {
    url: "https://u.expo.dev/4d527113-4fb8-4f74-a95c-6c70aa9565af",
  },
  runtimeVersion: {
    policy: "appVersion",
  },
};
