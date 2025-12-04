export async function fetchCategories() {
    return fetch("http://localhost:3001/categories").then(r => r.json());
  }
  
  export async function fetchFiles() {
    return fetch("http://localhost:3001/files").then(r => r.json());
  }