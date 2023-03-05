import { __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { generateText } from '../../utils/openai';
import PostGenerateText from '../components/post-generate-text';

const Referrals = ( { content, openAIKey } ) => {
	const [ referrals, setReferrals ] = useState( '' );
	const [ loading, setLoading ] = useState( false );

	const generateReferrals = () => {
		setLoading( true );
		generateText( 'referrals', content, openAIKey ).then( ( response ) => {
			setReferrals(
				response.choices[ 0 ].message.content.replaceAll( '"', '' )
			);
			setLoading( false );
		} );
	};

	return (
		<ToolsPanelItem
			hasValue={ () => !! referrals }
			label={ __( 'Referrals', 'bloggisitter' ) }
			onDeselect={ () => setReferrals( undefined ) }
		>
			<PostGenerateText
				type="referrals"
				value={ referrals }
				generate={ generateReferrals }
				loading={ loading }
				help={ __(
					'If the content has internal links, they will most likely appear in the referrals.',
					'bloggisitter'
				) }
			/>
		</ToolsPanelItem>
	);
};

export default Referrals;
