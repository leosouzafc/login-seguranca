import React from "react";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Cyber Security Project</h1>
      <section className="author-info">
        <h2>Author</h2>
        <p>
          This project is developed by <strong>Leonardo Souza</strong>.
        </p>
        <p>
          Check my GitHub profile:{" "}
          <a
            href="https://github.com/leonardosf98"
            target="_blank"
            rel="noopener noreferrer"
          >
            github/leonardosf98
          </a>
        </p>
        <p>
          I am a developer at <strong>FCamara</strong>.
        </p>
      </section>
      <section className="project-info">
        <h2>Project Information</h2>
        <p>
          This project adheres to the OWASP standards and follows the
          recommendations from the TOP 10 threats.
        </p>
        <p>Key features include:</p>
        <ul>
          <li>Using ORM to sanitize inputs.</li>
          <li>Deny by default approach to security.</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
