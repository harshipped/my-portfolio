import React, { useState } from "react";
import TerminalHeader from "./components/TerminalHeader";
import TerminalMenu from "./components/TerminalMenu";
import TerminalOutput from "./components/TerminalOutput";
import TerminalInput from "./components/TerminalInput";

import { commands as COMMANDS } from "./data/commands";
import { skills as SKILLS } from "./data/skills";
import { projects as PROJECTS } from "./data/projects";
import { experience as EXPERIENCE } from "./data/experience";

export default function App() {
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState("");

  const allCommands = ["help", "about", "skills", "projects", "experience", "contact", "clear"];

  const autocomplete = (input) => {
    if (!input) return "";
    const matches = allCommands.filter((cmd) => cmd.startsWith(input.toLowerCase()));
    return matches.length === 1 ? matches[0] : matches[0] || "";
  };

  function processCommand(cmd) {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((h) => [...h, `> ${cmd}`]);

    if (trimmed === "clear") {
      setHistory([]);
      setCommand("");
      return;
    }

    if (trimmed === "skills") {
      setHistory((h) => [...h, "", "📊 TECHNICAL SKILLS", "═".repeat(50), ...SKILLS, ""]);
      setCommand("");
      return;
    }

    if (trimmed === "projects") {
      const lines = ["", "🚀 FEATURED PROJECTS", "═".repeat(50)];
      PROJECTS.forEach((p, index) => {
        lines.push(`[${index + 1}] ${p.name}`);
        lines.push(`   ${p.desc}`);
        lines.push(`   ${p.tech} ${p.status}`);
        lines.push("");
      });
      setHistory((h) => [...h, ...lines]);
      setCommand("");
      return;
    }

    if (trimmed === "experience") {
      setHistory((h) => [...h, "", "💼 WORK EXPERIENCE", "═".repeat(50), ...EXPERIENCE, ""]);
      setCommand("");
      return;
    }

    if (trimmed === "contact") {
      setHistory((h) => [
        ...h,
        "",
        "📧 CONTACT",
        "═".repeat(50),
        "• Email: backend.engineer@email.com",
        "• GitHub: github.com/backend-engineer",
        "• LinkedIn: linkedin.com/in/backend-engineer",
        "",
      ]);
      setCommand("");
      return;
    }

    if (COMMANDS[trimmed]) {
      setHistory((h) => [...h, COMMANDS[trimmed]]);
      setCommand("");
      return;
    }

    setHistory((h) => [...h, `Command not found: ${cmd}. Type 'help'.`]);
    setCommand("");
  }

  const suggestion = autocomplete(command);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-6 relative">

      {/* FIXED CRT OVERLAY — now it won't block typing */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

        .crt {
          pointer-events: none;
        }

        .crt::before {
          content: " ";
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          background: linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.35) 50%),
                      linear-gradient(90deg, rgba(255,0,0,0.05),
                      rgba(0,255,0,0.05), rgba(0,0,255,0.05));
          background-size: 100% 2px, 3px 100%;
          z-index: 10;
        }

        .scanline {
          pointer-events: none;
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: linear-gradient(transparent, rgba(0,255,0,0.1), transparent);
          animation: scan 6s linear infinite;
          z-index: 9;
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        .blink { animation: blink 1s infinite; }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>

      <div className="crt"></div>
      <div className="scanline"></div>

      <div className="relative z-20 max-w-5xl mx-auto">
        <TerminalHeader />
        <TerminalMenu onRun={processCommand} />
        <TerminalOutput history={history} />

        <TerminalInput
          command={command}
          setCommand={setCommand}
          onRun={processCommand}
          suggestion={suggestion}
        />
      </div>
    </div>
  );
}
