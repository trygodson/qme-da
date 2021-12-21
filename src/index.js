import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './entryFile/App';
import { AuthProvider } from './shared/context/useAuthContext';
import { TenantProvider } from './shared/context/useTenantContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'font-awesome/css/font-awesome.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import { DoctorProvider } from './shared/context/useDoctorContext';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});
ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TenantProvider>
          <DoctorProvider>
            <App />
          </DoctorProvider>
        </TenantProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
