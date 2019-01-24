/**
 * WordPress dependencies
 */
import { Component, createRef } from '@wordpress/element';

class WidgetEditDomManager extends Component {
	constructor() {
		super( ...arguments );

		this.containerRef = createRef();
	}

	componentDidMount() {
		window.$( window.document ).trigger(
			'widget-added',
			[ window.$( this.containerRef.current ) ]
		);
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		const { idBase } = this.props;
		return (
			<div className="widget open" ref={ this.containerRef }>
				<div className="widget-inside">
					<form method="post">
						<div className="widget-content" dangerouslySetInnerHTML={ { __html: this.props.form } }>
						</div>
						<input type="hidden" name="widget-id" className="widget-id" value={ `${ idBase }--1` } />
						<input type="hidden" name="id_base" className="id_base" value={ idBase } />
						<input type="hidden" name="widget_number" className="widget_number" value="-1" />
						<input type="hidden" name="multi_number" className="multi_number" value="" />
						<input type="hidden" name="add_new" className="add_new" value="" />
					</form>
				</div>
			</div>
		);
	}
}

export default WidgetEditDomManager;

