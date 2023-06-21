export default function ExamplePage({ params }) {
	return (
		<div>
			<h1>Example Page</h1>
			<p>Path: {params.path}</p>
		</div>
	);
}
