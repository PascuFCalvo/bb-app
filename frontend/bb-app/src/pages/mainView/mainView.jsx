import React from 'react';
import './mainView.css';

function MainView() {
    return (
        <div className="app-container">
            <nav className="navbar">
                <h1>Logo</h1>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav>
            <div className="content-area">
                <aside className="aside">
                    <h4>Sidebar</h4>
                    <ul>
                        <li>Link 1</li>
                        <li>Link 2</li>
                        <li>Link 3</li>
                    </ul>
                </aside>
                <main className="main-content">
                    <h2>Main Content Area</h2>
                    <p>This is the main area where content will be displayed.</p>
                </main>
            </div>
            <footer className="footer">
                <p>© 2024 Company Name</p>
            </footer>
        </div>
    );
}

export default MainView;
