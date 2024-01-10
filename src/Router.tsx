import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
    Outlet,
    RouterProvider,
    Link,
    Router,
    Route,
    RootRoute,
} from '@tanstack/react-router'
import App from './App'
import HomePage from './Index'
import Login from './auth/login'
import GenerateInfo from './pages/generator'

const rootRoute = new RootRoute({
    component: App
})

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage
})
const loginRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login
})

const aboutRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: () => {
        return (
            <h1>About </h1>
        )
    }
})


const Info = new Route({
    getParentRoute: () => rootRoute,
    path: "/gen/info",
    component: GenerateInfo
})

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, loginRoute, Info])

export const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
