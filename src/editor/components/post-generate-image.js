import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { isEmpty } from 'lodash';

import { saveToMediaLibrary } from '../../utils/rest';
import { MagicWand } from '../../utils/icons';

const PostGenerateImage = ( {
	type,
	value,
	generate,
	loading,
	children,
	label = '',
	help = '',
} ) => {
	return (
		<>
			<div className="label">{ isEmpty( label ) ? type : label }</div>

			{ value ? (
				<div className="bloggisitter-card active has-image">
					<div className="bloggisitter-card-body">
						<img
							className="bloggisitter-card-img"
							src={ value }
							alt="ai-generated"
						/>
					</div>
				</div>
			) : (
				<div className="bloggisitter-card image-placeholder">
					<div className="bloggisitter-card-body">
						<p className="bloggisitter-card-text help">
							{ __(
								'Generated image will appear here.',
								'bloggisitter'
							) }
						</p>
					</div>
				</div>
			) }

			{ help && <p className="help">{ help }</p> }

			{ children }

			<div className="bloggisitter-buttons">
				<Button
					isPrimary
					isSmall
					icon={ MagicWand }
					onClick={ generate }
					isBusy={ loading }
					disabled={ loading }
					className="bloggisitter-generate"
				>
					{ __( 'Generate', 'bloggisitter' ) }
				</Button>
				{ value && (
					<Button
						isSecondary
						isSmall
						onClick={ () => {
							saveToMediaLibrary( value ).then( ( response ) => {
								// eslint-disable-next-line no-console
								console.log( response );
							} );
						} }
						className="bloggisitter-save-media"
					>
						{ __( 'Save to Media Library', 'bloggisitter' ) }
					</Button>
				) }
			</div>
		</>
	);
};

export default PostGenerateImage;
