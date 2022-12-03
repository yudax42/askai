import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'lib/index.ts',
  plugins: [
    typescript({ tsconfig: 'tsconfig.json' }),
  ],
  output: {
    dir: 'dist',
    exports: 'named',
    format: 'es',
    preserveModules: true,
  },
};
