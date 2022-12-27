import Toggler from "atomic/atoms/Toggler";
import useAuth0Context from "Auth0Wrapper/AuthContext";
import LogoutButton from "features/Logout/Logout";
import { cloneElement } from "react";
import defaultCss from './Profile.module.css';

const Profile = () => {
  const {
    user,
    isAuthenticated,
    isLoading
  } = useAuth0Context();

  const hasImage = !!user?.image;
  const imageElement = hasImage
    ? (
      <img
        className={defaultCss.image}
        src={user!.picture}
        alt={user!.name}
      />
    )
    : (
      <div className={defaultCss.image}>
        {user?.email?.substring(0, 2)}
      </div>
    )

  return (
    isAuthenticated && !isLoading ? (
      <div className={defaultCss.root}>
        <Toggler
          renderButton={({ toggleOpened }) => cloneElement(imageElement, { onClick: toggleOpened})}
          renderContent={() => (
            <div className={defaultCss.dropdown}>
                <strong>
                  <p className={defaultCss.email}>{user!.email}</p>
                </strong>
                <p className={defaultCss.email}>{user!.sub}</p>
              <LogoutButton />
            </div>
          )} />
      </div>
    ) : null
  );
};

export default Profile;