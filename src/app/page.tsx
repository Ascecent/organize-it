'use client';

import {
	SignedIn,
	SignedOut,
	SignInButton,
	useOrganization,
	useUser,
} from '@clerk/nextjs';

import { useQuery } from 'convex/react';

import { Button } from '@/components/ui/button';

import { api } from '../../convex/_generated/api';
import { UploadFileDialog } from '@/partials/upload-file-button';
import { FileCard } from '@/components/file-card';
import { GridContainer } from '@/components/grid-container';

export default function Home() {
	const organization = useOrganization();
	const user = useUser();

	let orgId = null;
	if (organization.isLoaded && user.isLoaded) {
		orgId = organization.organization?.id ?? user.user?.id;
	}

	const files = useQuery(api.files.getFiles, orgId ? { orgId } : 'skip');

	return (
		<main className='container mx-auto pt-12'>
			<SignedIn>
				<div className='flex justify-between mb-4'>
					<h1 className='text-4xl font-bold'>Your Files</h1>
					<UploadFileDialog orgId={orgId} />
				</div>

				<GridContainer minWidth={218}>
					{files?.map(file => (
						<FileCard key={file._id} file={file} />
					))}
				</GridContainer>
			</SignedIn>

			<SignedOut>
				<SignInButton>
					<Button>Sign In</Button>
				</SignInButton>
			</SignedOut>
		</main>
	);
}
