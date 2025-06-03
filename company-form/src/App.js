import { useAuth } from "react-oidc-context";
import CompanyForm from './pages/CompanyForm';
import styles from './pages/CompanyForm.module.scss';
import HomePage from "./pages/HomePage";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    window.location.href = '/logout';
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div className={styles.container}>
        <CompanyForm 
          email={auth.user.profile.email}
          onClickLogout={() => auth.removeUser()}/>
      </div>
    );
  }

  return (
    <HomePage
      onSignIn={() => auth.signinRedirect()}
      onSignOut={() => signOutRedirect()}
    />
  );
}

export default App;
