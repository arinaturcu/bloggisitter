import { __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { generateText } from '../../utils/openai';
import PostGenerateText from '../components/post-generate-text';

const MainTakeaways = ( { content, openAIKey } ) => {
	const [ mainTakeaways, setMainTakeaways ] = useState( '' );
	const [ loading, setLoading ] = useState( false );

	const generateMainTakeaways = () => {
		setLoading( true );
		generateText( 'mainTakeaways', content, openAIKey ).then(
			( response ) => {
				setMainTakeaways(
					response.choices[ 0 ].message.content.replaceAll( '"', '' )
				);
				setLoading( false );
			}
		);
	};

	return (
		<ToolsPanelItem
			hasValue={ () => !! mainTakeaways }
			label={ __( 'Main Takeaways', 'bloggisitter' ) }
			onDeselect={ () => setMainTakeaways( undefined ) }
		>
			<PostGenerateText
				type="mainTakeaways"
				value={ mainTakeaways }
				generate={ generateMainTakeaways }
				loading={ loading }
				label={ __( 'Main Takeaways', 'bloggisitter' ) }
			/>
		</ToolsPanelItem>
	);
};

export default MainTakeaways;
