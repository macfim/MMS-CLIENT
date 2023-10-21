import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'
import { CreateMoneyStackForm } from './forms/create-money-stack'
import { useState } from 'react'

export default function CreateMoneyStackDialog() {
	const [isShowDialog, setIsShowDialog] = useState(false)

	return (
		<Dialog open={isShowDialog} onOpenChange={setIsShowDialog}>
			<DialogTrigger className={cn('w-full mt-4', buttonVariants())}>
				Add a money stack
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a money stack</DialogTitle>
					<DialogDescription>
						This form is used to create a money stack. Please fill out the
						following details to create your money stack.
					</DialogDescription>
				</DialogHeader>
				<CreateMoneyStackForm setIsShowDialog={setIsShowDialog} />
			</DialogContent>
		</Dialog>
	)
}
