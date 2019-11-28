import React, { useState, useEffect } from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "./graphql/queries";
import { createTodo } from "./graphql/mutations";

Amplify.configure(awsconfig);

const App = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const getTodos = async() => {
      const { data } = await API.graphql(graphqlOperation(listTodos))
      const { items } = data.listTodos
      setTodos(items)
    }
    getTodos();
  }, [])

  const handleCreateTodo = async() => {
    if(!name || !description) return
    setTodos([...todos, {name, description}])
    await API.graphql(graphqlOperation(createTodo, {input: {name, description}}))
    setName('');
    setDescription('');
  }
  const handleSetName = (e) => {
    setName(e.target.value);
  }

  const handleSetDescription = (e) => {
    setDescription(e.target.value);
  }

  return (
    <div>
      <p>amplify-app</p>
      <label>name: </label>
      <input type='text' value={name} name='name' onChange={(e) => handleSetName(e)} />
      <label>description: </label>
      <input type='text' value={description} name='description' onChange={(e) => handleSetDescription(e)} />
      <button onClick={() => handleCreateTodo()}>add</button>
        {todos.map((todo, i) => (
          <p key={i}>name: {todo.name} description: {todo.description}</p>
        ))}
    </div>
  );
}

export default withAuthenticator(App, true);
