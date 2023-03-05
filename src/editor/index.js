import styled from '@emotion/styled';

import { __ } from '@wordpress/i18n';
import { PluginSidebar } from '@wordpress/edit-post';
import {
	__experimentalToolsPanel as ToolsPanel,
	Button,
	TextControl,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { isEmpty } from 'lodash';

import { changeOption, fetchOptions, getCurrentPost } from '../utils/rest';
import { BloggisitterIcon } from '../utils/icons';

import Excerpt from './post-components/excerpt';
import FeaturedImage from './post-components/featured-image';
import MainTakeaways from './post-components/main-takeaways';
import Referrals from './post-components/referrals';
import Tags from './post-components/tags';
import Title from './post-components/title';

const PanelDescription = styled.div`
	grid-column: span 2;
	margin-left: 10px;
`;

const BloggisitterSettings = () => {
	const [ content, setContent ] = useState( '' );
	const [ openAIKey, setOpenAIKey ] = useState( '' );

	useEffect( () => {
		getCurrentPost().then( ( response ) => {
			setContent( response.content.rendered );
		} );

		fetchOptions().then( ( response ) => {
			setOpenAIKey( response.openai_key );
		} );
	}, [] );

	return (
		<PluginSidebar
			title={ __( 'Bloggisitter', 'bloggisitter' ) }
			initialOpen="true"
			className="bloggisitter-settings-panel"
			icon={ BloggisitterIcon }
		>
			<ToolsPanel label={ __( 'Post Components', 'bloggisitter' ) }>
				<PanelDescription>
					<p>
						{ __(
							'Save your time by streamlining the content creation process using customizable options to make it easy to adjust the generated data to suit any blog or website.',
							'bloggisitter'
						) }
					</p>
				</PanelDescription>

				<div className="bloggisitter-settings-panel__openai-key">
					<TextControl
						label={ __( 'OpenAI Key', 'bloggisitter' ) }
						value={
							openAIKey
								? openAIKey.slice( 0, 3 ) +
								  '...' +
								  openAIKey.slice( -4 )
								: ''
						}
						className="bloggisitter-settings-panel__openai-key-input"
						disabled={ ! isEmpty( openAIKey ) }
						onChange={ ( value ) => {
							setOpenAIKey( value );
							changeOption( 'openai_key', value ).then( () => {
								// eslint-disable-next-line no-console
								console.log( 'done!' );
							} );
						} }
					/>
					<Button
						isSecondary
						className="bloggisitter-settings-panel__openai-key-clear"
						onClick={ () => {
							setOpenAIKey( '' );
							changeOption( 'openai_key', '' ).then( () => {
								// eslint-disable-next-line no-console
								console.log( 'done!' );
							} );
						} }
					>
						{ __( 'Clear', 'bloggisitter' ) }
					</Button>
				</div>

				<Title content={ content } openAIKey={ openAIKey } />
				<Excerpt content={ content } openAIKey={ openAIKey } />
				<Tags content={ content } openAIKey={ openAIKey } />
				<MainTakeaways content={ content } openAIKey={ openAIKey } />
				<Referrals content={ content } openAIKey={ openAIKey } />
				<FeaturedImage content={ content } openAIKey={ openAIKey } />
			</ToolsPanel>
		</PluginSidebar>
	);
};

registerPlugin( 'bloggisitter', {
	render: BloggisitterSettings,
} );
