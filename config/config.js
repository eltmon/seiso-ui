
module.exports = {
	instances: {
		self: {
			name: 'Sandbox',
			href: 'seiso-ui-sandbox.example.com'
		},
		env: {
			test: {
				name: 'Test',
				href: 'https://thisapp.test.example.com'
			},
			prod: {
				name: 'Prod',
				href: 'https://thisapp.prod.example.com'
			}
		}
	},
	apis: {
		seiso: 'http://localhost:8080'
	}
};
