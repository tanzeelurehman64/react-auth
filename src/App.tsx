import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routing/ProtectedRoute';
import { routes } from 'routing/routes';

const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          const { path, component: Component, isProtected } = route;
          return (
            <Route
              key={index}
              path={path}
              element={
                isProtected ? (
                  <ProtectedRoute>
                    <Component />
                  </ProtectedRoute>
                ) : (
                  <Component />
                )
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default App;
