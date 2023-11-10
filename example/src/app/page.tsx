'use client';
import { useState } from 'react';
import { Form } from '@rjsf/mui';
import { FormProps } from '@rjsf/core';

import {
  FormBuilder,
  IntlProvider,
} from '@AndriiPavlykivskyi/react-json-schema-form-builder';
import validator from '@rjsf/validator-ajv8';

import '@AndriiPavlykivskyi/react-json-schema-form-builder/dist/index.css';

export default function Home() {
  const [schema, setSchema] = useState('');
  const [uiSchema, setUiSchema] = useState('');
  return (
    <main className='mx-auto max-w-3xl'>
      <h1 className='text-2xl text-center font-bold my-4'>
        RJSF Builder Example of usage
      </h1>
      <IntlProvider language='uk'>
        <FormBuilder
          schema={schema}
          uischema={uiSchema}
          onChange={(schema, uiSchema) => {
            setSchema(schema);
            setUiSchema(uiSchema);
          }}
        />
      </IntlProvider>
      <hr className='border-slate-300 mt-5 pb-5' />
      <h2 className='text-2xl text-center font-bold mt-3'>RJSF Preview</h2>
      <Form
        schema={(schema ? JSON.parse(schema) : {} || {}) as FormProps['schema']}
        uiSchema={
          (uiSchema ? JSON.parse(uiSchema) : {} || {}) as FormProps['uiSchema']
        }
        validator={validator}
      />
    </main>
  );
}
