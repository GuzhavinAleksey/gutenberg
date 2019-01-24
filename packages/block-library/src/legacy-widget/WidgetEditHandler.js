/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { withInstanceId } from '@wordpress/compose';
import { Button } from '@wordpress/components';

import WidgetEditDomManager from './WidgetEditDomManager';

class WidgetEditHandler extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			instance: {},
			form: null,
			idBase: null,
		};
	}

	componentDidMount() {
		this.isStillMounted = true;
		const { instance = {}, identifier, instanceId } = this.props;
		if ( ! identifier ) {
			return;
		}
		apiFetch( {
			path: '/wp/v2/widget-updater/',
			data: {
				identifier,
				instance,
				// use negative ids to make sure the id does not exist on the database.
				id_to_use: instanceId * -1,
			},
			method: 'POST',
		} ).then(
			( response ) => {
				if ( this.isStillMounted ) {
					this.setState( {
						form: response.form,
						instance: response.instance,
						idBase: response.id_base,
						id: response.id,
					} );
				}
			}
		).catch(
			() => {
				if ( this.isStillMounted ) {
					// TODO: handle error
				}
			}
		);
	}

	componentWillUnmount() {
		this.isStillMounted = false;
	}

	render() {
		const { instanceId, identifier } = this.props;
		const { id, idBase, form } = this.state;
		if ( ! identifier ) {
			return __( 'Not a valid widget.' );
		}
		if ( ! form ) {
			return null;
		}
		return (
			<Fragment>
				<WidgetEditDomManager
					ref={ ( ref ) => {
						this.widgetEditDomManagerRef = ref;
					} }
					widgetNumber={ instanceId * -1 }
					id={ id }
					idBase={ idBase }
					form={ form }
				/>
				<Button
					onClick={ () => {
						if ( this.widgetEditDomManagerRef ) {
							//window.alert( this.widgetEditDomManagerRef.retrieveUpdatedInstance() );
						}
					} }
				>
					{ __( 'Update' ) }
				</Button>
			</Fragment>
		);
	}
}

export default withInstanceId( WidgetEditHandler );

