import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useAuth from '@/hooks/useAuth'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

import { Link } from 'react-router-dom'

export default function NavBar() {
	const { user } = useAuth()

	return (
		<header className='absolute w-screen'>
			<div className='container p-3 flex items-center justify-between'>
				<span className='text-xl'>
					<Link to='/'>MMS</Link>
				</span>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger className='h-8 w-8 rounded-full'>
							<Avatar className='w-8 h-8'>
								<AvatarImage src='https://github.com/shadcn.png' />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</TooltipTrigger>
						<TooltipContent>{user.name}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</header>
	)
}
