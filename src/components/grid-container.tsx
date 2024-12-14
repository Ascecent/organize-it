interface Props {
	children: React.ReactNode;
	minWidth: number;
	spacing?: number;
}

export const GridContainer = ({ children, minWidth, spacing = 1 }: Props) => (
	<div
		style={{
			display: 'grid',
			gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
			gap: `${spacing}rem`,
		}}
	>
		{children}
	</div>
);
