import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface QuickPrompt {
  id: string;
  title: string;
  prompt: string;
  category: string;
  accountsNeeded: boolean;
}

export async function loadQuickPrompts(): Promise<QuickPrompt[]> {
  const promptsPath = path.resolve(__dirname, '..', 'workshop-projects/quick/QUICK-PROMPTS.md');
  const content = await fs.readFile(promptsPath, 'utf-8');

  const prompts: QuickPrompt[] = [];
  const lines = content.split('\n');

  let currentCategory = '';
  let accountsNeeded = false;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // Check for account requirement sections
    if (line.includes('ZERO ACCOUNTS NEEDED')) {
      accountsNeeded = false;
    } else if (line.includes('FREE ACCOUNTS NEEDED')) {
      accountsNeeded = true;
    }

    // Check for category headers (###)
    if (line.startsWith('###')) {
      currentCategory = line.replace(/^###\s*/, '').trim();
    }

    // Check for prompt titles (####)
    if (line.startsWith('####')) {
      const title = line.replace(/^####\s*\d+\.\s*/, '').trim();

      // Find the code block
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        i++;
      }

      if (i < lines.length) {
        i++; // Skip the opening ```
        const promptLines: string[] = [];

        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          promptLines.push(lines[i]);
          i++;
        }

        const prompt = promptLines.join('\n').trim();

        if (prompt) {
          prompts.push({
            id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            title,
            prompt,
            category: currentCategory,
            accountsNeeded,
          });
        }
      }
    }

    i++;
  }

  return prompts;
}

export function searchPrompts(prompts: QuickPrompt[], query: string): QuickPrompt[] {
  const lowerQuery = query.toLowerCase();

  return prompts.filter(p => {
    const titleMatch = p.title.toLowerCase().includes(lowerQuery);
    const promptMatch = p.prompt.toLowerCase().includes(lowerQuery);
    const categoryMatch = p.category.toLowerCase().includes(lowerQuery);

    return titleMatch || promptMatch || categoryMatch;
  });
}
