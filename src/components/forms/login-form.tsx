'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useLogin from '@/hooks/mutations/use-login'
import { Loader2 } from 'lucide-react'

const loginFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

export function LoginForm() {
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const { mutate: login, isPending: isPendingLogin } = useLogin()

	async function onSubmit(values: z.infer<typeof loginFormSchema>) {
		login(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input {...field} placeholder='name@example.com' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input {...field} type='password' placeholder='********' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full'>
					{isPendingLogin ? (
						<Loader2 className='animate-spin' size={24} />
					) : (
						'Login'
					)}
				</Button>
			</form>
		</Form>
	)
}
