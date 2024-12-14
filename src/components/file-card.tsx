import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
	CardTitle,
} from '@/components/ui/card';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Doc } from '../../convex/_generated/dataModel';
import { MoreVertical, Trash } from 'lucide-react';
import { Button } from './ui/button';

const FileCardActions = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant='ghost'>
					<MoreVertical size={24} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<Trash scale={16} />
					<p>Delete</p>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

interface Props {
	file: Doc<'files'>;
}

export const FileCard = ({ file }: Props) => {
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between'>
				<CardTitle className='text-wrap'>{file.name}</CardTitle>
				<FileCardActions />
			</CardHeader>
			<CardContent>
				<p>Card Content</p>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	);
};
