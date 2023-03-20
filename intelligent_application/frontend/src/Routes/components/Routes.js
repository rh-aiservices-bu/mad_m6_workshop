import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Photo = lazy(() => import("../../Photo"));

const MyRoutes = () => (
  <Suspense
    fallback={
      <div className="route-loading">
        <h1>Loading...</h1>
      </div>
    }
  >
    <Routes>
      <Route path="*" element={<Navigate to={"/photo"}/>} />
      <Route path="/photo" exact element={<Photo />} />
    </Routes>
  </Suspense>
);

export default MyRoutes;
