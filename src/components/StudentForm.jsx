import { useState } from "react";

export default function StudentForm({ onSubmit, initial }) {
  const [name, setName] = useState(initial?.name || "");
  const [grade, setGrade] = useState(initial?.grade || "");

  const [subjects, setSubjects] = useState(
    initial?.subject || [
      { name: "", mark: "" }
    ]
  );

  function addSubject() {
    if (subjects.length < 5) {
      setSubjects([...subjects, { name: "", mark: "" }]);
    }
  }

  function removeSubject(index) {
    setSubjects(subjects.filter((_, i) => i !== index));
  }

  function updateSubject(index, key, value) {
    const updated = [...subjects];
    updated[index][key] = value;
    setSubjects(updated);
  }

  function submit(e) {
    e.preventDefault();
    onSubmit({
      name,
      grade,
      subject: subjects.map(s => ({
        name: s.name,
        mark: Number(s.mark)
      }))
    });
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="text-sm font-medium text-gray-700">Student Name</label>
        <input
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter name"
        />
      </div>

      {/* Grade */}
      <div>
        <label className="text-sm font-medium text-gray-700">Class / Grade</label>
        <input
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
          value={grade}
          onChange={e => setGrade(e.target.value)}
          placeholder="Enter grade"
        />
      </div>

      {/* Subjects */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-gray-700">Subjects</p>
          <button
            type="button"
            onClick={addSubject}
            disabled={subjects.length >= 5}
            className="text-sm text-blue-600 hover:underline disabled:text-gray-400"
          >
            + Add Subject
          </button>
        </div>

        <div className="space-y-2">
          {subjects.map((sub, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 items-center">
              <input
                className="col-span-1 rounded border px-2 py-1"
                placeholder="Subject"
                value={sub.name}
                onChange={e => updateSubject(i, "name", e.target.value)}
              />

              <input
                type="number"
                className="col-span-1 rounded border px-2 py-1"
                placeholder="Mark"
                value={sub.mark}
                onChange={e => updateSubject(i, "mark", e.target.value)}
              />

              {subjects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSubject(i)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-1">
          Max 5 subjects allowed
        </p>
      </div>

      {/* Button */}
      <button className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-semibold">
        {initial ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}
