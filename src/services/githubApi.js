const BASE_URL = 'https://api.github.com';

// Helper to handle API responses
async function request(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`GitHub API Error: ${response.statusText}`);
  }
  
  return response.json();
}

// Module 2 & 3: Fetch User Data
export const getUserProfile = (username) => request(`/users/${username}`);
export const getUserRepos = (username) => request(`/users/${username}/repos?sort=updated`);

// Module 4: Fetch Repository Details
export const getRepoDetails = (owner, repo) => request(`/repos/${owner}/${repo}`);
export const getRepoContributors = (owner, repo) => request(`/repos/${owner}/${repo}/contributors`);