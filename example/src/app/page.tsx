'use client';
import { useState } from 'react';

import { FormBuilder } from '@ginkgo-bioworks/react-json-schema-form-builder';
import '@ginkgo-bioworks/react-json-schema-form-builder/dist/index.css';

export default function Home() {
  const [schema, setSchema] = useState('');
  const [uiSchema, setUiSchema] = useState('');
  return (
    <main>
      <h1 className='text-2xl text-center font-bold my-4'>
        RJSF Builder Example of usage
      </h1>
      <FormBuilder
        schema={schema}
        uischema={uiSchema}
        onChange={(schema, uiSchema) => {
          setSchema(schema);
          setUiSchema(uiSchema);
        }}
      />
    </main>
  );
}
