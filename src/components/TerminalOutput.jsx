import { useRef, useEffect } from "react";

export default function TerminalOutput({ history }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [history]);

  return (
    <div
      ref={ref}
      className="border-2 border-green-400 p-6 min-h-96 h-96 overflow-y-auto bg-black/50"
    >
      <div className="mb-4 text-lg">
        SYSTEM READY // TYPE 'HELP' FOR COMMANDS
        <div className="text-green-300">
          ═══════════════════════════════════════════════════
        </div>
      </div>

      {history.map((line, index) => (
        <div
          key={index}
          className={line.startsWith(">") ? "text-yellow-400" : "text-green-400"}
        >
          {line}
        </div>
      ))}
    </div>
  );
}
