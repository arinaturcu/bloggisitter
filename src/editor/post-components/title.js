import { __ } from "@wordpress/i18n";
import {
    __experimentalToolsPanelItem as ToolsPanelItem,
    Button,
    TextareaControl
} from "@wordpress/components";
import { MagicWand } from "../../utils/icons";
import { useState } from "@wordpress/element";
import { generateText } from "../../utils/openai";

const Title = ({ content }) => {
    const [title, setTitle] = useState( '' );

    const generateTitle = () => {
        generateText( 'title', content ).then((response) => {
            setTitle( response.choices[0].message.content.replaceAll('"', '') );
        });
    };

    return (
        <ToolsPanelItem
            hasValue={ () => !! title }
            label={ __( 'Title', 'bloggisitter' ) }
            isShownByDefault
            className="is-first"
        >
            <TextareaControl
                label={ __( 'Title', 'bloggisitter' ) }
                rows={ 3 }
                value={ title }
                onChange={ setTitle }
            />
            <div className="bloggisitter-buttons">
                <Button
                    isPrimary
                    isSmall
                    icon={ MagicWand }
                    onClick={ generateTitle }
                >
                    { __( 'Generate', 'bloggisitter' ) }
                </Button>
                <Button
                    isSecondary
                    isSmall
                    onClick={ () => { navigator.clipboard.writeText( title ) } }
                >
                    { __( 'Copy', 'bloggisitter' ) }
                </Button>
            </div>
        </ToolsPanelItem>
    )
}

export default Title;
