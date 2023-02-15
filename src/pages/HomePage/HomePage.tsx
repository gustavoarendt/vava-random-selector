import React from 'react';
import classNames from 'classnames';
import { RadiantCard } from '../../components/RadiantCard/RadiantCard';
import { Radiant } from '../../models/Radiant';
import styles from './HomePage.module.scss';
import { Sorting } from '../../components/Sorting/Sorting';
import { RadiantRole } from '../../models/RadiantRole';
import { http } from '../../http/http';
import { SimpleButton } from '../../components/SimpleButton/SimpleButton';
import { Map } from '../../models/Map';
import { COMPOSITION_MAPS } from '../../helpers/composition';

export const HomePage = (): JSX.Element => {
  const [radiants, setRadiants] = React.useState<Radiant[]>([]);
  const [sortingList, setSortingList] = React.useState<Radiant[]>([]);
  const [maps, setMaps] = React.useState<Map[]>([]);
  const [selectedMap, setSelectedMap] = React.useState<Map>();
  const [recomendedAgents, setRecomendedAgents] = React.useState<Radiant[]>([]);
  const _agents = 'agents';
  const _maps = 'maps';

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

  const handleSelectAll = () => {
    setSortingList(radiants);
  };

  const handleSelectNone = () => {
    setSortingList([]);
  };

  const handleSortingRoles = (role: RadiantRole) => {
    setSortingList(radiants.filter((agent) => agent.role?.uuid === role.uuid));
  };

  const handleSortingMaps = (map: Map) => {
    setRecomendedAgents(
      radiants.filter((agent) =>
        COMPOSITION_MAPS[map.displayName].includes(agent.displayName)
      )
    );
  };

  const handleMapSelection = (map: Map) => {
    setSelectedMap(map);
    handleSortingMaps(map);
  };

  const findRoles = (radiants: Radiant[]): RadiantRole[] => {
    const roles: RadiantRole[] = [];
    radiants.forEach((radiant) => {
      if (
        !roles.some((role) => role.uuid === radiant.role?.uuid) &&
        radiant.role
      ) {
        roles.push(radiant.role);
      }
    });
    return roles;
  };

  const roles = findRoles(radiants);

  React.useEffect(() => {
    http
      .get(_agents)
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

  React.useEffect(() => {
    http
      .get(_maps)
      .then((response: any) => {
        const resp: Map[] = response.data.data;
        const filteredResp = resp.sort((a, b) =>
          a.displayName.localeCompare(b.displayName)
        );
        filteredResp.pop();
        setMaps(filteredResp);
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
      <div className={styles.HomePage__Filters}>
        <SimpleButton onClick={handleSelectAll}>Todos</SimpleButton>
        <SimpleButton onClick={handleSelectNone}>Nenhum</SimpleButton>
        {roles &&
          roles.map((role) => (
            <SimpleButton
              key={role.uuid}
              onClick={() => handleSortingRoles(role)}
            >
              {role.displayName}
            </SimpleButton>
          ))}
      </div>
      <section className={styles.HomePage__Maps}>
        <h2>Mapas</h2>
        <div className={styles.HomePage__Filters}>
          {maps &&
            maps.map((map) => (
              <>
                <SimpleButton
                  key={map.uuid}
                  onClick={() => handleMapSelection(map)}
                >
                  {map.displayName}
                </SimpleButton>
              </>
            ))}
        </div>
        {selectedMap && (
          <div className={styles.HomePage__SelectedMap}>
            <div className={styles.HomePage__RecomendedAgents}>
              {recomendedAgents.map((agent) => (
                <RadiantCard radiant={agent} key={agent.uuid} />
              ))}
            </div>
            <h2>{selectedMap.displayName}</h2>
            <img src={selectedMap.listViewIcon} alt="Mapa Foto" />
            <img src={selectedMap.displayIcon} alt="Mapa selecionado" />
          </div>
        )}
      </section>
    </main>
  );
};
