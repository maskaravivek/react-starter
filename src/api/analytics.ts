import reactGa from "react-ga";

export const initGA = () => {
  if (
    process.env.NODE_ENV !== "development" &&
    process.env.GOOGLE_ANALYTICS_ID
  ) {
    reactGa.initialize(process.env.GOOGLE_ANALYTICS_ID);
  } else {
    console.log("Mocking out Google Analytics for development."); // tslint:disable-line
  }
};

export const logPageView = () => {
  if (window && window.location.pathname) {
    if (
      process.env.NODE_ENV !== "development" &&
      process.env.GOOGLE_ANALYTICS_ID
    ) {
      reactGa.set({ page: window.location.pathname });
      reactGa.pageview(window.location.pathname);
    } else {
      console.log(`Logging pageview for ${window.location.pathname}`); // tslint:disable-line
    }
  }
};

export const logEvent = ({
  category,
  action,
  label
}: {
  category: "User" | "Batch" | "Order";
  action: string;
  label?: string;
}) => {
  if (category && action) {
    if (
      process.env.NODE_ENV !== "development" &&
      process.env.GOOGLE_ANALYTICS_ID
    ) {
      reactGa.event({ category, action, label });
    } else {
      console.log(`Logging event for category: ${category}, action: ${action}`); // tslint:disable-line
    }
  }
};

export const logException = (description, fatal = false) => {
  if (description) {
    if (
      process.env.NODE_ENV !== "development" &&
      process.env.GOOGLE_ANALYTICS_ID
    ) {
      reactGa.exception({ description, fatal });
    } else {
      console.log(`Logging exception for ${description}, fatal: ${fatal}`); // tslint:disable-line
    }
  }
};

export const logUserId = (userId?: string) => {
  if (userId) {
    if (
      process.env.NODE_ENV !== "development" &&
      process.env.GOOGLE_ANALYTICS_ID
    ) {
      reactGa.set({ userId });
    } else {
      console.log(`Logging userId for ${userId}`); // tslint:disable-line
    }
  }
};

const timings = {};

export const logTimingStart = ({
  endpoint,
  method
}: {
  endpoint: string;
  method: string;
}) => {
  if (endpoint && method && window.performance) {
    timings[`${endpoint}-${method}`] = performance.now();
  }
};

export const logTimingEnd = ({
  endpoint,
  method
}: {
  endpoint: string;
  method: string;
}) => {
  if (
    endpoint &&
    method &&
    timings[`${endpoint}-${method}`] &&
    window.performance
  ) {
    const timeTook = Math.round(
      performance.now() - (timings[`${endpoint}-${method}`] || 0)
    );

    if (
      process.env.NODE_ENV !== "development" &&
      process.env.GOOGLE_ANALYTICS_ID
    ) {
      reactGa.timing({
        value: timeTook,
        label: method,
        category: endpoint,
        variable: "load"
      });
    } else {
      console.log(`Logging timing for ${endpoint}-${method} as ${timeTook}`); // tslint:disable-line
    }
  }
};
