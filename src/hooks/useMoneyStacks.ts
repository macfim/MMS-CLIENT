import { useQuery } from 'react-query'
import { z } from 'zod'
import api, { HTTPMethod } from '@/lib/api'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import useRefresh from './useRefresh'
import { AxiosError } from 'axios'

const moneyStacksRequestSchema = z.void()
const moneyStacksResponseSchema = z.array(
	z.object({
		id: z.string(),
		title: z.string(),
		description: z.string().nullable(),
		initialAmount: z.number(),
		previousAmount: z.number(),
		currentAmount: z.number(),
		createdAt: z.string(),
		updatedAt: z.string(),
		userId: z.string(),
	})
)

export type MoneyStacksRequest = z.infer<typeof moneyStacksRequestSchema>
export type MoneyStacksResponse = z.infer<typeof moneyStacksResponseSchema>

const getMoneyStacks = api<MoneyStacksRequest, MoneyStacksResponse>({
	method: HTTPMethod.GET,
	requestSchema: moneyStacksRequestSchema,
	responseSchema: moneyStacksResponseSchema,
})

function useMoneyStacks() {
	const navigate = useNavigate()

	const { mutate: refresh } = useRefresh()

	return useQuery({
		queryKey: 'moneyStacks',
		queryFn: function () {
			return getMoneyStacks('/money-stacks', undefined, {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			})
		},
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		retry: false,
		staleTime: 1000 * 60 * 60 * 24, // 24 hours
		onError(err) {
			const refreshToken = Cookies.get('refreshToken')

			if (err instanceof AxiosError) {
				const status = err.response?.status

				if (status === 401 || status === 403) {
					if (refreshToken) {
						refresh()
						return
					}

					navigate('/auth')
				}
			}
		},
	})
}

export default useMoneyStacks
