export default function TerminalMenu({ onRun }) {
  const items = ["about", "skills", "projects", "experience", "contact", "help"];

  return (
    <div className="border-2 border-green-400 p-4 mb-6">
      <div className="flex flex-wrap gap-4 text-lg">
        {items.map((cmd) => (
          <button
            key={cmd}
            onClick={() => onRun(cmd)}
            className="hover:bg-green-400 hover:text-black px-3 py-1 border border-green-400"
          >
            [{cmd.toUpperCase()}]
          </button>
        ))}
      </div>
    </div>
  );
}
