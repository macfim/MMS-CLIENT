import NavBar from '@/components/nav-bar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import useMoneyStacks from '@/hooks/useMoneyStacks'
import { Loader2 } from 'lucide-react'
import CreateMoneyStackDialog from '@/components/create-money-stack-dialog'
import MoneyStack from '@/components/money-stack'

export default function HomePage() {
	const { data: moneyStacks, isLoading: isLoadingMoneyStacks } =
		useMoneyStacks()

	return (
		<>
			<NavBar />
			<main className='container grid place-content-center min-h-screen overflow-hidden  py-12'>
				<Card className='shadow-lg'>
					<CardHeader className='border-b p-2 text-center text-xl'>
						Your list of money stacks
					</CardHeader>
					<CardContent className='pb-0 py-4'>
						<CreateMoneyStackDialog />
						{isLoadingMoneyStacks && (
							<div className='w-full h-full grid place-content-center p-20'>
								<Loader2 className='animate-spin' size={50} />
							</div>
						)}
						{!isLoadingMoneyStacks && moneyStacks?.length === 0 && (
							<div className='grid place-content-center p-10'>
								No Money Stacks
							</div>
						)}
						{!isLoadingMoneyStacks && moneyStacks?.length !== 0 && (
							<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
								{moneyStacks?.map((moneyStack) => (
									<MoneyStack key={moneyStack.id} moneyStack={moneyStack} />
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</main>
		</>
	)
}
