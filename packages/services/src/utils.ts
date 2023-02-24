/**
 * @param name - Variable name.
 * @returns Env variable value.
 */
export const getEnvVariable = (name: string): string => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (process) {
    return process.env[name]!;
  } else {
    return (import.meta as unknown as { env: Record<string, string> }).env[
      name
    ];
  }
};
