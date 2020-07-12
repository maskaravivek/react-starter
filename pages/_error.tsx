import * as React from "react";

import { NextPage } from "next";

// import * as Sentry from "@sentry/node";

const ErrorComponent: React.FC<{}> = ({}) => {
  return <div>Please try again in a few minutes.</div>;
};

const ErrorPage: NextPage<{}> = () => <ErrorComponent />;

ErrorPage.getInitialProps = async (props) => {
  const { res, err } = props;

  if (res) {
    // Running on the server, the response object is available.
    //
    // Next.js will pass an err on the server if a page's `getInitialProps`
    // threw or returned a Promise that rejected

    if (res.statusCode === 404) {
      // Opinionated: do not record an exception in Sentry for 404
      return { statusCode: 404 };
    }

    if (err) {
      // Sentry.captureException(err);

      return props;
    }
  } else {
    // Running on the client (browser).
    //
    // Next.js will provide an err if:
    //
    //  - a page's `getInitialProps` threw or returned a Promise that rejected
    //  - an exception was thrown somewhere in the React lifecycle (render,
    //    componentDidMount, etc) that was caught by Next.js's React Error
    //    Boundary. Read more about what types of exceptions are caught by Error
    //    Boundaries: https://reactjs.org/docs/error-boundaries.html
    if (err) {
      // Sentry.captureException(err);

      return props;
    }
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  // Sentry.captureException(
  //   new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  // );

  return props;
};

export default ErrorPage;
