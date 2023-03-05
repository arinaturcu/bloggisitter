import { __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { generateText } from '../../utils/openai';
import PostGenerateText from '../components/post-generate-text';

const Title = ( { content, openAIKey } ) => {
	const [ title, setTitle ] = useState( '' );
	const [ loading, setLoading ] = useState( false );

	const generateTitle = () => {
		setLoading( true );
		generateText( 'title', content, openAIKey ).then( ( response ) => {
			setTitle(
				response.choices[ 0 ].message.content.replaceAll( '"', '' )
			);
			setLoading( false );
		} );
	};

	return (
		<ToolsPanelItem
			hasValue={ () => !! title }
			label={ __( 'Title', 'bloggisitter' ) }
			isShownByDefault
			onDeselect={ () => setTitle( undefined ) }
		>
			<PostGenerateText
				type="title"
				value={ title }
				generate={ generateTitle }
				loading={ loading }
			/>
		</ToolsPanelItem>
	);
};

export default Title;
