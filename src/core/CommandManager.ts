export type CommandContext = {
  prompt: (message: string) => string | null;
  notify: (message: string) => void;
};

export type CadCommand = {
  name: string;
  aliases: string[];
  description: string;
  execute: (context: CommandContext) => void | Promise<void>;
};

export class CommandManager {
  private commands = new Map<string, CadCommand>();
  register(command: CadCommand): void {
    for (const key of [command.name, ...command.aliases]) {
      const normalized = key.trim().toUpperCase();
      if (this.commands.has(normalized)) throw new Error(`Command alias already registered: ${normalized}`);
      this.commands.set(normalized, command);
    }
  }
  get(name: string): CadCommand | undefined { return this.commands.get(name.trim().toUpperCase()); }
  list(): CadCommand[] { return [...new Set(this.commands.values())].sort((a, b) => a.name.localeCompare(b.name)); }
  async run(name: string, context: CommandContext): Promise<boolean> {
    const command = this.get(name);
    if (!command) { context.notify(`Unknown command: ${name}`); return false; }
    await command.execute(context); return true;
  }
}