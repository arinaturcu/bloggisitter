import {
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { generateText } from '../../utils/openai';
import PostGenerateText from '../components/post-generate-text';

const Excerpt = ( { content, openAIKey } ) => {
	const [ excerpt, setExcerpt ] = useState( '' );
	const [ excerptLength, setExcerptLength ] = useState( 55 );
	const [ loading, setLoading ] = useState( false );

	const generateExcerpt = () => {
		setLoading( true );
		generateText( 'excerpt', content, openAIKey, excerptLength ).then(
			( response ) => {
				setExcerpt(
					response.choices[ 0 ].message.content.replaceAll( '"', '' )
				);
				setLoading( false );
			}
		);
	};

	return (
		<ToolsPanelItem
			hasValue={ () => !! excerpt }
			label={ __( 'Excerpt', 'bloggisitter' ) }
			onDeselect={ () => setExcerpt( undefined ) }
		>
			<PostGenerateText
				type="excerpt"
				value={ excerpt }
				generate={ generateExcerpt }
				loading={ loading }
			>
				<br />
				<NumberControl
					label={ __( 'Excerpt Max Length', 'bloggisitter' ) }
					isShiftStepEnabled={ true }
					onChange={ setExcerptLength }
					shiftStep={ 10 }
					value={ excerptLength }
					labelPosition="side"
					className="bloggisitter-excerpt-length"
				/>
			</PostGenerateText>
		</ToolsPanelItem>
	);
};

export default Excerpt;
