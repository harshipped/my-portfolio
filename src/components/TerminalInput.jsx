import { ChevronRight } from "lucide-react";

export default function TerminalInput({
  command,
  setCommand,
  onRun,
  suggestion,
}) {
  return (
    <div className="mt-6 flex items-center text-lg">
      <ChevronRight className="w-5 h-5 mr-2" />

      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onRun(command);
          if (e.key === "Tab") {
            e.preventDefault();
            if (suggestion) setCommand(suggestion);
          }
        }}
        className="bg-transparent outline-none text-green-400 flex-1"
        placeholder="enter command..."
        autoFocus
      />

      <span className="blink ml-2">█</span>

      <span className="ml-4 text-sm text-green-300">{suggestion}</span>
    </div>
  );
}
