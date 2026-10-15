import React, { useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [mark, setMark] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // Add or Update Student
  function handleSubmit(e) {
    e.preventDefault();

    if (name === "" || department === "" || mark === "") {
      alert("Please fill all fields");
      return;
    }

    if (editId === null) {
      const newStudent = {
        id: Date.now(),
        name: name,
        department: department,
        mark: mark
      };

      setStudents([...students, newStudent]);
      alert("Student added successfully");
    } else {
      const updatedStudents = students.map((student) =>
        student.id === editId
          ? {
              ...student,
              name: name,
              department: department,
              mark: mark
            }
          : student
      );

      setStudents(updatedStudents);
      setEditId(null);
      alert("Student updated successfully");
    }

    setName("");
    setDepartment("");
    setMark("");
  }

  // Edit Student
  function handleEdit(student) {
    setName(student.name);
    setDepartment(student.department);
    setMark(student.mark);
    setEditId(student.id);
  }

  // Delete Student
  function handleDelete(id) {
    setStudents(students.filter((student) => student.id !== id));
  }

  // Search Student
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Student Management System</h1>

      <h2>{editId === null ? "Add Student" : "Update Student"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Enter department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Enter mark"
          value={mark}
          min="0"
          max="100"
          onChange={(e) => setMark(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          {editId === null ? "Add Student" : "Update Student"}
        </button>
      </form>

      <hr />

      <h2>Student List</h2>

      <input
        type="text"
        placeholder="Search student by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Mark</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.department}</td>
              <td>{student.mark}</td>
              <td>
                <button onClick={() => handleEdit(student)}>
                  Edit
                </button>

                {" "}

                <button onClick={() => handleDelete(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredStudents.length === 0 && (
            <tr>
              <td colSpan="5">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

/*pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Node and npm') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                }
        }

        stage('Build React App') {
            steps {
                bat 'npm run build'
            }
        }
    }
}

Docker
# Stage 1: Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production serve stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]*/
