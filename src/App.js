import { IonApp, IonPage } from '@ionic/react';
import RouterApp from './global/routes/routes';



const App = () => (
  <IonApp>
    <IonPage>
      <RouterApp />
    </IonPage> 
  </IonApp>
);

export default App;
