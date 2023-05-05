export default Structure => {
	const { divider, list, documentTypeListItem } = Structure

	return list()
				.title('Website content')
				.showIcons(false)
				.items([
					documentTypeListItem('accommodation'),
					documentTypeListItem('county'),

					divider(),

					documentTypeListItem('about_us'),
				])
}