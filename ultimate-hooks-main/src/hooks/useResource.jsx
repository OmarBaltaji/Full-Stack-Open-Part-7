import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react'

const useResource = (resource) => {
  const baseUrl = `http://localhost:3005/${resource}`
  const [resources, setResources] = useState([]);

  useEffect(() => {
    getAll();
  }, []);
  
  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data);
  }
  
  const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    setResources(resources.concat(response.data));
  }

  const service = {
    getAll,
    create,
  };

  return [ resources, service ];
}

export default useResource;