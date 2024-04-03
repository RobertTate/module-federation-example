import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Dynamically import the federated modules
const App1 = lazy(() => import('app1/App'));
const App2 = lazy(() => import('app2/App'));

function App() {
    return (
        <>
            <div style={{ border: "3px solid red", padding: "1rem" }}>
                <h1>Host</h1>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/about">About</a></li>
                    </ul>
                </nav>
                <Suspense fallback={<div>Loading...</div>}>
                    <Router>
                        <Routes>
                            <Route path="/contact" element={<App1 />} />
                            <Route path="/about" element={<App2 />} />
                        </Routes>
                    </Router>
                </Suspense>
            </div>
        </>
    )
}


export default App;
