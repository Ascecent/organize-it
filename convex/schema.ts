import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	files: defineTable({
		name: v.string(),
		orgId: v.string(),
		storageId: v.id('_storage'),
		createdBy: v.id('users'),
	}).index('by_orgId', ['orgId']),
	users: defineTable({
		tokenIdentifier: v.string(),
		clerkId: v.string(),
		tokenIssuer: v.string(),
		name: v.string(),
		orgIds: v.array(v.string()),
	}).index('by_tokenIdentifier', ['tokenIdentifier']),
});
