import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import './index.css'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './Router.tsx'

import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey="pk_test_c3Vubnkta29kaWFrLTE0LmNsZXJrLmFjY291bnRzLmRldiQ">
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <RouterProvider router={router} />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  </React.StrictMode>,
)
