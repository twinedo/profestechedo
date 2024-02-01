import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from 'navigations';
import {Provider} from 'react-redux';
import {store} from 'stores/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

let persistor = persistStore(store);
const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
