export default {
	title: 'About Us', 
	name: 'about_us', 
	type: 'document', 
	fields: [
		{
			title: 'Image',
			name: 'image',
			type: 'image'
		},
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
			title: 'Opening Hours Monday-Friday', 
			name: 'openingHoursMondayFriday', 
			type: 'string', 
		},
		{
			title: 'Opening Hours Saturday-Sunday', 
			name: 'openingHoursSaturdaySunday', 
			type: 'string', 
		},
		{
			title: 'Email address',
			name: 'emailAddress',
			type: 'email',
		},
		{
			title: 'Phone number',
			name: 'phoneNumber',
			type: 'number',
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