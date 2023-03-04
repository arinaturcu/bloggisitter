<?php
/*
Plugin Name: Bloggisitter
Plugin URI:
Description: Plugin to accompany tutsplus guide to creating plugins, registers a post type.
Version: 1.0
Author: Andreea Radacina, Arina Turcu
License: GPLv2 or later
*/

use ThemeIsle\Bloggisitter\Main;

define( 'BLOGGISITTER_PATH', dirname( __FILE__ ) );
define( 'BLOGGISITTER_URL', plugins_url( '/', __FILE__ ) );

$vendor_file = BLOGGISITTER_PATH . '/vendor/autoload.php';

if ( is_readable( $vendor_file ) ) {
	require_once $vendor_file;
}

if ( class_exists( '\ThemeIsle\Bloggisitter\Main' ) ) {
	Main::instance();
}
