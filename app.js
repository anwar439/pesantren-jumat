// Ini adalah file entry point untuk cPanel Node.js Selector.
// File ini akan memanggil hasil build production server kita yang berada di prod_output/server.cjs.
process.env.NODE_ENV = 'production';
require('./prod_output/server.cjs');
