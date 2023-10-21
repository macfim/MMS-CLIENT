import { Suspense, lazy } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import FullPageSpinner from './components/full-page-spinner'
import NavBar from './components/nav-bar'

const HomePage = lazy(() => import('./pages/home-page'))
const LoginPage = lazy(() => import('./pages/login-page'))
const RegisterPage = lazy(() => import('./pages/register-page'))
const MoneyStackPage = lazy(() => import('./pages/money-stack-page'))

function BlankLayout() {
	return <Outlet />
}

function MainLayout() {
	return (
		<AuthProvider>
			<NavBar />
			<Outlet />
		</AuthProvider>
	)
}

function App() {
	return (
		<Suspense fallback={<FullPageSpinner />}>
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route index element={<HomePage />} />
					<Route path='money-stacks/:id' element={<MoneyStackPage />} />
				</Route>
				<Route path='/auth' element={<BlankLayout />}>
					<Route index element={<Navigate to='/auth/login' />} />
					<Route path='login' element={<LoginPage />} />
					<Route path='register' element={<RegisterPage />} />
				</Route>
			</Routes>
		</Suspense>
	)
}

export default App
