import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonRouterLink, IonIcon } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({setIsLoggedIn, history, setUsername: setUsernameAction}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    if(!password) {
      setPasswordError(true);
    }

    if(username && password) {
      await setIsLoggedIn(true);
      await setUsernameAction(username);
      history.push('/home', {direction: 'none'});
    }
  };

  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">   
          </IonButtons>
          <IonTitle>Login to IFCM</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="login-logo">
          <img src="assets/img/ifcm_logo.png" alt="ifcm Logo" />
        </div>

        <form noValidate onSubmit={login}>
          <IonList>
            <IonButton expand="block" color="facebook" className="margin"> <IonIcon name="logo-facebook" className="margin-logo"></IonIcon> Facebook Connect</IonButton>
            <IonButton expand="block" color="instagram" className="margin"><IonIcon name="logo-instagram" className="margin-logo"></IonIcon> Instagram Connect</IonButton>
            <IonButton expand="block" color="twitter" className="margin"> <IonIcon name="logo-twitter" className="margin-logo"></IonIcon> Twitter Connect</IonButton>
            
            <IonText className="ion-text-center"> <p className="gray" > OR</p></IonText>
            
            <IonItem>
              <IonLabel position="stacked" color="primary">Username</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Username is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Login</IonButton>
            </IonCol>
          </IonRow>
        </form>
        <IonText className="ion-text-center">
          <IonRouterLink href="/forgot" class="forgot">Forgot Password ?</IonRouterLink>
          <p>Don't have an account ? <IonRouterLink href="/signup">Sign up</IonRouterLink></p>
        </IonText>
        

      </IonContent>

    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername
  },
  component: Login
})