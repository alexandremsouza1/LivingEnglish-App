import Firebase from 'firebase/app'
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore' // eslint-disable-line
import firebaseConfig from '../../firebase.conf'

export default ({ Vue }) => {
  // Initialize Firebase from settings
  Firebase.initializeApp(firebaseConfig)
  // Initialize Firebase
  if (!Firebase.apps.length) {
    Firebase.initializeApp(firebaseConfig);
  }
  
  Firebase.analytics()
  Vue.prototype.$firebase = Firebase
}
