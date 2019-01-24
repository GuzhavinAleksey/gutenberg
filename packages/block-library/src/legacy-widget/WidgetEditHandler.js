/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

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
		const { instance = {}, identifier } = this.props;
		if ( ! identifier ) {
			return;
		}
		apiFetch( {
			path: '/wp/v2/widget-updater/',
			data: {
				identifier,
				instance,
			},
			method: 'POST',
		} ).then(
			( response ) => {
				if ( this.isStillMounted ) {
					this.setState( {
						form: response.form,
						instance: response.instance,
						idBase: response.id_base,
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
		const { identifier } = this.props;
		const { form, idBase } = this.state;
		if ( ! identifier ) {
			return __( 'Not a valid widget.' );
		}
		if ( ! form ) {
			return null;
		}
		return (
			<WidgetEditDomManager
				idBase={ idBase }
				form={ form }
			/>
		);
	}
}

export default WidgetEditHandler;

