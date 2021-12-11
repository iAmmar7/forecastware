import * as SQLite from 'expo-sqlite';

import { dbName } from '../utils/constants';

const db = SQLite.openDatabase('forecastware.db');

export const init = () => {
  createTable()
    //   dropTable()
    .then(() => console.log('Database initialized'))
    .catch((err) => console.log('Failed to initialized the db', err));
};

export const createTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${dbName} (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, lat REAL NOT NULL, lon REAL NOT NULL, data TEXT NOT NULL, isCurrent BOOL NOT NULL);`,
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
        `DROP TABLE ${dbName};`,
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
  const { name, lat, lon, ...data } = location;
  const strigifiedData = JSON.stringify(data);

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${dbName} (name, lat, lon, data, isCurrent) VALUES (?, ?, ?, ?, ?);`,
        [name, lat, lon, strigifiedData, isCurrent],
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
        `SELECT * FROM ${dbName}`,
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
