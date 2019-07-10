import React, { useEffect, useState, useCallback, Suspense } from "react";
import GitHub from "github-api";
import config from "./config";
import "./App.css";
import UserDetails from "./UserDetails";
import LoginSearch from "./LoginSearch";
import CircularProgress from "@material-ui/core/CircularProgress";

const RepoList = React.lazy(() => import("./RepoList"));

const gh = new GitHub({
  token: config.token
});

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {}, []);

  const onSearch = useCallback(async value => {
    setIsLoading(true);
    const user = gh.getUser(value);

    try {
      const userResponse = await user.getProfile();
      const reposResponse = await user.listRepos();

      setUser(userResponse.data);
      setRepos(
        reposResponse.data
          .filter(r => r.owner.login === value)
          .map(r => ({
            id: r.id,
            name: r.name,
            language: r.language
          }))
      );
    } catch (error) {
      setUser(null);
      setRepos([]);
      alert(`User '${value}' not found`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <code>GitHub Browser</code>
        </p>
      </header>
      <LoginSearch onSearch={onSearch} />
      {isLoading && (
        <div>
          <CircularProgress />
        </div>
      )}
      {!isLoading && user != null && (
        <UserDetails user={user} onReposClick={null} />
      )}
      <Suspense fallback={<CircularProgress style={{ marginTop: "1rem" }} />}>
        {!isLoading && repos.length > 0 && <RepoList repos={repos} />}
      </Suspense>
    </div>
  );
}

export default App;
