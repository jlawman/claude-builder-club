import { execa } from 'execa';
import chalk from 'chalk';

export interface ToolStatus {
  name: string;
  installed: boolean;
  version?: string;
  required: boolean;
}

export async function checkTool(command: string, name: string, required: boolean = false): Promise<ToolStatus> {
  try {
    const { stdout } = await execa(command, ['--version'], { reject: false });
    const version = stdout.split('\n')[0].trim();
    return {
      name,
      installed: true,
      version,
      required,
    };
  } catch {
    return {
      name,
      installed: false,
      required,
    };
  }
}

export async function checkAllTools(): Promise<ToolStatus[]> {
  console.log(chalk.cyan('\n🔍 Checking for required tools...\n'));

  const tools = [
    { command: 'node', name: 'Node.js', required: true },
    { command: 'bun', name: 'Bun', required: false },
    { command: 'gh', name: 'GitHub CLI', required: false },
    { command: 'vercel', name: 'Vercel CLI', required: false },
    { command: 'git', name: 'Git', required: false },
    { command: 'uv', name: 'uv (Python)', required: false },
  ];

  const results: ToolStatus[] = [];

  for (const tool of tools) {
    const status = await checkTool(tool.command, tool.name, tool.required);
    results.push(status);

    if (status.installed) {
      console.log(chalk.green(`✓ ${status.name}`), chalk.gray(`(${status.version})`));
    } else {
      if (status.required) {
        console.log(chalk.red(`✗ ${status.name}`), chalk.red('(REQUIRED)'));
      } else {
        console.log(chalk.yellow(`⚠ ${status.name}`), chalk.gray('(optional)'));
      }
    }
  }

  return results;
}

export function getInstallInstructions(tool: ToolStatus): string {
  const instructions: Record<string, string> = {
    'Node.js': 'Visit https://nodejs.org to download',
    'Bun': 'curl -fsSL https://bun.sh/install | bash',
    'GitHub CLI': 'Visit https://cli.github.com',
    'Vercel CLI': 'npm install -g vercel',
    'Git': 'Visit https://git-scm.com/downloads',
    'uv (Python)': 'curl -LsSf https://astral.sh/uv/install.sh | sh',
  };

  return instructions[tool.name] || 'Check the tool\'s website for installation instructions';
}

export function printMissingTools(tools: ToolStatus[]): void {
  const missing = tools.filter(t => !t.installed && !t.required);
  const required = tools.filter(t => !t.installed && t.required);

  if (required.length > 0) {
    console.log(chalk.red('\n❌ Missing required tools:'));
    required.forEach(tool => {
      console.log(chalk.red(`  • ${tool.name}: ${getInstallInstructions(tool)}`));
    });
    process.exit(1);
  }

  if (missing.length > 0) {
    console.log(chalk.yellow('\n⚠️  Optional tools not found:'));
    missing.forEach(tool => {
      console.log(chalk.yellow(`  • ${tool.name}: ${getInstallInstructions(tool)}`));
    });
    console.log(chalk.gray('\nThese are optional but recommended for deploying and managing your project.\n'));
  }
}
