/* global bloggisitter */
import { loadPromise, models } from '@wordpress/api';
export const fetchOptions = () => {
	let settings;
	return loadPromise.then( () => {
		settings = new models.Settings();
		return settings.fetch();
	} );
};

export const changeOption = ( option, value ) => {
	const model = new models.Settings( {
		[ option ]: value,
	} );

	return new Promise( ( resolve ) => {
		model.save().then( ( r ) => {
			if ( ! r || ! r[ option ] === value ) {
				resolve( { success: false } );
			}
			resolve( { success: false } );
		} );
	} );
};

export const saveToMediaLibrary = async ( image ) => {
	const currentDate = new Date();
	const fileName = `image-${ currentDate.getTime() }.png`;

	const options = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'image/png',
			'x-wp-nonce': bloggisitter.nonce,
			'Content-Disposition': `attachment; filename=${ fileName }`,
		},
	};

	const formData = new FormData();
	formData.append( 'file', {
		link: image,
		name: fileName,
		type: 'image/png',
	} );

	options.body = JSON.stringify( { data: formData } );

	return await fetch( bloggisitter.root + 'wp/v2/media', options ).then(
		( response ) => {
			return response.json();
		}
	);
};

export const getCurrentPost = async () => {
	const options = {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'x-wp-nonce': bloggisitter.nonce,
		},
	};

	return await fetch(
		bloggisitter.root + `wp/v2/posts/${ bloggisitter.postID }`,
		options
	).then( ( response ) => {
		return response.json();
	} );
};
