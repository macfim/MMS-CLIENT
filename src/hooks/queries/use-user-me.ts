import { api } from '@/lib/newApi'
import { User, userSchema } from '@/schemas/user'
import { useQuery } from '@tanstack/react-query'

async function getUserMeApi(): Promise<User> {
	const response = await api.get('/users/me', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		},
	})

	return userSchema.parse(response.data)
}

export default function useUserMe() {
	return useQuery({
		queryKey: ['userMe'],
		queryFn: getUserMeApi,
	})
}
