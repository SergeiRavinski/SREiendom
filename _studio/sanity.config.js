import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import schemas from './schemas/schemas.js';
import website from './structure/website.js';
import information from './structure/information.js';

export default {
	title: 'SREiendom',

	projectId: 'fmo4x6ix',
	dataset: 'production',

	plugins: [
		deskTool({
			title: 'Website',
			name: 'website',
			structure: website
		}),
		
		deskTool({
			title: 'Information',
			name: 'information',
			structure: information
		}),

		visionTool()
	],

	schema: {
		types: schemas,
	},
};