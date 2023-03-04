const OPENAI_API_KEY = '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';

const systemText = {
    title: "You generate a title for a blog article based on the content",
    tags: "You generate tags for a blog article based on the content",
    excerpt: "Suggest a post excerpt for the blog article based on the following content",
    tableOfContents: "You generate a table of contents for a blog article based on the content",
    relatedTopics: "You generate related topics for a blog article based on the content",
    referrals: "You provide a list of potential external referrals with links for the following blog content",
    rephrase: "You rephrase the following text",
};

export const generateText = async (
    type,
    content,
    length = 55,
) => {
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: systemText[type] + ( type === 'excerpt' ? ` in maximum ${length} words` : '' )
                },
                {
                    role: "user",
                    content: content
                },
            ]
        })
    };

    return await fetch('https://api.openai.com/v1/chat/completions', options).then((response) => {
        return response.json();
    });
};
