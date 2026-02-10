// api.js
import defaultStudents from "../utils/sample.json";
const STORAGE_KEY = "students_data";

// Initialize storage
function initStudents() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStudents));
  }
}

// Get all students
export function getStudents() {
  initStudents();
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

// Add student
export function addStudent(student) {
  const students = getStudents();
  student.id = students.length ? students[students.length - 1].id + 1 : 1;
  students.push(student);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  return student;
}

// Update student
export function updateStudent(id, updatedData) {
  const students = getStudents();
  const index = students.findIndex(s => s.id === id);

  if (index === -1) return null;

  students[index] = { ...students[index], ...updatedData };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  return students[index];
}

// Delete student
export function deleteStudent(id) {
  const students = getStudents();
  const newList = students.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
  return true;
}
