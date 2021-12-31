import * as SQLite from 'expo-sqlite';

import { DB_NAME } from '../utils/constants';
import { isEmpty, isArray } from '../utils/helpers';

const db = SQLite.openDatabase('forecastware.db');

export const init = () => {
  createTable()
    // dropTable()
    .then(() => console.log('Database initialized'))
    .catch((err) => console.log('Failed to initialized the db', err));
};

export const createTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${DB_NAME} (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL UNIQUE, lat REAL NOT NULL, lon REAL NOT NULL, data TEXT NOT NULL, isCurrent BOOL NOT NULL, unit TEXT NOT NULL);`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const dropTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE ${DB_NAME};`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const insertLocation = (location, isCurrent) => {
  const { name, lat, lon, unit, ...data } = location;
  const strigifiedData = JSON.stringify(data);

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${DB_NAME} (name, lat, lon, data, isCurrent, unit) VALUES (?, ?, ?, ?, ?, ?);`,
        [name, lat, lon, strigifiedData, isCurrent, unit],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const updateLocation = (location) => {
  const { id, name, lat, lon, isCurrent, unit, ...data } = location;
  const strigifiedData = JSON.stringify(data);

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${DB_NAME} SET name = ?, lat = ?, lon = ?, data = ?, isCurrent = ?, unit = ? WHERE id = ?;`,
        [name, lat, lon, strigifiedData, isCurrent, unit, id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const updateCurrentLocation = (location) => {
  const { name, lat, lon, unit, ...data } = location;
  const strigifiedData = JSON.stringify(data);

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${DB_NAME} SET name = ?, lat = ?, lon = ?, data = ?, isCurrent = ?, unit = ? WHERE isCurrent = ?;`,
        [name, lat, lon, strigifiedData, true, unit, 1],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const deleteLocation = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM ${DB_NAME} WHERE id = ?`,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const fetchAllLocations = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${DB_NAME}`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const fetchCurrentLocations = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${DB_NAME} WHERE isCurrent = 1`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const deleteMultipleLocations = (ids) => {
  if (!isArray(ids) || isEmpty(ids))
    return Promise.reject(new Error('IDs should be an array and it can not be empty'));
  const stringifiedIds = ids.map(() => '?').join(',');
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM ${DB_NAME} WHERE id IN (${stringifiedIds})`,
        ids,
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
