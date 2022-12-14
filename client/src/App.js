import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useState, useEffect, createContext } from "react";
import NavBar from "./NavBar";
import Home from "./Home";
import FindStudents from "./FindStudents";
import Students from "./Students";
import AssignWork from "./AssignWork";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Profile from "./Profile";

export const UserContext = createContext();

function App() {
  const [errors, setErrors] = useState([]);
  const [students, setStudents] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          setCurrentUser(user);
          let studentsList = [
            ...new Map(
              user.students.map((student) => [student["id"], student])
            ).values(),
          ];
          setStudents(studentsList);
        });
      } else {
        resp.json().then((error) => setErrors(error));
      }
    });
  }, []);

  function handleLogOut() {
    fetch("/logout", {
      method: "DELETE",
    });
    setCurrentUser({});
    setStudents([]);
    navigate("/");
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser }}>
        <NavBar handleLogOut={handleLogOut} />
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            {/* student is logged in */}
            {/* <Route path="/tutors">
          <TutorList />
        </Route>
        <Route path="/assignments">
          <AssignmentsList />
        </Route> */}
            {/* tutor is logged in */}
            <Route
              path="/students"
              element={
                <Students students={students} setStudents={setStudents} />
              }
            />
            <Route
              path="/assignwork"
              element={
                <AssignWork students={students} setStudents={setStudents} />
              }
            />
            <Route
              path="/findstudents"
              element={
                <FindStudents students={students} setStudents={setStudents} />
              }
            />
            {/* <Route
          path="/assignments"
          element={
            <AssignmentsList students={students} setStudents={setStudents} />
          }
        /> */}
            <Route
              path="/profile"
              element={
                <Profile
                  setCurrentUser={setCurrentUser}
                  setStudents={setStudents}
                />
              }
            />
            <Route
              path="/signup"
              element={<SignUp setCurrentUser={setCurrentUser} />}
            />
            <Route
              path="/login"
              element={
                <LogIn
                  setCurrentUser={setCurrentUser}
                  setStudents={setStudents}
                />
              }
            />
            <Route
              path="*"
              element={
                <>
                  <h1>404 path not found</h1>
                </>
              }
            />
          </Routes>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
