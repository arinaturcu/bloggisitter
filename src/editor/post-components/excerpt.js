import { __ } from "@wordpress/i18n";
import {
    __experimentalToolsPanelItem as ToolsPanelItem,
    Button,
    TextareaControl,
    __experimentalNumberControl as NumberControl
} from "@wordpress/components";
import { MagicWand } from "../../utils/icons";
import { useState } from "@wordpress/element";
import { generateText } from "../../utils/openai";

const Excerpt = ({ content }) => {
    const [excerpt, setExcerpt] = useState( '' );
    const [excerptLength, setExcerptLength] = useState( 55 );

    const generateExcerpt = () => {
        generateText( 'excerpt', content, excerptLength ).then((response) => {
            setExcerpt( response.choices[0].message.content.replaceAll('"', '') );
        });
    };

    return (
        <ToolsPanelItem
            hasValue={ () => !! excerpt }
            label={ __( 'Excerpt', 'bloggisitter' ) }
            isShownByDefault
        >
            <TextareaControl
                label={ __( 'Excerpt', 'bloggisitter' ) }
                rows={ 7 }
                value={ excerpt }
                onChange={ setExcerpt }
            />
            <p className="bloggisitter-excerpt-length">
                { 'Excerpt max length' }
                <NumberControl
                    isShiftStepEnabled={ true }
                    onChange={ setExcerptLength }
                    shiftStep={ 10 }
                    value={ excerptLength }
                />
                { 'words' }
            </p>
            <div className="bloggisitter-buttons">
                <Button
                    isPrimary
                    isSmall
                    icon={ MagicWand }
                    onClick={ generateExcerpt }
                >
                    { __( 'Generate', 'bloggisitter' ) }
                </Button>
                <Button
                    isSecondary
                    isSmall
                    onClick={ () => { navigator.clipboard.writeText( excerpt ) } }
                >
                    { __( 'Copy', 'bloggisitter' ) }
                </Button>
            </div>
        </ToolsPanelItem>
    )
}

export default Excerpt;
