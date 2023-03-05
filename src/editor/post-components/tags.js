import { __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { generateText } from '../../utils/openai';
import PostGenerateText from '../components/post-generate-text';

const Tags = ( { content, openAIKey } ) => {
	const [ tags, setTags ] = useState( '' );
	const [ loading, setLoading ] = useState( false );

	const generateTags = () => {
		setLoading( true );
		generateText( 'tags', content, openAIKey ).then( ( response ) => {
			setTags(
				response.choices[ 0 ].message.content.replaceAll( '"', '' )
			);
			setLoading( false );
		} );
	};

	return (
		<ToolsPanelItem
			hasValue={ () => !! tags }
			label={ __( 'Tags', 'bloggisitter' ) }
			onDeselect={ () => setTags( undefined ) }
		>
			<PostGenerateText
				type="tags"
				value={ tags }
				generate={ generateTags }
				loading={ loading }
			/>
		</ToolsPanelItem>
	);
};

export default Tags;
