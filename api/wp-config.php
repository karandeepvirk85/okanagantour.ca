<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'oktour' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '>In9X~z1s}Y~,k}x#r#JxBw{bj8&Y.Z:f&!gLIgk]Z[FKy:K2c;fEDpNiJ2([Ng~' );
define( 'SECURE_AUTH_KEY',  'R+Zh[$Fl{xceM44BHD^p{O=v4oZ/.iWFs&H[.v]>k7DF.iSPs]bnthAXG_;gx+8)' );
define( 'LOGGED_IN_KEY',    's&Zb9Oh[1VlpsjZ)Gxd!YF(r;SzXv/=o-ctOkS p5BHB70Y2LN=>rr{:<X:r1N/i' );
define( 'NONCE_KEY',        'Z.B646KRi@ep(Cp+MM|9Kk);8|l+y(Yv{WM?=0`5!~:[&1E?/nu(g6w82aihRdp*' );
define( 'AUTH_SALT',        'yKPVE%AFb8?4gO2+#h9Ma9BeYotPkZVbY9|vOmzKAj)xPT@Nag_4O]Kkx}7O?AX}' );
define( 'SECURE_AUTH_SALT', 'TwUp/X|VmA21n5^/38i}_)}Gyy])L@6:P|N_1.kf/[d%jEwtZlYCqVgz/RlJ@NMP' );
define( 'LOGGED_IN_SALT',   'MF>YJd?U.sP r K2_[g1)&T7Gf6roI.(FcBF1dEwvZJWVDlDIz9/+G &hS@-:j(}' );
define( 'NONCE_SALT',       '&,`Cy{{Xk{38V,VAZe`m(@^Z&,QAum]GA_L7+PX?|2p]X<(w5$@+iR+yq|)rX1[9' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', true );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
