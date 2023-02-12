import React from 'react';
import { Radiant } from '../../models/Radiant';
import classNames from 'classnames';
import styles from './RadiantCard.module.scss';

interface RadiantCardProps {
  radiant: Radiant;
  onClick?: () => void;
  handleSortingUpdate?: (uuid: string) => void;
  disabled?: boolean;
}

export const RadiantCard = ({
  radiant,
  handleSortingUpdate,
  disabled = false,
}: RadiantCardProps): JSX.Element => {
  const handleDisabled = (uuid: string) => {
    handleSortingUpdate!(uuid);
  };

  return (
    <div
      className={classNames(
        styles.RadiantCard,
        disabled ? styles.RadiantCard__Disabled : ''
      )}
      onClick={() => handleDisabled(radiant.uuid)}
    >
      <img
        src={radiant.displayIcon ? radiant.displayIcon : ''}
        alt="Imagem do Personagem"
      />
      <p className={styles.RadiantCard__Name}>{radiant.displayName}</p>
    </div>
  );
};
