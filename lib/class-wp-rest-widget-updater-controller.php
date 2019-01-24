<?php
/**
 * Widget Updater REST API: WP_REST_Widget_Updater_Controller class
 *
 * @package gutenberg
 * @since 4.9.0
 */

/**
 * Controller which provides REST endpoint for updating a widget.
 *
 * @since 2.8.0
 *
 * @see WP_REST_Controller
 */
class WP_REST_Widget_Updater_Controller extends WP_REST_Controller {

	/**
	 * Constructs the controller.
	 *
	 * @access public
	 */
	public function __construct() {
		$this->namespace = 'wp/v2';
		$this->rest_base = 'widget-updater';
	}

	/**
	 * Registers the necessary REST API route.
	 *
	 * @access public
	 */
	public function register_routes() {
			register_rest_route(
				$this->namespace,
				'/' . $this->rest_base . '/',
				array(
					'args' => array(
						'name' => array(
							'description' => __( 'Unique registered name for the block.', 'gutenberg' ),
							'type'        => 'string',
						),
					),
					array(
						'methods'  => WP_REST_Server::EDITABLE,
						'callback' => array( $this, 'compute_new_widget' ),
					),
				)
			);
	}

	/**
	 * Returns the new widget instance and the form that represents it.
	 *
	 * @since 2.8.0
	 * @access public
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
	 */
	public function compute_new_widget( $request ) {
		$json_request = $request->get_json_params();
		if ( ! isset( $json_request['identifier'] ) ) {
			return;
		}
		$widget = $json_request['identifier'];
		global $wp_widget_factory;

		if ( ! isset( $wp_widget_factory->widgets[ $widget ] ) ) {
			return;
		}

		$widget_obj = $wp_widget_factory->widgets[ $widget ];
		if ( ! ( $widget_obj instanceof WP_Widget ) ) {
			return;
		}

		$instance = isset( $json_request['instance'] ) ? $json_request['instance'] : array();

		$id_to_use = isset( $json_request['id_to_use'] ) ? $json_request['id_to_use'] : -1;

		$widget_obj->_set( $id_to_use );
		ob_start();

		if ( isset( $json_request['instance_changes'] ) ) {
			$instance = $widget_obj->update( $json_request['instance_changes'], $instance );
			// TODO: apply required filters.
		}

		$widget_obj->form( $instance );
		// TODO: apply required filters.

		$id_base = $widget_obj->id_base;
		$id = $widget_obj->id;
		$form = ob_get_clean();

		return rest_ensure_response(
			array(
				'instance' => $instance,
				'form'     => $form,
				'id_base'  => $id_base,
				'id'       => $id,
			)
		);
	}
}
