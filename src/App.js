import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRespositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `${Date.now()}`,
      url: "https://github.com/chipytux/go-stack-desafio-2",
      techs: ["NODEJS"],
    });

    setRespositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      setRespositories(repositories.filter((rep) => rep.id !== id));
    });
  }

  useEffect(() => {
    api.get("repositories").then((res) => {
      setRespositories(res.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
