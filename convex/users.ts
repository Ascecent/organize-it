import { ConvexError, v } from 'convex/values';
import { internalMutation, MutationCtx, QueryCtx } from './_generated/server';
import { Auth, UserIdentity } from 'convex/server';

export const getIdentity = async (auth: Auth): Promise<UserIdentity> => {
	const identity = await auth.getUserIdentity();

	if (!identity) {
		throw new ConvexError(
			'Unauthorized, you must be logged in to perform this action',
		);
	}

	return identity;
};

export const getUserByIdentifier = async (
	ctx: QueryCtx | MutationCtx,
	tokenIdentifier: string,
) => {
	const user = await ctx.db
		.query('users')
		.withIndex('by_tokenIdentifier', q =>
			q.eq('tokenIdentifier', tokenIdentifier),
		)
		.first();

	if (!user) {
		throw new ConvexError('The provided user was not found');
	}

	return user;
};

export const createUser = internalMutation({
	args: { clerkId: v.string(), authIssuer: v.string(), name: v.string() },
	async handler(ctx, args) {
		const tokenIdentifier = `${args.authIssuer}|${args.clerkId}`;

		const user = await ctx.db.insert('users', {
			tokenIdentifier: tokenIdentifier,
			clerkId: args.clerkId,
			tokenIssuer: args.authIssuer,
			name: args.name,
			orgIds: [args.clerkId],
		});

		return user;
	},
});

export const addOrgIdToUser = internalMutation({
	args: { tokenIdentifier: v.string(), orgId: v.string() },
	async handler(ctx, args) {
		const user = await getUserByIdentifier(ctx, args.tokenIdentifier);

		await ctx.db.patch(user._id, {
			orgIds: [...user.orgIds, args.orgId],
		});
	},
});
