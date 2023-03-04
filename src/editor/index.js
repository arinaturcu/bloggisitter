/* global bloggisitter */

import styled from '@emotion/styled';

import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar } from '@wordpress/edit-post';
import {
    __experimentalToolsPanel as ToolsPanel
} from "@wordpress/components";
import { getCurrentPost } from "../utils/rest";
import { useEffect, useState } from "@wordpress/element";
import Title from "./post-components/title";
import { BloggisitterIcon } from "../utils/icons";
import Excerpt from "./post-components/excerpt";

const PanelDescription = styled.div`
    grid-column: span 2;
    margin-left: 10px;
`;


const SecondFeaturedImage = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        getCurrentPost().then((response) => {
            setContent( response.content.rendered );
        });
    }, []);

    return (
        <PluginSidebar
            title={ __( 'Bloggisitter', 'bloggisitter' ) }
            initialOpen="true"
            className="bloggisitter-settings-panel"
            icon={ BloggisitterIcon }
        >
            <ToolsPanel
                label={ __( 'Post Components', 'bloggisitter' ) }
            >
                <PanelDescription>
                    <p>{ __( 'Save your time by streamlining the content creation process using customizable options to make it easy to adjust the generated data to suit any blog or website.', 'bloggisitter' ) }</p>
                </PanelDescription>
                <Title
                    content={ content }
                />
                <Excerpt
                    content={ content }
                />
            </ToolsPanel>
        </PluginSidebar>
    );
};

registerPlugin( 'bloggisitter', {
    render: SecondFeaturedImage,
} );
