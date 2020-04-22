#Angular-Cli

1.Angular-cli updated to 4.0.2,
2. All Angular library has been changed to 4.0.2.
3. AngularFire has been changed to 4.0.0-rc0.

#AngularFire 

1.AngularFire has been updated to 4.0.0-rc0 from AngularFire2.
2.AngularFire has been some frequent change in 4.0.0-rc0.
3.The AngularFire service has now been removed and the library broken up into smaller @NgModules:

AngularFireModule
AngularFireDatabaseModule
AngularFireAuthModule

4.AngularFire2 exposes the raw Firebase Auth object via AngularFireAuth.auth. For actions like login, logout, user creation, etc. you should use the methods available to firebase.auth.Auth.

