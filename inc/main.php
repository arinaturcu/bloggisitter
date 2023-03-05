<?php
/**
 * Loader.
 *
 * @package ThemeIsle
 */

namespace ThemeIsle\Bloggisitter;

class Main {
	/**
	 * Singleton.
	 *
	 * @var Main Class object.
	 */
	protected static $instance = null;

	/**
	 * Method to define hooks needed.
	 *
	 * @since   1.0.0
	 * @access  public
	 */
	public function init(): void {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );
		add_action( 'init', array( $this, 'register_openAI_setting' ) );
	}

	public function register_openAI_setting(): void {
		register_setting(
			'bloggisitter_settings',
			'openai_key',
			[
				'type'         => 'string',
				'show_in_rest' => true,
				'default'      => '',
			]
		);
	}

	public function enqueue_block_editor_assets(): void {
		$asset_file = include BLOGGISITTER_PATH . '/build/editor-js.asset.php';
		$asset_file_css = include BLOGGISITTER_PATH . '/build/editor-css.asset.php';

		wp_register_script(
			'bloggisitter-script',
			BLOGGISITTER_URL . '/build/editor-js.js',
			array_merge( $asset_file['dependencies'], [  'wp-blocks', 'wp-element', 'wp-components', 'wp-i18n' ] ),
			$asset_file['version'],
			true
		);

		wp_localize_script( 'bloggisitter-script', 'bloggisitter', array(
			'postID' => get_the_ID(),
			'nonce'   => wp_create_nonce( 'wp_rest' ),
			'root'    => get_rest_url(),
		) );

		wp_enqueue_script( 'bloggisitter-script' );

		wp_enqueue_style(
			'bloggisitter-style',
			BLOGGISITTER_URL . 'build/editor-css.css',
			$asset_file_css['dependencies'],
			$asset_file_css['version']
		);
	}

	/**
	 * Singleton method.
	 *
	 * @static
	 *
	 * @return Main|null
	 * @since   1.0.0
	 * @access  public
	 */
	public static function instance(): ?Main {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
			self::$instance->init();
		}

		return self::$instance;
	}

	/**
	 * Throw error on object clone
	 *
	 * The whole idea of the singleton design pattern is that there is a single
	 * object therefore, we don't want the object to be cloned.
	 *
	 * @access  public
	 * @return  void
	 * @since   1.0.0
	 */
	public function __clone() {
		// Cloning instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, 'Cheatin&#8217; huh?', '1.0.0' );
	}

	/**
	 * Disable unserializing of the class
	 *
	 * @access  public
	 * @return  void
	 * @since   1.0.0
	 */
	public function __wakeup() {
		// Unserializing instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, 'Cheatin&#8217; huh?', '1.0.0' );
	}
}
