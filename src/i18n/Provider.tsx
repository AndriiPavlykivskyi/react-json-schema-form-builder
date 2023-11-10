import { InitOptions } from 'i18next';
import React, { Fragment, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

interface IntlProviderProps extends PropsWithChildren {
  /**
   * Language of FormBuilder's interface
   * @default uk
   */
  language?: string;
  /**
   * Additional i18n resources for translations
   */
  resources?: InitOptions['resources'];
}

/**
 * Use this component to wrap FormBuilder to set language of interface
 */
const IntlProvider = ({
  language = 'uk',
  resources,
  children,
}: IntlProviderProps) => {
  const { i18n } = useTranslation();
  if (resources) {
    Object.entries(resources).forEach(([lang, resource]) => {
      if (lang && resource) i18n.addResourceBundle(lang, '', resource, true);
    });
  }
  if (language) {
    if (i18n.language !== language && i18n.languages.includes(language)) {
      i18n.changeLanguage(language);
    }
  }
  return <Fragment>{children}</Fragment>;
};

export default IntlProvider;
