export default {
	title: 'Accommodation',
	name: 'accommodation',
	type: 'document',
	groups: [
		{
			title: 'County',
			name: 'county',
		},
		{
			title: 'Description',
			name: 'description',
		},
		{
			title: 'Gallery',
			name: 'gallery',
		},
		{
			title: 'Price',
			name: 'price',
		}
	],
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			validation: Rule => Rule.required()
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title'
			}
		},
		{
			title: 'Category',
			name: 'category',
			type: 'string',
			options: {
				layout: 'radio',
				direction: 'vertical',
				list: ['beachfront', 'amazing views', 'luxe', 'amazing pools', 'cabins', 'treehouses', 'private rooms']
			}
		},
		{
			title: 'Property type',
			name: 'property_type',
			type: 'string',
			options: {
				layout: 'radio',
				direction: 'horizontal',
				list: ['house', 'flat', 'guest house', 'hotel']
			}
		},
		{
			title: 'County',
			name: 'county',
			type: 'reference',
			to: [{ type: 'county'}],
			group: 'county',
			validation: Rule => Rule.required()
		},
		{
			title: 'City',
			name: 'city',
			type: 'string',
			validation: Rule => Rule.required()
		},
		{
			title: 'Location',
			name: 'location',
			type: 'document',
			fields: [
				{
					title: 'Latitude',
					name: 'latitude',
					type: 'string',
				},
				{
					title: 'Longitude',
					name: 'longitude',
					type: 'string',
				}
			]
		},
		{
			title: 'Essentials',
			name: 'essentials',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				layout: 'radio',
				direction: 'vertical',
				list: [
					{ title: 'Wifi', value: 'wifi' },
					{ title: 'TV', value: 'tv' },
					{ title: 'Hair dryer', value: 'hair dryer' },
					{ title: 'Pool', value: 'pool' },
					{ title: 'BBQ grill', value: 'bbq grill' },
					{ title: 'Breakfast', value: 'breakfast' },
					{ title: 'Indoor fireplace', value: 'indoor fireplace' },
					{ title: 'Beachfront', value: 'beachfront' },
					{ title: 'Ski-in/ski-out', value: 'ski-in/ski-out' },
					{ title: 'Smoking allowed', value: 'smoking allowed' },
					{ title: 'Free parking on premises', value: 'free parking on premises' },
					{ title: 'Air conditioning', value: 'air conditioning' },
					{ title: 'Washing machine', value: 'washing machine' },
					{ title: 'Heating', value: 'heating' },
					{ title: 'Dedicated workspace', value: 'dedicated workspace' },
			  ],
			},
		},
		{
			title: 'Beds',
			name: 'beds',
			type: 'string',
			options: {
				layout: 'collapsible',
				list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
			},
			validation: Rule => Rule.required()
		},
		{
			title: 'Description',
			name: 'description',
			type: 'array',
			group: 'description',
			of: [{ type: 'block'}]
		},
		{
			title: 'Price',
			name: 'price',
			type: 'number',
			group: 'price',
			validation: Rule => Rule.required()
		},
		{
			title: 'Gallery',
			description: 'Upload a photo',
			name: 'gallery',
			group: 'gallery',
			type: 'array',
			of: [
				{
					type: 'image',
				}
			]
		}
	]
}