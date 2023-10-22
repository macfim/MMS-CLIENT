import { api } from '@/lib/newApi'
import { MoneyStack, moneyStackSchema } from '@/schemas/money-stack'
import { useQuery } from '@tanstack/react-query'

async function getMoneyStackApi(id: string): Promise<MoneyStack> {
	const response = await api.get(`/money-stacks/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		},
	})

	return moneyStackSchema.parse(response.data)
}

export default function useMoneyStacks(id: string) {
	return useQuery({
		queryKey: ['moneyStack', id],
		queryFn: () => getMoneyStackApi(id),
	})
}
