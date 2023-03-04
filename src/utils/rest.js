/* global bloggisitter */

export const getCurrentPost = async () => {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-wp-nonce': bloggisitter.nonce,
        },
    };

    return await fetch(bloggisitter.root + `wp/v2/posts/${bloggisitter.postID}` , options).then((response) => {
        return response.json();
    });
};
