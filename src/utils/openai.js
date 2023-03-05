const systemText = {
	title: 'You generate a title for a blog article based on the content',
	tags: 'You generate tags for a blog article based on the content, separated by commas',
	excerpt:
		'Suggest a post excerpt for the blog article based on the following content',
	mainTakeaways:
		'You generate main takeaways for a blog article based on the content, as an ordered list, each takeaway in a new line.',
	relatedTopics:
		'You generate related topics for a blog article based on the content',
	referrals:
		'You provide a list of maximum 5 potential referrals with links for the following blog content, as an ordered list, each referral in a new line.',
	rephrase: 'You rephrase the following text',
	featuredImagePrompt:
		'You generate just one short description of maximum 1000 characters of an image related to the given text for an AI generator of images.',
};

export const generateText = async ( type, content, openAIKey, length = 55 ) => {
	const options = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${ openAIKey }`,
		},
		body: JSON.stringify( {
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content:
						systemText[ type ] +
						( type === 'excerpt'
							? ` in maximum ${ length } words`
							: '' ),
				},
				{
					role: 'user',
					content,
				},
			],
		} ),
	};

	return await fetch(
		'https://api.openai.com/v1/chat/completions',
		options
	).then( ( response ) => {
		return response.json();
	} );
};

export const generateImage = async ( type, prompt, size, openAIKey ) => {
	const options = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${ openAIKey }`,
		},
		body: JSON.stringify( {
			prompt,
			size,
			response_format: 'url',
		} ),
	};

	return await fetch(
		'https://api.openai.com/v1/images/generations',
		options
	).then( ( response ) => {
		return response.json();
	} );
};
