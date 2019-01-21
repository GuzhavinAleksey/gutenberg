<?php
/**
 * Server-side rendering of the `core/legacy-widget` block.
 *
 * @package WordPress
 */

/**
 * Renders the `core/legacy-widget` block on server.
 *
 * @see WP_Widget
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with the legacy widget added.
 */
function render_block_legacy_widget( $attributes ) {
	if ( ! isset( $attributes['class'] ) || ! isset( $attributes['instance'] ) ) {
		return '';
	}
	ob_start();
	the_widget( $attributes['class'], $attributes['instance'] );
	return ob_get_clean();
}

/**
 * Register legacy widget block.
 */
function register_block_core_legacy_widget() {
	register_block_type(
		'core/legacy-widget',
		array(
			'attributes'      => array(
				'class'             => array(
					'type' => 'string',
				),
				'instance'         => array(
					'type' => 'object',
				),
			),
			'render_callback' => 'render_block_legacy_widget',
		)
	);
}

add_action( 'init', 'register_block_core_legacy_widget' );
