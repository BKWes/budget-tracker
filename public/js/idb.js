let db;

const request = indexedDB.open('budget', 1);

request.onupgradeneeded = function (e) {
    const db = e.target.result;
    db.createObjectStore('new_transaction', { autoIncrement: true });
};