import React, { useState, useEffect } from "react";
import Router from "next/router";
import Loader from "./Loader";

// loading widget if the module (page) is loading
const LoadingWidget: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  return loading ? <Loader /> : null;
};

export default LoadingWidget;
