import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../page/Home';
import Draw from '../page/Draw';
import Controller from '../page/Controller';

const RouteIdentifier = ({ fallback = <div className="loading" />, notFoundPath = '/' }) => {
  return (
    <Suspense fallback={fallback}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/draw" element={<Draw />} />
        <Route path="/controller" element={<Controller />} />
        <Route path="*" element={<Navigate to={notFoundPath} replace />} />
      </Routes>
    </Suspense>
  );
};

export default RouteIdentifier;
