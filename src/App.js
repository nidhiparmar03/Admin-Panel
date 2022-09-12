import { Route, Switch } from 'react-router-dom';
import Layout from './compontent/layout/Layout';
import Medicinces from './containers/medicines/Medicinces';
import Patients from './containers/patient/Patients';
import Doctors from './containers/doctors/Doctors';
import { Provider } from 'react-redux';
import { conFigureStore } from './reduex/Store';
import Counter from './containers/counter/Counter';
import { PersistGate } from 'redux-persist/integration/react';
import PromiseExample from './containers/example/PromiseExample';

function App() {
  const {store , persistor} = conFigureStore();

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Switch>
              <Route path={"/medicines"} exact component={Medicinces} />
              <Route path={"/patients"} exact component={Patients} />
              <Route path={"/doctors"} exact component={Doctors} />
              <Route path={"/counter"} exact component={Counter} />
              <Route path={"/counter"} exact component={Counter} />
              <Route path={"/promise_Exmaple"} exact component={PromiseExample} />
            </Switch>
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
