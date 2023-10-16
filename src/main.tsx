import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MutationCache, QueryClient, QueryClientProvider } from 'react-query'
import { Toaster, toast } from 'sonner'
import { z } from 'zod'
import { AxiosError } from 'axios'

import App from './App.tsx'
import './globals.css'

// eslint-disable-next-line react-refresh/only-export-components
const ErrorSchema = z.object({
	message: z.union([z.string(), z.array(z.string())]),
	error: z.string(),
	statusCode: z.number(),
})

const queryClient = new QueryClient({
	mutationCache: new MutationCache({
		onError: (error) => {
			if (error instanceof AxiosError) {
				const parsedError = ErrorSchema.safeParse(error.response?.data)

				if (parsedError.success) {
					if (Array.isArray(parsedError.data.message)) {
						return toast.error(parsedError.data.message.join('\n'))
					}

					return toast.error(parsedError.data.message)
				}
			}

			toast.error('An unknown error occurred')
		},
	}),
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Toaster />
				<App />
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
)
