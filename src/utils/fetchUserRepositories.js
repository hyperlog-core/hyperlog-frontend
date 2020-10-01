export const fetchUserRepositories = async (
  token,
  repositories,
  nextCursor
) => {
  if (!repositories) repositories = {};
  const a = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `{
        viewer{
          repositories(first:50${
            nextCursor ? ', after: "' + nextCursor + '"' : ""
          }){
            nodes{
              nameWithOwner
              description
              stargazerCount
              isPrivate
              primaryLanguage{
                name
              }
              owner{
                avatarUrl
              }
            }
            pageInfo{
              hasNextPage
              endCursor
            }
          }
        }
      }`,
    }),
  });
  const json = await a.json();

  json.data.viewer.repositories.nodes.forEach(
    (repo) => (repositories[repo.nameWithOwner] = repo)
  );

  if (json.data.viewer.repositories.pageInfo.hasNextPage) {
    fetchUserRepositories(
      token,
      repositories,
      json.data.viewer.repositories.pageInfo.endCursor
    );
  }

  console.log(repositories);

  return repositories;
};
