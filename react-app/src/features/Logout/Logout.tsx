import { useAuth0 } from "@auth0/auth0-react";
import defaultCss from './Logout.module.css';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className={defaultCss.root}
      onClick={() => {
        sessionStorage.removeItem('me');
        logout({ returnTo: window.location.origin })
      }}
      >
      {'Log out'}
    </button>
  );
};

export default LogoutButton;