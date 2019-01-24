/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import {
	PanelBody,
	Placeholder,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
	BlockControls,
	BlockIcon,
	InspectorControls,
	ServerSideRender,
} from '@wordpress/editor';

import WidgetEditHandler from './WidgetEditHandler';

class LegacyWidgetEdit extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			isPreview: false,
		};
		this.switchToEdit = this.switchToEdit.bind( this );
		this.switchToPreview = this.switchToPreview.bind( this );
	}

	render() {
		const { attributes, availableLegacyWidgets, setAttributes } = this.props;
		const { isPreview } = this.state;
		const { instance } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Legacy Widget Settings' ) }>
					</PanelBody>
				</InspectorControls>
				{ ! instance && (
					<Placeholder
						icon={ <BlockIcon icon="admin-customizer" /> }
						label={ __( 'Legacy Widget' ) }
					>
						<SelectControl
							label={ __( 'Select a legacy widget to display:' ) }
							value={ attributes.identifier || 'none' }
							onChange={ ( value ) => setAttributes( {
								instance: {},
								identifier: value,
							} ) }
							options={ [ { value: 'none', label: 'Select widget' } ].concat(
								availableLegacyWidgets.map( ( { identifier, name } ) => {
									return {
										value: identifier,
										label: name,
									};
								} )
							) }
						/>
					</Placeholder>
				) }
				{ instance && (
					<BlockControls>
						<div className="components-toolbar">
							<button
								className={ `components-tab-button ${ ! isPreview ? 'is-active' : '' }` }
								onClick={ this.switchToEdit }
							>
								<span>{ __( 'Edit' ) }</span>
							</button>
							<button
								className={ `components-tab-button ${ isPreview ? 'is-active' : '' }` }
								onClick={ this.switchToPreview }
							>
								<span>{ __( 'Preview' ) }</span>
							</button>
						</div>
					</BlockControls>
				) }
				{ instance && ! isPreview && (
					<WidgetEditHandler
						identifier={ attributes.identifier }
						instance={ attributes.instance }
					/>
				) }
				{ instance && isPreview && (
					<ServerSideRender
						block="core/legacy-widget"
						attributes={ attributes }
					/>
				) }
			</Fragment>
		);
	}

	switchToEdit() {
		this.setState( { isPreview: false } );
	}

	switchToPreview() {
		this.setState( { isPreview: true } );
	}
}

export default withSelect( ( select ) => {
	const editorSettings = select( 'core/editor' ).getEditorSettings();
	const { availableLegacyWidgets } = editorSettings;
	return {
		availableLegacyWidgets,
	};
} )( LegacyWidgetEdit );
