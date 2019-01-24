/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import {
	Button,
	IconButton,
	PanelBody,
	Placeholder,
	SelectControl,
	Toolbar,
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
		this.changeWidget = this.changeWidget.bind( this );
	}

	render() {
		const { attributes, availableLegacyWidgets, setAttributes } = this.props;
		const { isPreview } = this.state;
		const { identifier } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Legacy Widget Settings' ) }>
					</PanelBody>
				</InspectorControls>
				{ ! identifier && (
					<Placeholder
						icon={ <BlockIcon icon="admin-customizer" /> }
						label={ __( 'Legacy Widget' ) }
					>
						<SelectControl
							label={ __( 'Select a legacy widget to display:' ) }
							value={ identifier || 'none' }
							onChange={ ( value ) => setAttributes( {
								instance: {},
								identifier: value,
							} ) }
							options={ [ { value: 'none', label: 'Select widget' } ].concat(
								availableLegacyWidgets.map( ( widget ) => {
									return {
										value: widget.identifier,
										label: widget.name,
									};
								} )
							) }
						/>
					</Placeholder>
				) }
				{ identifier && (
					<BlockControls>
						<Toolbar>
							<IconButton
								className="components-icon-button components-toolbar__control"
								label={ __( 'Change widget' ) }
								onClick={ this.changeWidget }
								icon="edit"
							/>
							<Button
								className={ `components-tab-button ${ ! isPreview ? 'is-active' : '' }` }
								onClick={ this.switchToEdit }
							>
								<span>{ __( 'Edit' ) }</span>
							</Button>
							<Button
								className={ `components-tab-button ${ isPreview ? 'is-active' : '' }` }
								onClick={ this.switchToPreview }
							>
								<span>{ __( 'Preview' ) }</span>
							</Button>
						</Toolbar>
					</BlockControls>
				) }
				{ identifier && ! isPreview && (
					<WidgetEditHandler
						identifier={ attributes.identifier }
						instance={ attributes.instance }
					/>
				) }
				{ identifier && isPreview && (
					<ServerSideRender
						block="core/legacy-widget"
						attributes={ attributes }
					/>
				) }
			</Fragment>
		);
	}

	changeWidget() {
		this.switchToEdit();
		this.props.setAttributes( {
			instance: {},
			identifier: undefined,
		} );
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
