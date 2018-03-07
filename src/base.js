import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAhyNMB8mU67jJJYGFsGcrErE4wOQP3xRg',
  authDomain: 'catch-of-the-day-21.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-21.firebaseio.com',
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
