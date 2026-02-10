import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../api/studentApi";
import StudentList from "../components/StudentList";
import StudentModal from "../components/StudentModal";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  function load() {
    setStudents(getStudents());
  }

  useEffect(load, []);

  const filtered = students.filter(
    s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.grade.toLowerCase().includes(search.toLowerCase())
  );

  // Topper
  const topper =
    students.length > 0
      ? students.reduce((a, b) =>
          b.subject.reduce((t, s) => t + s.mark, 0) >
          a.subject.reduce((t, s) => t + s.mark, 0)
            ? b
            : a
        )
      : null;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              🎓 Student Manager
            </h1>
            <p className="text-sm text-gray-500">
              Manage, search and track student performance
            </p>
          </div>

          <button
            onClick={() => {
              setEditData(null);
              setOpen(true);
            }}
            className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:opacity-90"
          >
            + Add Student
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-100 text-blue-800 p-4 rounded-xl">
            <p className="text-sm">Total Students</p>
            <p className="text-2xl font-bold">{students.length}</p>
          </div>

          <div className="bg-green-100 text-green-800 p-4 rounded-xl">
            <p className="text-sm">Top Performer</p>
            <p className="text-lg font-semibold">
              {topper ? topper.name : "—"}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="🔍 Search by name or grade..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <StudentList
          students={filtered}
          onEdit={s => {
            setEditData(s);
            setOpen(true);
          }}
          onDelete={id => {
            deleteStudent(id);
            load();
          }}
        />
      </div>

      {/* Modal */}
      {open && (
        <StudentModal
          close={() => setOpen(false)}
          refresh={load}
          data={editData}
        />
      )}
    </div>
  );
}
