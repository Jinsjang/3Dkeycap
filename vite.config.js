import { defineConfig } from "vite";

function resolveBase() {
  const repository = process.env.GITHUB_REPOSITORY;
  const isGithubActions = process.env.GITHUB_ACTIONS === "true";

  if (!isGithubActions || !repository) {
    return process.env.VITE_BASE || "/3Dkeycap/";
  }

  const [, repoName] = repository.split("/");
  if (!repoName || repoName.endsWith(".github.io")) {
    return "/";
  }

  return `/${repoName}/`;
}

export default defineConfig({
  base: resolveBase(),
  build: {
    chunkSizeWarningLimit: 600,
  },
});
