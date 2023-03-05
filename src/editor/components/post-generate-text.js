/* global navigator */
import { Button, Tooltip } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { Icon, copy, check } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import classnames from 'classnames';
import { isEmpty } from 'lodash';

import { MagicWand } from '../../utils/icons';

const PostGenerateText = ( {
	type,
	value,
	generate,
	loading,
	children,
	label = '',
	help = '',
} ) => {
	const [ copied, setCopied ] = useState( false );

	return (
		<>
			<div className="label">{ isEmpty( label ) ? type : label }</div>

			{ value ? (
				<Tooltip
					text={ __( 'Click to copy', 'bloggisitter' ) }
					position="top"
				>
					{ /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */ }
					<div
						className={ classnames(
							'bloggisitter-card',
							'active'
						) }
						role="button"
						tabIndex="0"
						onClick={ () => {
							if ( value ) {
								navigator.clipboard
									.writeText( value )
									.then( () => {
										setCopied( true );
										setTimeout( () => {
											setCopied( false );
										}, 2000 );
									} );
							}
						} }
					>
						<div className="bloggisitter-card-body">
							<p className="bloggisitter-card-text">{ value }</p>
						</div>
						<Icon
							className="bloggisitter-card-copy"
							icon={ copied ? check : copy }
							size={ 16 }
						/>
					</div>
				</Tooltip>
			) : (
				<div className="bloggisitter-card">
					<div className="bloggisitter-card-body">
						<p className="bloggisitter-card-text help">
							{ __(
								'Generated text will appear here.',
								'bloggisitter'
							) }
						</p>
					</div>
				</div>
			) }

			{ help && (
				<>
					<br />
					<p className="help">{ help }</p>
				</>
			) }

			<br />
			{ children }

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
		</>
	);
};

export default PostGenerateText;
