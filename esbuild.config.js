const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  outdir: './dist'
})