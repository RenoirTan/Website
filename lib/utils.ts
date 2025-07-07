import fs from "fs";
import path from "path";

export const PAGE_FILENAMES: string[] = [
  "page.js", "page.jsx", "page.ts", "page.tsx", "page.md", "page.mdx"
];

export function* recursiveReaddirSync(
  pathlike: fs.PathLike,
  options: fs.ObjectEncodingOptions & {
    withFileTypes: true;
    recursive?: boolean | undefined;
    filter?: (entry: fs.Dirent) => boolean;
  },
): Generator<fs.Dirent> {
  const entries = fs.readdirSync(pathlike, options);
  const filter = options.filter;
  for (const entry of entries) {
    if (!filter || filter(entry)) {
      yield entry;
      if (entry.isDirectory()) {
        yield* recursiveReaddirSync(path.join(pathlike.toString(), entry.name), options);
      }
    }
  }
}

export function isDirWithPage(pathlike: fs.PathLike): boolean {
  for (const pageFilename of PAGE_FILENAMES) {
    if (fs.existsSync(path.join(pathlike.toString(), pageFilename))) {
      return true;
    }
  }
  return false;
}

export function direntPath(entry: any): string {
  return path.join(entry.parentPath, entry.name);
}