import { createInterface } from 'readline';

export function handleError(error: unknown, json: boolean): never {
  if (json) {
    const err = error instanceof Error
      ? { error: error.name, message: error.message }
      : { error: 'UnknownError', message: String(error) };
    process.stderr.write(JSON.stringify(err) + '\n');
  } else {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`Error: ${message}\n`);
  }
  process.exit(1);
}

export function formatDate(isoString: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(isoString));
  } catch {
    return isoString;
  }
}

export async function confirm(message: string): Promise<boolean> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(`${message} [y/N] `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y');
    });
  });
}
