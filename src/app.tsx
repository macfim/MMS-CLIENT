import { Suspense, lazy } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import FullPageSpinner from './components/full-page-spinner'

const HomePage = lazy(() => import('./pages/home-page'))
const LoginPage = lazy(() => import('./pages/login-page'))
const RegisterPage = lazy(() => import('./pages/register-page'))

function requireAuth(component: React.ReactNode) {
	return <AuthProvider>{component}</AuthProvider>
}

function BlankLayout() {
	return <Outlet />
}

function App() {
	return (
		<Suspense fallback={<FullPageSpinner />}>
			<Routes>
				<Route index element={requireAuth(<HomePage />)} />
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
