'use client';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useMutation } from 'convex/react';

import { ArrowUpFromLine, LoaderCircle } from 'lucide-react';

import { ToastManager } from '@/lib/toast';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { api } from '../../convex/_generated/api';

const formSchema = z.object({
	title: z.string().min(1).max(200),
	file: z.custom<File | null>(
		val => val instanceof File,
		'The file is required',
	),
});

interface Props {
	orgId: string | null | undefined;
}

export const UploadFileDialog = ({ orgId }: Props) => {
	const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

	const createFile = useMutation(api.files.createFile);
	const generateUploadUrl = useMutation(api.files.generateUploadUrl);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			file: null,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		if (!orgId) return;

		const postUrl = await generateUploadUrl();

		const result = await fetch(postUrl, {
			method: 'POST',
			headers: { 'Content-Type': values.file?.type ?? '' },
			body: values.file,
		});

		const { storageId } = await result.json();

		await createFile({ name: values.title, orgId, storageId });

		setIsFileDialogOpen(false);

		ToastManager.success('File uploaded successfully');
	};

	return (
		<Dialog
			open={isFileDialogOpen}
			onOpenChange={isOpen => {
				setIsFileDialogOpen(isOpen);
				form.reset();
			}}
		>
			<DialogTrigger asChild>
				<Button>Upload File</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload your file here</DialogTitle>

					<DialogDescription>
						This file will be accessible by anyone in your
						organization.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-8'
					>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>

						<FormField
							control={form.control}
							name='file'
							render={({ field: { onChange }, ...field }) => (
								<FormItem>
									<FormLabel>File</FormLabel>
									<FormControl>
										<Input
											type='file'
											{...field}
											onChange={e => {
												if (!e.target.files) return;

												onChange(e.target.files[0]);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type='submit'
							disabled={form.formState.isSubmitting || false}
							className='flex items-center gap-1'
						>
							{form.formState.isSubmitting ? (
								<LoaderCircle className='w-4 h-4 animate-spin' />
							) : (
								<ArrowUpFromLine className='w-4 h-4' />
							)}
							Submit
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
