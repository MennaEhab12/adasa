
import { Link } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import data from "./posts.json";
export default function NotFound() {
  return (
    <main className="not-found">
      <span className="not-found-code">404</span>

      <div className="eyebrow">
        <span className="eyebrow-line" />
        PAGE NOT FOUND
      </div>

      <h1>Oops! Lost in the frame.</h1>

      <p>
        The page you're looking for doesn't exist
        or may have been moved.
      </p>

      <Link to="/" className="primary-button">
        Back to Home ↗
      </Link>
    </main>
  );
}
