import Analytics from "analytics"
import googleAnalytics from "@analytics/google-analytics"

onInit(() => {
  if (ENV !== "production") return

  const analytics = Analytics({
    app: "seancdavis-com",
    plugins: [
      googleAnalytics({
        trackingId: "UA-54661520-1"
      })
    ]
  })

  /* Track a page view */
  analytics.page()
})
