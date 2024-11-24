import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

import { checkUserHasAccessToOrg } from './actions';
import { getIdentity } from './users';

export const generateUploadUrl = mutation(async ctx => {
	await getIdentity(ctx.auth);

	return await ctx.storage.generateUploadUrl();
});

export const createFile = mutation({
	args: {
		name: v.string(),
		orgId: v.string(),
		storageId: v.id('_storage'),
	},
	async handler(ctx, args) {
		const user = await checkUserHasAccessToOrg(ctx, args.orgId);

		await ctx.db.insert('files', {
			name: args.name,
			orgId: args.orgId,
			storageId: args.storageId,
			createdBy: user._id,
		});
	},
});

export const getFiles = query({
	args: {
		orgId: v.string(),
	},
	async handler(ctx, args) {
		await checkUserHasAccessToOrg(ctx, args.orgId);

		return ctx.db
			.query('files')
			.withIndex('by_orgId', q => q.eq('orgId', args.orgId))
			.collect();
	},
});
