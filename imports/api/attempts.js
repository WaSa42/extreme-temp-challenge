import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Attempts = new Mongo.Collection('attempts');
export const TabularTables = {};

TabularTables.Attempts = new Tabular.Table({
    name: 'HottestAttempts',
    collection: Attempts,
    columns: columns = [{
        data: 'user',
        title: 'Player'
    }, {
        data: 'temperature',
        title: 'Temperature° C'
    }],
    order: [[1, "desc"]],
    responsive: true,
    autoWidth: false
});
