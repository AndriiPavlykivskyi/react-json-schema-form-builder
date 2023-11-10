/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import {
  faAsterisk,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import FontAwesomeIcon from './FontAwesomeIcon';
import { Tooltip } from '@mui/material';

const typeMap = {
  alert: faAsterisk,
  help: faQuestionCircle,
};

const useStyles = createUseStyles({
  toolTip: {
    color: 'white',
    '& > span': {
      color: 'black',
    },
  },
});

export default function IconTooltip({
  text,
  type,
}: {
  text: string;
  id?: string;
  type: 'alert' | 'help';
}): ReactElement {
  const classes = useStyles();

  return (
    <Tooltip className={classes.toolTip} placement='top' title={text}>
      <span style={{ textDecoration: 'underline' }}>
        <FontAwesomeIcon icon={typeMap[type]} />
      </span>
    </Tooltip>
  );
}
