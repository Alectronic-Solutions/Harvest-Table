const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(src: string): string {
  return `${BASE_PATH}${src}`;
}
