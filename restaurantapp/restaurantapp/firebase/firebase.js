import app from'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from './config';


class Firebase{
    constructor(){
        if(!app.apps.length){
            app.initializeApp(firebaseConfig);
            app.firestore({merge:true}).settings({ experimentalForceLongPolling: true });
        }
        this.db=app.firestore()
    }
}

const firebase=new Firebase();
//firebase.firestore().settings({ experimentalForceLongPolling: true });
export default firebase;