import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import {
  faArrowUp,
  faArrowDown,
  faPencilAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import FBCheckbox from './checkbox/FBCheckbox';
import Collapse from './Collapse/Collapse';
import CardModal from './CardModal';
import CardGeneralParameterInputs from './CardGeneralParameterInputs';
import Add from './Add';
import FontAwesomeIcon from './FontAwesomeIcon';
import { Tooltip } from '@mui/material';
import type { CardPropsType, CardComponentPropsType } from './types';

const useStyles = createUseStyles({
  cardEntries: {
    'border-bottom': '1px solid gray',
    margin: '.5em 1.5em 0 1.5em',
    '& h5': {
      color: 'black',
      'font-size': '14px',
      'font-weight': 'bold',
    },
    '& .card-entry-row': {
      display: 'flex',
    },
    '& .card-entry': {
      margin: 0,
      width: '50%',
      'text-align': 'left',
      padding: '0.5em',
      '&.wide-card-entry': {
        width: '100%',
      },
    },
    '& input': {
      border: '1px solid gray',
      'border-radius': '4px',
    },
    '& .card-category-options': {
      padding: '.5em',
    },
    '& .card-select': {
      border: '1px solid gray',
      'border-radius': '4px',
    },
    '& .card-array': {
      '& .fa-plus-square, & .fa-square-plus': { display: 'none' },
      '& .section-entries': {
        '& .fa-plus-square, & .fa-square-plus': { display: 'initial' },
      },
    },
    '& .card-enum': {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      backgroundColor: 'lightGray',
      textAlign: 'left',
      padding: '1em',
      '& h3': { fontSize: '16px', margin: '0 0 .5em 0' },
      '& label': { color: 'black', fontSize: '14px' },
      '& .card-enum-header': {
        marginTop: '0.5em',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        '& h5': { width: '50%', fontWeight: 'bold', fontSize: '14px' },
      },
      '& .fa': { cursor: 'pointer' },
    },
  },
  cardInteractions: {
    margin: '.5em 1.5em',
    textAlign: 'left',
    '& .fa': {
      marginRight: '1em',
      borderRadius: '4px',
      padding: '.25em',
      height: '25px',
      width: '25px',
    },
    '& .fa-arrow-up, .fa-arrow-down': { marginRight: '.5em' },
    '& .fa-trash': { border: '1px solid #DE5354', color: '#DE5354' },
    '& .fb-checkbox': { display: 'inline-block' },
    '& .interactions-left, & .interactions-right': {
      display: 'inline-block',
      width: '48%',
      margin: '0 auto',
    },
    '& .interactions-left': { textAlign: 'left' },
    '& .interactions-right': { textAlign: 'right' },
  },
});

export default function Card({
  componentProps,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  TypeSpecificParameters,
  addElem,
  cardOpen,
  setCardOpen,
  allFormInputs,
  mods,
  showObjectNameInput = true,
  addProperties,
}: CardPropsType): ReactElement {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const elementId = React.useId();

  return (
    <React.Fragment>
      <Collapse
        isOpen={cardOpen}
        toggleCollapse={() => setCardOpen(!cardOpen)}
        title={
          <React.Fragment>
            <Tooltip
              title={
                componentProps.parent
                  ? `Depends on ${componentProps.parent}`
                  : `Is an instance of pre-configured component ${componentProps.$ref}`
              }
            >
              <span onClick={() => setCardOpen(!cardOpen)} className='label'>
                {componentProps.title || componentProps.name}{' '}
              </span>
            </Tooltip>
            <span className='arrows'>
              <Tooltip placement='top' title={`Move form element up`}>
                <span>
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    onClick={() => (onMoveUp ? onMoveUp() : {})}
                  />
                </span>
              </Tooltip>
              <Tooltip placement='top' title={`Move form element down`}>
                <span>
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    onClick={() => (onMoveDown ? onMoveDown() : {})}
                  />
                </span>
              </Tooltip>
            </span>
          </React.Fragment>
        }
        className={`card-container ${
          componentProps.dependent ? 'card-dependent' : ''
        } ${componentProps.$ref === undefined ? '' : 'card-reference'}`}
      >
        <div className={classes.cardEntries}>
          <CardGeneralParameterInputs
            parameters={componentProps}
            onChange={onChange}
            allFormInputs={allFormInputs}
            mods={mods}
            showObjectNameInput={showObjectNameInput}
          />
        </div>
        <div className={classes.cardInteractions}>
          <Tooltip
            placement='top'
            title={`Additional configurations for this form element`}
          >
            <span>
              <FontAwesomeIcon
                icon={faPencilAlt}
                onClick={() => setModalOpen(true)}
              />
            </span>
          </Tooltip>
          <Tooltip placement='top' title={`Delete form element`}>
            <span>
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => onDelete && onDelete()}
              />
            </span>
          </Tooltip>
          <FBCheckbox
            onChangeValue={() =>
              onChange({
                ...componentProps,
                required: !componentProps.required,
              })
            }
            isChecked={!!componentProps.required}
            label='Required'
            id={`${elementId}required`}
          />
        </div>
        <CardModal
          componentProps={componentProps as CardComponentPropsType}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onChange={(newComponentProps: CardComponentPropsType) => {
            onChange(newComponentProps);
          }}
          TypeSpecificParameters={TypeSpecificParameters}
        />
      </Collapse>
      {mods?.components?.add && mods?.components?.add(addProperties)}
      {!mods?.components?.add && addElem && (
        <Add
          tooltipDescription={((mods || {}).tooltipDescriptions || {}).add}
          addElem={(choice: string) => addElem(choice)}
        />
      )}
    </React.Fragment>
  );
}
