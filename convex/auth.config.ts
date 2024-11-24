const config = {
	providers: [
		{
			domain: process.env.CLERK_HOSTNAME,
			applicationID: 'convex',
		},
	],
};

export default config;
