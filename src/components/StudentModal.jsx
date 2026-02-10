import StudentForm from "./StudentForm";
import { addStudent, updateStudent } from "../api/studentApi";

export default function StudentModal({ close, refresh, data }) {
  function handleSave(values) {
    if (data) updateStudent(data.id, values);
    else addStudent(values);
    refresh();
    close();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 animate-fadeIn scale-95">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {data ? "Edit Student" : "Add Student"}
          </h2>
          <button
            onClick={close}
            className="text-gray-400 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <StudentForm onSubmit={handleSave} initial={data} />

        {/* Footer */}
        <div className="mt-4 text-center">
          <button
            onClick={close}
            className="text-sm text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
