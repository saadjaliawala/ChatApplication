import auth from '@react-native-firebase/auth';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
} from 'react-native-fbsdk';

export const Abcd = (abcd) => {
    // alert(JSON.stringify(abcd));
    const cd = abcd;
    // console.log(cd);
   return dispatch=>{
        dispatch({
            type: 'Abcd_Changed',
            payload: abcd
        }) 
    }
}


const _firebaseFbLogin = async accessToken => {
   
    const fbCredential = auth.FacebookAuthProvider.credential(accessToken);
    // console.log(fbCredential);
    return await auth().signInWithCredential(fbCredential);
  };
  
 export const FbLogin = props => {
    return dispatch => {
      try {
          LoginManager.setLoginBehavior("web_only");
        LoginManager.logInWithPermissions(['public_profile', 'email']).then(
          async result => {
            if (result.isCancelled) {
            } else {
              const {accessToken} = await AccessToken.getCurrentAccessToken();
              // console.log(accessToken);
  
              const responseInfoCallback = async (error, user) => {
                if (error) {
                    console.log("errir saad");
                } else {
                    console.log(user,"okay saad");
                  const firebaseFacebookLogin = await _firebaseFbLogin(
                    accessToken,
                  );
                }
              };
  
              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken,
                  parameters: {
                    fields: {
                      string: 'id,email,name,picture.width(240).height(240)',
                    },
                  },
                  version: 'v6.0',
                },
                responseInfoCallback,
              );
  
              new GraphRequestManager().addRequest(infoRequest).start();
            }
          },
          function(error) {
            console.log('Login fail with error: ' + error);
          },
        );
      } catch (error) {
        // console.log(error);
      }
    };
  };
  



 