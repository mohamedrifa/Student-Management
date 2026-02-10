export default function StudentList({ students, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow border bg-white">
      <table className="w-full text-sm">
        <thead className="bg-linear-to-r from-blue-600 to-indigo-600 text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-center">Grade</th>
            <th className="p-3 text-left">Subjects</th>
            <th className="p-3 text-center">Total</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {students.map((s, index) => {
            const total = s.subject.reduce((sum, sub) => sum + sub.mark, 0);

            return (
              <tr
                key={s.id}
                className={`hover:bg-blue-50 transition ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3 font-medium text-gray-800">
                  {s.name}
                </td>

                <td className="p-3 text-center">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                    Class {s.grade}
                  </span>
                </td>

                <td className="p-3 text-gray-600">
                  <div className="flex flex-wrap gap-2">
                    {s.subject.map(sub => (
                      <span
                        key={sub.name}
                        className="bg-gray-100 px-2 py-1 rounded text-xs"
                      >
                        {sub.name}: <b>{sub.mark}</b>
                      </span>
                    ))}
                  </div>
                </td>

                <td className="p-3 text-center">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold">
                    {total}
                  </span>
                </td>

                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => onEdit(s)}
                    className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(s.id)}
                    className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {students.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No students found
        </div>
      )}
    </div>
  );
}
