/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import {
	PanelBody,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	InspectorControls,
	ServerSideRender,
} from '@wordpress/editor';

export default function LegacyWidgetEdit( { attributes } ) {
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Legacy Widget Settings' ) }>
				</PanelBody>
			</InspectorControls>
			<ServerSideRender block="core/legacy-widget" attributes={ attributes } />
		</Fragment>
	);
}
