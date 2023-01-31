import React from 'react';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import './App.scss';
import { NavBar } from './components/NavBar';
import { PageNotFound } from './components/PageNotFound';
import { PeoplePage } from './components/PeoplePage';

export const App:React.FC = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={(
              <h1 className="title">Home Page</h1>
            )}
          />
          <Route
            path="/home"
            element={
              <Navigate to="/" replace />
            }
          />
          <Route
            path="/people"
            element={(
              <>
                <h1 className="title">People Page</h1>
                <PeoplePage />
              </>
            )}
          />
          <Route
            path="*"
            element={
              <PageNotFound />
            }
          />
        </Routes>
      </div>
    </main>
  </div>
);
