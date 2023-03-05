import {
	__experimentalToolsPanelItem as ToolsPanelItem,
	SelectControl,
	TextareaControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { generateImage, generateText } from '../../utils/openai';
import PostGenerateImage from '../components/post-generate-image';

const FeaturedImage = ( { content, openAIKey } ) => {
	const [ featuredImage, setFeaturedImage ] = useState( '' );
	const [ loading, setLoading ] = useState( false );
	const [ contentBased, setContentBased ] = useState( true );
	const [ prompt, setPrompt ] = useState( '' );
	const [ imageSize, setImageSize ] = useState( '512x512' );

	const generateFeaturedImage = async () => {
		setLoading( true );

		const text = contentBased
			? (
					await generateText(
						'featuredImagePrompt',
						content,
						openAIKey
					)
			   ).choices[ 0 ].message.content
			: prompt;

		if ( contentBased ) {
			setPrompt( text );
		}

		generateImage( 'featuredImage', text, imageSize, openAIKey ).then(
			( response ) => {
				setFeaturedImage( response.data[ 0 ].url );
				setLoading( false );
			}
		);
	};

	return (
		<ToolsPanelItem
			hasValue={ () => !! featuredImage }
			label={ __( 'Featured Image', 'bloggisitter' ) }
			isShownByDefault
			onDeselect={ () => setFeaturedImage( undefined ) }
		>
			<PostGenerateImage
				type="featuredImage"
				label={ __( 'Featured Image', 'bloggisitter' ) }
				value={ featuredImage }
				generate={ generateFeaturedImage }
				loading={ loading }
			>
				<br />
				<SelectControl
					label={ __( 'Image Size', 'bloggisitter' ) }
					labelPosition="side"
					value={ imageSize }
					onChange={ setImageSize }
					options={ [
						{ label: '256x256', value: '256x256' },
						{ label: '512x512', value: '512x512' },
						{ label: '1024x1024', value: '1024x1024' },
					] }
				/>
				<br />
				<SelectControl
					label={ __( 'Generate image based on', 'bloggisitter' ) }
					labelPosition="side"
					value={ contentBased ? 'content' : 'input' }
					onChange={ ( value ) =>
						setContentBased( value === 'content' )
					}
					options={ [
						{
							label: __( 'Content', 'bloggisitter' ),
							value: 'content',
						},
						{
							label: __( 'Input', 'bloggisitter' ),
							value: 'input',
						},
					] }
				/>

				{ ! contentBased && (
					<>
						<br />
						<TextareaControl
							label={ __( 'Prompt', 'bloggisitter' ) }
							value={ prompt }
							onChange={ ( value ) => setPrompt( value ) }
							rows={ 7 }
						/>
					</>
				) }
			</PostGenerateImage>
		</ToolsPanelItem>
	);
};

export default FeaturedImage;
