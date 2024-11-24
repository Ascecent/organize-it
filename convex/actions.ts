import { MutationCtx, QueryCtx } from './_generated/server';
import { getIdentity, getUserByIdentifier } from './users';

export const checkUserHasAccessToOrg = async (
	ctx: QueryCtx | MutationCtx,
	orgId: string,
) => {
	const identity = await getIdentity(ctx.auth);
	const user = await getUserByIdentifier(ctx, identity.tokenIdentifier);

	if (!user.orgIds.includes(orgId)) {
		throw new Error(
			'You do not have permissions to access this organization',
		);
	}

	return user;
};
