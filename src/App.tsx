import { Suspense, lazy } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import FullPageSpinner from '@/components/FullPageSpinner'

const LoginPage = lazy(() => import('./pages/LoginPage'))

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
				<Route index element={requireAuth(<h1>Home</h1>)} />
				<Route path='/auth' element={<BlankLayout />}>
					<Route index element={<Navigate to='/auth/login' />} />
					<Route path='login' element={<LoginPage />} />
				</Route>
			</Routes>
		</Suspense>
	)
}

export default App
