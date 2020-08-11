import useSWR from "swr";

const fetcher = (...args) =>
  fetch(...args).then(async (res) => {
    const data = await res.json();
    return {
      status: res.status,
      data,
    };
  });

export function useUser(id) {
  const { data, error } = useSWR(
    `${process.env.REACT_APP_AWS_URL}/user/${id}`,
    fetcher,
    { refreshInterval: 2000 }
  );

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
