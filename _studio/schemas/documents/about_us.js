export default {
	title: 'About Us', 
	name: 'about_us', 
	type: 'document', 
	fields: [
		{
			title: 'History',
			name: 'history',
			type: 'array',
			of: [{ type: 'block'}]
		}, 
		{
			title: 'Location',
			name: 'location',
			type: 'document',
			fields: [
				{
					title: 'Longitude',
					name: 'longitude',
					type: 'string'
				},
				{
					title: 'Latitude',
					name: 'latitude',
					type: 'string'
				}
			]
		},
		{
			title: 'Opening Hours', 
			name: 'openingHours', 
			type: 'string', 
		},
		{
			title: 'Email',
			name: 'Email',
			type: 'email',
		}
	],

	preview: {
		prepare: () => {
			return {
				title: 'About Us'
			}
		}
	}
}