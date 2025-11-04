#!/usr/bin/env node

import { select, input, confirm, search } from '@inquirer/prompts';
import chalk from 'chalk';
import clipboard from 'clipboardy';
import { execa } from 'execa';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import { projects, getProjectsByDifficulty, getProjectById, type Project } from './projects.js';
import { checkAllTools, printMissingTools, checkTool } from './utils/check-tools.js';
import { loadQuickPrompts, searchPrompts, type QuickPrompt } from './quick-prompts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log(chalk.bold.cyan('\n╔═══════════════════════════════════════════════════════╗'));
  console.log(chalk.bold.cyan('║                                                       ║'));
  console.log(chalk.bold.cyan('║          Claude Builder Club - Oxford                ║'));
  console.log(chalk.bold.cyan('║                                                       ║'));
  console.log(chalk.bold.cyan('╚═══════════════════════════════════════════════════════╝\n'));

  console.log(chalk.gray('Welcome to the Claude Builder Club project scaffolder!\n'));
  console.log(chalk.gray('This tool will help you pick a project and get started.\n'));

  // Ask what they want to do
  const action = await select({
    message: 'What would you like to do?',
    choices: [
      { name: 'Full Project (with setup guide)', value: 'full', description: 'Complete project with mission brief and step-by-step instructions' },
      { name: 'Quick Prompt (100+ ideas)', value: 'quick', description: 'Browse and search quick prompts to start building immediately' },
    ],
  });

  if (action === 'quick') {
    await handleQuickPrompt();
    return;
  }

  // Check for tools
  const toolStatuses = await checkAllTools();
  printMissingTools(toolStatuses);

  const hasBun = toolStatuses.find(t => t.name === 'Bun')?.installed ?? false;
  const hasGit = toolStatuses.find(t => t.name === 'Git')?.installed ?? false;
  const hasGH = toolStatuses.find(t => t.name === 'GitHub CLI')?.installed ?? false;
  const hasVercel = toolStatuses.find(t => t.name === 'Vercel CLI')?.installed ?? false;
  const hasUV = toolStatuses.find(t => t.name === 'uv (Python)')?.installed ?? false;

  // Step 1: Choose difficulty
  const difficultyMap = {
    easy: { name: 'Easy', description: 'Perfect for learning the stack' },
    medium: { name: 'Medium', description: 'Multiple features with database' },
    hard: { name: 'Hard', description: 'Complex, portfolio-worthy projects' },
  };

  const difficulty = await select({
    message: 'Choose your difficulty level:',
    choices: [
      { name: difficultyMap.easy.name, value: 'easy', description: difficultyMap.easy.description },
      { name: difficultyMap.medium.name, value: 'medium', description: difficultyMap.medium.description },
      { name: difficultyMap.hard.name, value: 'hard', description: difficultyMap.hard.description },
    ],
  }) as 'easy' | 'medium' | 'hard';

  // Step 2: Choose specific project (all projects for this difficulty)
  const difficultyProjects = getProjectsByDifficulty(difficulty);

  if (difficultyProjects.length === 0) {
    console.log(chalk.red('\n❌ No projects available at this difficulty yet. Check back soon!'));
    process.exit(0);
  }

  const projectId = await select({
    message: 'Select your project:',
    choices: difficultyProjects.map(p => ({
      name: `${p.name} - ${p.description}`,
      value: p.id,
      description: `Category: ${p.category}`,
    })),
  });

  const project = getProjectById(projectId)!;

  // Step 3: Project name
  const projectName = await input({
    message: 'What would you like to name your project?',
    default: project.id,
    validate: (value) => {
      if (!value) return 'Project name is required';
      if (!/^[a-z0-9-_]+$/.test(value)) {
        return 'Project name can only contain lowercase letters, numbers, hyphens, and underscores';
      }
      return true;
    },
  });

  // Step 4: Show summary
  console.log(chalk.cyan('\nProject Summary:'));
  console.log(chalk.gray('─'.repeat(50)));
  console.log(chalk.white('  Project:'), chalk.bold(project.name));
  console.log(chalk.white('  Category:'), project.category);
  console.log(chalk.white('  Difficulty:'), project.difficulty.toUpperCase());
  console.log(chalk.white('  Folder:'), `./${projectName}`);
  console.log(chalk.white('  Database:'), project.hasDatabase ? chalk.green('Yes (Neon + Drizzle)') : chalk.gray('No'));
  console.log(chalk.white('  Python:'), project.hasPython ? chalk.green('Yes (uv)') : chalk.gray('No'));
  console.log(chalk.gray('─'.repeat(50) + '\n'));

  const confirmed = await confirm({
    message: 'Ready to get your instructions?',
    default: true,
  });

  if (!confirmed) {
    console.log(chalk.yellow('\n👋 No problem! Run this command again when you\'re ready.\n'));
    process.exit(0);
  }

  // Show instructions
  await showInstructions(project, projectName, {
    hasBun,
    hasGit,
    hasGH,
    hasVercel,
    hasUV,
  });
}

async function showInstructions(
  project: Project,
  projectName: string,
  tools: { hasBun: boolean; hasGit: boolean; hasGH: boolean; hasVercel: boolean; hasUV: boolean }
) {
  // Read the mission brief and extract initial prompt
  // __dirname is dist/, so go up one level to package root
  const briefPath = path.resolve(__dirname, '..', project.briefPath);
  const brief = await fs.readFile(briefPath, 'utf-8');

  // Save the brief to current directory
  const localBriefPath = path.join(process.cwd(), `${projectName}-MISSION.md`);
  await fs.writeFile(localBriefPath, brief);

  const promptMatch = brief.match(/## Initial Prompt for Claude Code\s+```\s+([\s\S]*?)\s+```/);
  let initialPrompt = '';

  if (promptMatch) {
    initialPrompt = promptMatch[1].trim();
    try {
      await clipboard.write(initialPrompt);
    } catch {
      // Clipboard failed, no big deal
    }
  }

  const packageManager = tools.hasBun ? 'bun' : 'npm';
  const createCommand = tools.hasBun ? 'bunx' : 'npx';
  const installCommand = tools.hasBun ? 'bun install' : 'npm install';
  const addCommand = tools.hasBun ? 'bun add' : 'npm install';
  const devCommand = tools.hasBun ? 'bun dev' : 'npm run dev';

  console.log(chalk.green.bold('\nPerfect! Here are your instructions:\n'));
  console.log(chalk.green(`Saved mission brief to: ${localBriefPath}\n`));

  console.log(chalk.cyan('Step 1: Read your mission brief\n'));
  console.log(chalk.white(`Open the file: ${chalk.bold(path.basename(localBriefPath))}`));
  console.log(chalk.gray('This contains full requirements, database schema, and detailed instructions.\n'));

  console.log(chalk.cyan('Step 2: Create your Next.js 15 project\n'));
  console.log(chalk.white('Copy and run this command:\n'));

  const createNextCommand = `${createCommand} create-next-app@latest ${projectName} --typescript --tailwind --app --src-dir${tools.hasBun ? ' --use-bun' : ''}`;
  console.log(chalk.bgBlack.white(` ${createNextCommand} `));
  console.log();

  console.log(chalk.cyan('Step 3: Navigate to your project\n'));
  console.log(chalk.bgBlack.white(` cd ${projectName} `));
  console.log();

  console.log(chalk.cyan('Step 4: Install AI SDK and dependencies\n'));
  const deps = ['ai', '@ai-sdk/openai', '@ai-sdk/anthropic'];
  if (project.hasDatabase) {
    deps.push('drizzle-orm', 'postgres', '@vercel/blob');
  }
  console.log(chalk.bgBlack.white(` ${addCommand} ${deps.join(' ')} `));

  if (project.hasDatabase) {
    console.log(chalk.bgBlack.white(` ${addCommand} -D drizzle-kit `));
  }
  console.log();

  console.log(chalk.cyan('Step 5: Set up environment variables\n'));
  console.log(chalk.white('Create a .env.local file with:\n'));

  let envContent = '# LLM API Keys (choose one)\nOPENAI_API_KEY=sk-...\n# ANTHROPIC_API_KEY=sk-ant-...';

  if (project.hasDatabase) {
    envContent += '\n\n# Neon Database\nDATABASE_URL=postgresql://user:pass@host/db';
    envContent += '\n\n# Vercel Blob Storage\nBLOB_READ_WRITE_TOKEN=...';
  }

  console.log(chalk.gray(envContent));
  console.log();

  if (initialPrompt) {
    console.log(chalk.cyan('Step 6: Start building with Claude Code\n'));
    console.log(chalk.white('The initial prompt has been copied to your clipboard!'));
    console.log(chalk.white('Paste it into Claude Code to get started.\n'));
    console.log(chalk.gray('Preview of the prompt:'));
    console.log(chalk.gray('─'.repeat(60)));
    const preview = initialPrompt.slice(0, 200) + (initialPrompt.length > 200 ? '...' : '');
    console.log(chalk.gray(preview));
    console.log(chalk.gray('─'.repeat(60)));
    console.log();
  }

  console.log(chalk.cyan('Step 7: Run your dev server\n'));
  console.log(chalk.bgBlack.white(` ${devCommand} `));
  console.log();

  console.log(chalk.green('─'.repeat(60)));
  console.log(chalk.green.bold('\nYou\'re all set! Follow these steps and start building.\n'));

  // Quick reference commands
  console.log(chalk.cyan('Quick Reference - Copy these commands:\n'));
  console.log(chalk.gray(`# Create project`));
  console.log(chalk.white(`${createNextCommand}\n`));
  console.log(chalk.gray(`# Navigate and install`));
  console.log(chalk.white(`cd ${projectName}`));
  console.log(chalk.white(`${addCommand} ${deps.join(' ')}`));
  if (project.hasDatabase) {
    console.log(chalk.white(`${addCommand} -D drizzle-kit`));
  }
  console.log();
  console.log(chalk.gray(`# Run dev server`));
  console.log(chalk.white(`${devCommand}\n`));

  // Additional recommendations
  if (!tools.hasGit) {
    console.log(chalk.yellow('Tip: Install Git to track your changes'));
    console.log(chalk.gray('   https://git-scm.com/downloads\n'));
  }

  if (!tools.hasGH) {
    console.log(chalk.yellow('Tip: Install GitHub CLI for easy repo management'));
    console.log(chalk.gray('   https://cli.github.com\n'));
  }

  if (!tools.hasVercel) {
    console.log(chalk.yellow('Tip: Install Vercel CLI to deploy when done'));
    console.log(chalk.gray('   npm install -g vercel\n'));
  }

  if (project.hasDatabase && !hasDbSetup()) {
    console.log(chalk.yellow('Remember: Sign up for a free Neon database'));
    console.log(chalk.gray('   https://neon.tech\n'));
  }

  console.log(chalk.green.bold('Happy building!\n'));
}

function hasDbSetup(): boolean {
  // Could check for DATABASE_URL in env, but for now just return false
  return false;
}

async function handleQuickPrompt() {
  console.log(chalk.cyan('\nLoading 100+ quick prompts...\n'));

  const prompts = await loadQuickPrompts();

  // Use search with dynamic filtering
  const selectedPromptId = await search({
    message: 'Search for a prompt (type to filter):',
    source: async (input) => {
      const filtered = input ? searchPrompts(prompts, input) : prompts;

      return filtered.map(p => ({
        name: `${p.title}${p.accountsNeeded ? ' [Requires Account]' : ''}`,
        value: p.id,
        description: `${p.category} - ${p.prompt.slice(0, 80)}...`,
      }));
    },
  });

  const selectedPrompt = prompts.find(p => p.id === selectedPromptId);

  if (!selectedPrompt) {
    console.log(chalk.red('\nPrompt not found.'));
    return;
  }

  console.log(chalk.cyan('\n╔════════════════════════════════════════════════════════╗'));
  console.log(chalk.cyan(`║ ${chalk.bold(selectedPrompt.title)}${' '.repeat(Math.max(0, 54 - selectedPrompt.title.length))}║`));
  console.log(chalk.cyan('╚════════════════════════════════════════════════════════╝\n'));

  console.log(chalk.white(selectedPrompt.prompt));
  console.log();

  // Copy to clipboard
  try {
    await clipboard.write(selectedPrompt.prompt);
    console.log(chalk.green('Copied to clipboard!\n'));
  } catch {
    console.log(chalk.yellow('Could not copy to clipboard.\n'));
  }

  // Check if claude CLI is available
  const claudeStatus = await checkTool('claude', 'Claude CLI', false);

  if (claudeStatus.installed) {
    const runClaude = await confirm({
      message: 'Run this prompt with Claude Code CLI?',
      default: true,
    });

    if (runClaude) {
      console.log(chalk.cyan('\nStarting Claude Code...\n'));

      try {
        await execa('claude', [selectedPrompt.prompt], {
          stdio: 'inherit',
        });
      } catch (error) {
        console.log(chalk.red('\nFailed to run Claude CLI.'));
        console.log(chalk.gray('You can paste the prompt manually into Claude Code.\n'));
      }
    } else {
      console.log(chalk.gray('\nPrompt copied to clipboard - paste it into Claude Code!\n'));
    }
  } else {
    console.log(chalk.gray('Prompt copied to clipboard - paste it into Claude Code!\n'));
    console.log(chalk.yellow('Tip: Install Claude CLI for one-click execution'));
    console.log(chalk.gray('     npm install -g @anthropic-ai/claude-code\n'));
  }
}

main().catch(console.error);
