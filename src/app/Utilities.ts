export const IsNullOrEmpty = (text: string | null) => {
	return text == null || text === '' || text.replace(/ /g, '').length === 0;
};