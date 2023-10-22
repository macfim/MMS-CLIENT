import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import App from './app.tsx'
import './globals.css'
import { Providers } from './components/providers.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Providers>
				<>
					<Toaster />
					<App />
				</>
			</Providers>
		</BrowserRouter>
	</React.StrictMode>
)
