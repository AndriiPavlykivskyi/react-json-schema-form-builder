import ts from 'rollup-plugin-ts';
import css from 'rollup-plugin-import-css';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: './src/index.ts',
  output: [
    {
      format: 'esm',
      file: 'dist/index.mjs',
    },
    {
      format: 'cjs',
      file: 'dist/index.js',
    },
  ],
  external: [
    'classnames',
    'react',
    'react-beautiful-dnd',
    'reactstrap',
    'react-jss',
    'react-select',
    '@fortawesome/free-solid-svg-icons',
    '@fortawesome/react-fontawesome',
    '@mui/material',
    '@emotion/react',
    '@emotion/styled',
    'i18next',
    'react-i18next',
  ],
  plugins: [ts(), css({ output: 'index.css' })],
};
