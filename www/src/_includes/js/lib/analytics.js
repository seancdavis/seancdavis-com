import Analytics from "analytics";
import googleAnalyticsPlugin from "@analytics/google-analytics";

onInit(() => {
  if (ENV !== "production") return;

  const analytics = Analytics({
    app: "seancdavis-com",
    plugins: [
      googleAnalyticsPlugin({
        measurementIds: ["G-0Y7TB8B0N3"],
      }),
    ],
  });

  /* Track a page view */
  analytics.page();
});
