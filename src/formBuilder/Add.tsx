import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Popover,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { createUseStyles } from 'react-jss';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import FontAwesomeIcon from './FontAwesomeIcon';
import FBRadioGroup from './radio/FBRadioGroup';
import type { ModLabels } from './types';

const useStyles = createUseStyles({
  addDetails: {
    '& .popover': {
      width: '300px',
      'z-index': '1051 !important',
      '& .popover-inner': {
        border: '1px solid #1d71ad',
        borderRadius: '4px',
        '& .popover-header': { borderBottom: '1px solid #1d71ad' },
        '& .action-buttons': {
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '.5em',
        },
      },
    },
  },
});

export default function Add({
  addElem,
  hidden,
  tooltipDescription,
  labels,
}: {
  addElem: (choice: string) => void;
  hidden?: boolean;
  tooltipDescription?: string;
  labels?: ModLabels;
}) {
  const classes = useStyles();
  const [createChoice, setCreateChoice] = useState('card');
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <div style={{ display: hidden ? 'none' : 'initial' }}>
        <Tooltip
          placement='top'
          title={tooltipDescription || 'Create new form element'}
        >
          <IconButton onClick={handleOpen}>
            <FontAwesomeIcon icon={faPlusSquare} />
          </IconButton>
        </Tooltip>
      </div>
      <Popover
        open={open}
        id={id}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        className={`add-details ${classes.addDetails}`}
      >
        <Box p={1}>
          <Stack spacing={1}>
            <Typography variant='h5'>Create New</Typography>
            <FBRadioGroup
              className='choose-create'
              defaultValue={createChoice}
              horizontal={false}
              options={[
                {
                  value: 'card',
                  label: labels?.addElementLabel ?? 'Form element',
                },
                {
                  value: 'section',
                  label: labels?.addSectionLabel ?? 'Form section',
                },
              ]}
              onChange={(selection) => {
                setCreateChoice(selection);
              }}
            />
            <div className='action-buttons'>
              <Button onClick={() => setAnchorEl(null)} color='secondary'>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  addElem(createChoice);
                  setAnchorEl(null);
                }}
                color='primary'
              >
                Create
              </Button>
            </div>
          </Stack>
        </Box>
      </Popover>
    </>
  );
}
