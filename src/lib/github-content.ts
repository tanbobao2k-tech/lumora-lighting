import "server-only";

const OWNER = "tanbobao2k-tech";
const REPO = "lumora-lighting";
const BRANCH = "master";

export function isGithubStorageEnabled(): boolean {
  return Boolean(process.env.GH_CONTENT_TOKEN);
}

async function githubRequest(url: string, init?: RequestInit) {
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.GH_CONTENT_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...init?.headers,
    },
  });
  return res;
}

/** Commit a text or binary file straight to the GitHub repo (used when the runtime filesystem is read-only, e.g. Vercel). */
export async function commitFileToGithub(
  repoPath: string,
  content: string,
  isBase64 = false
): Promise<void> {
  const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${repoPath}?ref=${BRANCH}`;

  const existing = await githubRequest(apiUrl);
  const sha = existing.ok ? (await existing.json()).sha : undefined;

  const base64Content = isBase64 ? content : Buffer.from(content, "utf-8").toString("base64");

  const res = await githubRequest(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${repoPath}`,
    {
      method: "PUT",
      body: JSON.stringify({
        message: `chore(admin): update ${repoPath}`,
        content: base64Content,
        sha,
        branch: BRANCH,
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Không commit được ${repoPath} lên GitHub: ${res.status} ${body}`);
  }
}
