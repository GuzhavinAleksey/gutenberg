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

function render_static_form( $attributes ) {
	ob_start();
	?>
<div id="widget-33_media_gallery-2" class="widget open">	<div class="widget-top">
	<div class="widget-title-action">
		<button type="button" class="widget-action hide-if-no-js" aria-expanded="false">
			<span class="screen-reader-text edit">Edit widget: Gallery</span>
			<span class="screen-reader-text add">Add widget: Gallery</span>
			<span class="toggle-indicator" aria-hidden="true"></span>
		</button>
		<a class="widget-control-edit hide-if-js" href="/wp-admin/widgets.php?editwidget=media_gallery-2&amp;sidebar=sidebar-1&amp;key=5">
			<span class="edit">Edit</span>
			<span class="add">Add</span>
			<span class="screen-reader-text">Gallery</span>
		</a>
	</div>
	<div class="widget-title ui-sortable-handle"><h3>Gallery<span class="in-widget-title">: wfdsfds3hkjh</span></h3></div>
	</div>

	<div class="widget-inside">
	<form method="post">	<div class="widget-content">				<input type="hidden" data-property="title" class="media-widget-instance-property" name="widget-media_gallery[2][title]" id="widget-media_gallery-2-title" value="wfdsfds3hkjh">
						<input type="hidden" data-property="ids" class="media-widget-instance-property" name="widget-media_gallery[2][ids]" id="widget-media_gallery-2-ids" value="21387,20701">
						<input type="hidden" data-property="columns" class="media-widget-instance-property" name="widget-media_gallery[2][columns]" id="widget-media_gallery-2-columns" value="3">
						<input type="hidden" data-property="size" class="media-widget-instance-property" name="widget-media_gallery[2][size]" id="widget-media_gallery-2-size" value="thumbnail">
						<input type="hidden" data-property="link_type" class="media-widget-instance-property" name="widget-media_gallery[2][link_type]" id="widget-media_gallery-2-link_type" value="post">
						<input type="hidden" data-property="orderby_random" class="media-widget-instance-property" name="widget-media_gallery[2][orderby_random]" id="widget-media_gallery-2-orderby_random" value="">
				</div>	<input type="hidden" name="widget-id" class="widget-id" value="media_gallery-2">
	<input type="hidden" name="id_base" class="id_base" value="media_gallery">
	<input type="hidden" name="widget-width" class="widget-width" value="250">
	<input type="hidden" name="widget-height" class="widget-height" value="200">
	<input type="hidden" name="widget_number" class="widget_number" value="2">
	<input type="hidden" name="multi_number" class="multi_number" value="">
	<input type="hidden" name="add_new" class="add_new" value="">

	<div class="widget-control-actions">
		<div class="alignleft">
			<button type="button" class="button-link button-link-delete widget-control-remove">Delete</button>
			<span class="widget-control-close-wrapper">
				|
				<button type="button" class="button-link widget-control-close">Done</button>
			</span>
		</div>
		<div class="alignright">
			<input type="submit" name="savewidget" id="widget-media_gallery-2-savewidget" class="button button-primary widget-control-save right" value="Save">			<span class="spinner"></span>
		</div>
		<br class="clear">
	</div>
	</form>	</div>

	<div class="widget-description">
	Displays an image gallery.
	</div>
	</div>
<?php
	return ob_get_clean();
}

function render_widget_form( $attributes ) {
	if ( ! isset( $attributes['class'] ) || ! isset( $attributes['instance'] ) ) {
		return '';
	}

	$widget = $attributes['class'];
	$instance = $attributes['instance'];

	global $wp_widget_factory;

	if ( ! isset( $wp_widget_factory->widgets[ $widget ] ) ) {
		return 'error';
	}

	$widget_obj = $wp_widget_factory->widgets[ $widget ];
	if ( ! ( $widget_obj instanceof WP_Widget ) ) {
		return 'error';
	}

	$widget_obj->_set( -1 );
	ob_start();

	$before_form = '<form method="post">';
	$after_form = '</form>';
	$before_widget_content = '<div class="widget-content">';
	$after_widget_content = '</div>';
	?>
	<div class="widget-top">
	<div class="widget-title-action">
		<button type="button" class="widget-action hide-if-no-js" aria-expanded="false">
			<span class="screen-reader-text"><?php printf( __( 'Edit widget: %s' ), 'FILLXYZ' ); ?></span>
			<span class="toggle-indicator" aria-hidden="true"></span>
		</button>
		<a class="widget-control-edit hide-if-js" href="FILLXYZ">
			<span class="edit"><?php _ex( 'Edit', 'widget' ); ?></span>
			<span class="add"><?php _ex( 'Add', 'widget' ); ?></span>
			<span class="screen-reader-text">FILLXYZ</span>
		</a>
	</div>
	<div class="widget-title"><h3>FILLXYZ<span class="in-widget-title"></span></h3></div>
	</div>

	<div class="widget-inside">
	<?php echo $before_form; ?>
	<?php echo $before_widget_content; ?>
	<?php $widget_obj->form( $instance ); ?>
	<?php echo $after_widget_content; ?>
	<input type="hidden" name="widget-id" class="widget-id" value="FILLXYZ" />

	<div class="widget-control-actions">
		<div class="alignleft">
			<button type="button" class="button-link button-link-delete widget-control-remove"><?php _e( 'Delete' ); ?></button>
			<span class="widget-control-close-wrapper">
				|
				<button type="button" class="button-link widget-control-close"><?php _e( 'Done' ); ?></button>
			</span>
		</div>
		<div class="alignright">
			<span class="spinner"></span>
		</div>
		<br class="clear" />
	</div>
	</div>

	<div class="widget-description">
	FILLXYZ
	</div>
<?php
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
