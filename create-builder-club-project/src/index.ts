#!/usr/bin/env node

import { select, input, confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import ora from 'ora';
import clipboard from 'clipboardy';
import { execa } from 'execa';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import { projects, categories, getProjectsByCategory, getProjectById, type Project } from './projects.js';
import { checkAllTools, printMissingTools } from './utils/check-tools.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log(chalk.bold.cyan('\n╔═══════════════════════════════════════════════════════╗'));
  console.log(chalk.bold.cyan('║                                                       ║'));
  console.log(chalk.bold.cyan('║         🎓 Claude Builder Club - Oxford 🎓           ║'));
  console.log(chalk.bold.cyan('║                                                       ║'));
  console.log(chalk.bold.cyan('╚═══════════════════════════════════════════════════════╝\n'));

  console.log(chalk.gray('Welcome to the Claude Builder Club project scaffolder!\n'));
  console.log(chalk.gray('This tool will help you create awesome AI-powered projects.\n'));

  // Check for tools
  const toolStatuses = await checkAllTools();
  printMissingTools(toolStatuses);

  const hasBun = toolStatuses.find(t => t.name === 'Bun')?.installed;
  const hasGit = toolStatuses.find(t => t.name === 'Git')?.installed;
  const hasGH = toolStatuses.find(t => t.name === 'GitHub CLI')?.installed;
  const hasVercel = toolStatuses.find(t => t.name === 'Vercel CLI')?.installed;
  const hasUV = toolStatuses.find(t => t.name === 'uv (Python)')?.installed;

  // Step 1: Choose category
  const category = await select({
    message: 'What type of project would you like to build?',
    choices: categories.map(cat => ({
      name: cat.name,
      value: cat.value,
      description: `Projects related to ${cat.name.replace(/^[^\s]+\s/, '')}`,
    })),
  });

  const categoryProjects = getProjectsByCategory(category);

  if (categoryProjects.length === 0) {
    console.log(chalk.red('\n❌ No projects available in this category yet. Check back soon!'));
    process.exit(0);
  }

  // Step 2: Choose difficulty
  const availableDifficulties = [...new Set(categoryProjects.map(p => p.difficulty))];

  const difficultyMap = {
    easy: { name: '🟢 Easy (1-2 hours)', emoji: '🟢' },
    medium: { name: '🟡 Medium (2-4 hours)', emoji: '🟡' },
    hard: { name: '🔴 Hard (4+ hours)', emoji: '🔴' },
  };

  const difficulty = await select({
    message: 'Choose your difficulty level:',
    choices: availableDifficulties.map(d => ({
      name: difficultyMap[d].name,
      value: d,
    })),
  });

  // Step 3: Choose specific project
  const filteredProjects = categoryProjects.filter(p => p.difficulty === difficulty);

  const projectId = await select({
    message: 'Select your project:',
    choices: filteredProjects.map(p => ({
      name: p.name,
      value: p.id,
      description: p.description,
    })),
  });

  const project = getProjectById(projectId)!;

  // Step 4: Project name
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

  // Step 5: Confirm
  console.log(chalk.cyan('\n📋 Project Summary:'));
  console.log(chalk.gray('─'.repeat(50)));
  console.log(chalk.white('  Project:'), chalk.bold(project.name));
  console.log(chalk.white('  Difficulty:'), difficultyMap[project.difficulty].emoji, project.difficulty.toUpperCase());
  console.log(chalk.white('  Time:'), project.timeEstimate);
  console.log(chalk.white('  Folder:'), `./${projectName}`);
  console.log(chalk.white('  Database:'), project.hasDatabase ? chalk.green('Yes (Neon + Drizzle)') : chalk.gray('No'));
  console.log(chalk.white('  Python:'), project.hasPython ? chalk.green('Yes (uv)') : chalk.gray('No'));
  console.log(chalk.gray('─'.repeat(50) + '\n'));

  const confirmed = await confirm({
    message: 'Ready to create your project?',
    default: true,
  });

  if (!confirmed) {
    console.log(chalk.yellow('\n👋 No problem! Run this command again when you\'re ready.\n'));
    process.exit(0);
  }

  // Create the project
  await createProject(project, projectName, {
    hasBun,
    hasGit,
    hasGH,
    hasVercel,
    hasUV,
  });
}

async function createProject(
  project: Project,
  projectName: string,
  tools: { hasBun: boolean; hasGit: boolean; hasGH: boolean; hasVercel: boolean; hasUV: boolean }
) {
  const spinner = ora('Creating your project...').start();

  try {
    // Step 1: Create Next.js app
    spinner.text = 'Creating Next.js 15 app...';

    const packageManager = tools.hasBun ? 'bun' : 'npm';
    const createCommand = tools.hasBun ? 'bunx' : 'npx';

    await execa(createCommand, [
      'create-next-app@latest',
      projectName,
      '--typescript',
      '--tailwind',
      '--app',
      '--src-dir',
      ...(tools.hasBun ? ['--use-bun'] : []),
      '--no-git', // We'll init git ourselves
    ], {
      stdio: 'pipe',
    });

    spinner.succeed('Created Next.js 15 app');

    // Step 2: Check Next.js version and downgrade if needed
    spinner.start('Checking Next.js version...');
    const packageJsonPath = path.join(process.cwd(), projectName, 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));

    if (packageJson.dependencies.next.startsWith('^16') || packageJson.dependencies.next.startsWith('16')) {
      spinner.text = 'Downgrading to Next.js 15...';
      packageJson.dependencies.next = '^15.0.0';
      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

      await execa(packageManager, ['install'], {
        cwd: path.join(process.cwd(), projectName),
        stdio: 'pipe',
      });

      spinner.succeed('Using Next.js 15');
    } else {
      spinner.succeed('Next.js 15 confirmed');
    }

    // Step 3: Install additional dependencies
    spinner.start('Installing AI SDK and dependencies...');

    const deps = ['ai', '@ai-sdk/openai', '@ai-sdk/anthropic'];
    if (project.hasDatabase) {
      deps.push('drizzle-orm', 'postgres', '@vercel/blob');
    }

    await execa(packageManager, ['add', ...deps], {
      cwd: path.join(process.cwd(), projectName),
      stdio: 'pipe',
    });

    if (project.hasDatabase) {
      await execa(packageManager, ['add', '-D', 'drizzle-kit'], {
        cwd: path.join(process.cwd(), projectName),
        stdio: 'pipe',
      });
    }

    spinner.succeed('Installed dependencies');

    // Step 4: Copy the mission brief
    spinner.start('Adding mission brief...');

    const briefPath = path.resolve(__dirname, project.briefPath);
    const brief = await fs.readFile(briefPath, 'utf-8');

    await fs.writeFile(
      path.join(process.cwd(), projectName, 'MISSION.md'),
      brief
    );

    spinner.succeed('Added MISSION.md with project brief');

    // Step 5: Create .env.example
    spinner.start('Creating environment template...');

    let envContent = '# LLM API Keys (choose one)\nOPENAI_API_KEY=sk-...\n# ANTHROPIC_API_KEY=sk-ant-...\n';

    if (project.hasDatabase) {
      envContent += '\n# Neon Database\nDATABASE_URL=postgresql://user:pass@host/db\n';
      envContent += '\n# Vercel Blob Storage\nBLOB_READ_WRITE_TOKEN=...\n';
    }

    await fs.writeFile(
      path.join(process.cwd(), projectName, '.env.example'),
      envContent
    );

    await fs.writeFile(
      path.join(process.cwd(), projectName, '.env.local'),
      envContent
    );

    spinner.succeed('Created .env files');

    // Step 6: Extract initial prompt and copy to clipboard
    spinner.start('Preparing Claude Code prompt...');

    const promptMatch = brief.match(/## Initial Prompt for Claude Code\s+```\s+([\s\S]*?)\s+```/);
    let initialPrompt = '';

    if (promptMatch) {
      initialPrompt = promptMatch[1].trim();
      try {
        await clipboard.write(initialPrompt);
        spinner.succeed('Copied initial prompt to clipboard! ');
      } catch {
        spinner.warn('Could not copy to clipboard, but prompt is in MISSION.md');
      }
    } else {
      spinner.warn('No initial prompt found in brief');
    }

    // Step 7: Initialize git
    if (tools.hasGit) {
      spinner.start('Initializing git repository...');
      await execa('git', ['init'], {
        cwd: path.join(process.cwd(), projectName),
        stdio: 'pipe',
      });
      await execa('git', ['add', '.'], {
        cwd: path.join(process.cwd(), projectName),
        stdio: 'pipe',
      });
      await execa('git', ['commit', '-m', 'Initial commit from Builder Club'], {
        cwd: path.join(process.cwd(), projectName),
        stdio: 'pipe',
      });
      spinner.succeed('Initialized git repository');
    }

    // Success!
    console.log(chalk.green.bold('\n✨ Project created successfully!\n'));

    // Show next steps
    console.log(chalk.cyan('📝 Next steps:\n'));
    console.log(chalk.white(`  1. cd ${projectName}`));
    console.log(chalk.white(`  2. Read the MISSION.md file for full project details`));
    console.log(chalk.white(`  3. Add your API keys to .env.local`));

    if (project.hasDatabase) {
      console.log(chalk.white(`  4. Set up your Neon database:`));
      console.log(chalk.gray(`     - Visit https://neon.tech and create a database`));
      console.log(chalk.gray(`     - Add DATABASE_URL to .env.local`));
      console.log(chalk.white(`  5. Run database migrations: ${packageManager} run db:push`));
      console.log(chalk.white(`  6. Start building with Claude Code!`));
    } else {
      console.log(chalk.white(`  4. Start building with Claude Code!`));
    }

    if (initialPrompt) {
      console.log(chalk.cyan('\n💡 Initial Prompt (copied to clipboard):'));
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.white(initialPrompt.slice(0, 200) + '...'));
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.gray('\nPaste this into Claude Code to get started!\n'));
    }

    // Tool recommendations
    const missingTools = [];
    if (!tools.hasGH) missingTools.push('GitHub CLI (gh)');
    if (!tools.hasVercel) missingTools.push('Vercel CLI');
    if (project.hasPython && !tools.hasUV) missingTools.push('uv (Python package manager)');

    if (missingTools.length > 0) {
      console.log(chalk.yellow('💡 Recommended tools to install:'));
      missingTools.forEach(tool => {
        console.log(chalk.gray(`  • ${tool}`));
      });
      console.log();
    }

    console.log(chalk.green.bold('Happy building! 🚀\n'));

  } catch (error) {
    spinner.fail('Failed to create project');
    console.error(chalk.red('\n❌ Error:'), error);
    process.exit(1);
  }
}

main().catch(console.error);
