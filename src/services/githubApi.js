const BASE_URL = 'https://api.github.com';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const REQUEST_TIMEOUT_MS = 8000;

// Helper to handle API responses
async function request(endpoint) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      signal: controller.signal,
      headers: {
        Accept: 'application/vnd.github+json',
        ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (!response.ok) {
      let message = `GitHub API Error: ${response.status} ${response.statusText}`;

      if (response.status === 403) {
        message = 'GitHub API rate limit reached or access denied. Add VITE_GITHUB_TOKEN to your environment to authenticate requests.';
      }

      throw new Error(message);
    }

    return response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('GitHub API request timed out. Check your network connection or add VITE_GITHUB_TOKEN for authenticated access.', { cause: error });
    }

    throw new Error(error instanceof Error ? error.message : 'GitHub API request failed.', {
      cause: error,
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

// Module 2 & 3: Fetch User Data
export const getUserProfile = (username) => request(`/users/${username}`);
export const getUserRepos = (username) => request(`/users/${username}/repos?sort=updated`);
export const searchUsers = (query, page = 1, perPage = 10) => request(`/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`);

// Module 4: Fetch Repository Details
export const getRepoDetails = (owner, repo) => request(`/repos/${owner}/${repo}`);
export const getRepoContributors = (owner, repo) => request(`/repos/${owner}/${repo}/contributors`);