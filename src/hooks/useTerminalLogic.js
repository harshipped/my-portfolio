import { commands as baseCommands } from "../data/commands";
import { skills } from "../data/skills";
import { projects } from "../data/projects";
import { experience } from "../data/experience";

export const useTerminalLogic = () => {
  const allCommands = ["help", "about", "skills", "projects", "experience", "contact", "clear"];

  const processCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();

    if (trimmed === "clear") return { clear: true };

    if (trimmed === "skills") {
      return { output: ["📊 TECHNICAL SKILLS", "═".repeat(50), ...skills] };
    }

    if (trimmed === "projects") {
      const lines = ["🚀 FEATURED PROJECTS", "═".repeat(50)];
      projects.forEach((p, idx) => {
        lines.push(`[${idx + 1}] ${p.name}`);
        lines.push(`   ${p.desc}`);
        lines.push(`   ${p.tech} ${p.status}`);
        lines.push("");
      });
      return { output: lines };
    }

    if (trimmed === "experience") {
      return { output: ["💼 WORK EXPERIENCE", "═".repeat(50), ...experience] };
    }

    if (trimmed === "contact") {
      return {
        output: [
          "📧 CONTACT",
          "═".repeat(50),
          "• Email: backend.engineer@email.com",
          "• GitHub: github.com/backend-engineer",
          "• LinkedIn: linkedin.com/in/backend-engineer",
        ],
      };
    }

    if (baseCommands[trimmed]) {
      return { output: [baseCommands[trimmed]] };
    }

    return {
      output: [`Command not found: ${cmd}. Type 'help' for available commands.`],
    };
  };

  const autocomplete = (input) => {
    return allCommands.filter((cmd) => cmd.startsWith(input.toLowerCase()));
  };

  return { processCommand, autocomplete };
};
