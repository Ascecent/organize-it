import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';

export const Header = () => {
	return (
		<header className='border-b py-4 bg-gray-50 sticky top-0 left-0'>
			<div className='container mx-auto flex justify-between'>
				<h1>OrganizeIt</h1>

				<div className='flex items-center gap-2'>
					<OrganizationSwitcher />
					<UserButton />
				</div>
			</div>
		</header>
	);
};
