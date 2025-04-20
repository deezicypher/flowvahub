import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google';


const queryClient = new QueryClient(
  {
     defaultOptions:{
        queries:{
           refetchOnMount:true,
           refetchOnWindowFocus: false,
        }
     }
  }
)


createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="<your_client_id>">
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
  </QueryClientProvider>,
)
