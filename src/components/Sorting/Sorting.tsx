import React from 'react';
import classNames from 'classnames';
import { Radiant } from '../../models/Radiant';
import { RadiantCard } from '../RadiantCard/RadiantCard';
import randomchar from '../../assets/randomchar.png';
import styles from './Sorting.module.scss';
import { SimpleButton } from '../SimpleButton/SimpleButton';

export interface SortingProps {
  sortingList: Radiant[];
}

export const Sorting = ({ sortingList }: SortingProps): JSX.Element => {
  const [selectedItem, setSelectedItem] = React.useState<Radiant>();
  const [clicked, setClicked] = React.useState(false);

  const handleRandomClick = () => {
    const index = Math.floor(Math.random() * sortingList.length);
    setSelectedItem(sortingList[index]);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 100);
  };

  return (
    <div className={styles.Sorting}>
      <SimpleButton onClick={handleRandomClick} clicked={clicked}>
        Random
      </SimpleButton>
      {selectedItem ? (
        <img className={styles.Sorting__Image} src={selectedItem.displayIcon} />
      ) : (
        <img className={styles.Sorting__Image} src={randomchar} />
      )}
    </div>
  );
};
