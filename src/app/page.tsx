'use client';

import { Button } from '@/components/ui/button';
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignOutButton,
} from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Home() {
	const createFile = useMutation(api.files.createFile);
	const files = useQuery(api.files.getFiles);

	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<SignedIn>
				<h1 className='text-3xl font-bold text-center'>
					Welcome to OrganizeIt!
				</h1>
				<SignOutButton>
					<Button>Sign Out</Button>
				</SignOutButton>
			</SignedIn>

			<SignedOut>
				<h1 className='text-3xl font-bold text-center'>
					Welcome to OrganizeIt!
				</h1>
				<SignInButton>
					<Button>Sign In</Button>
				</SignInButton>
			</SignedOut>

			{files?.map(file => <div key={file._id}>{file.name}</div>)}

			<Button
				onClick={() => {
					createFile({ name: 'Test File' });
				}}
			>
				Create File
			</Button>
		</div>
	);
}
