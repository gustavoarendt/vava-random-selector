import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { RadiantCard } from '../../components/RadiantCard/RadiantCard';
import { Radiant } from '../../models/Radiant';
import styles from './HomePage.module.scss';
import { Sorting } from '../../components/Sorting/Sorting';
import { RadiantRole } from '../../models/RadiantRole';
import { http } from '../../http/http';

export const HomePage = (): JSX.Element => {
  const [radiants, setRadiants] = React.useState<Radiant[]>([]);
  const [sortingList, setSortingList] = React.useState<Radiant[]>([]);
  const _endpoint = 'agents';

  const handleSortingUpdate = (uuid: string) => {
    setSortingList((prevState) => {
      if (!prevState.some((agent) => agent.uuid === uuid)) {
        const radiantToAdd = radiants.find((agent) => agent.uuid === uuid);
        if (radiantToAdd) return radiantToAdd && [...prevState, radiantToAdd];
      }
      const newState = prevState.filter((agent) => agent.uuid !== uuid);
      return newState;
    });
  };

  const handleSortingRoles = (role: RadiantRole) => {
    setSortingList((prevState) => {
      const newState = prevState.filter((agent) => agent.role === role);
      return newState;
    });
  };

  React.useEffect(() => {
    http
      .get(_endpoint)
      .then((response: any) => {
        const resp: Radiant[] = response.data.data;
        const filteredResp = resp
          .filter((agent) => agent.isPlayableCharacter)
          .sort((a, b) => a.displayName.localeCompare(b.displayName));
        setRadiants(filteredResp);
        setSortingList(filteredResp);
      })
      .catch((erro) => console.log(erro));
  }, []);

  return (
    <main className={styles.HomePage}>
      <h1>Projeto Rumo ao Ferro!</h1>
      <Sorting sortingList={sortingList} />
      <div
        className={classNames(
          styles.HomePage__Radiants,
          styles.HomePage__Container
        )}
      >
        {radiants &&
          radiants.map((radiant) => (
            <RadiantCard
              radiant={radiant}
              key={radiant.uuid}
              handleSortingUpdate={handleSortingUpdate}
              disabled={!sortingList.includes(radiant)}
            />
          ))}
      </div>
    </main>
  );
};
