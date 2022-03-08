# login_backend
Backend en typescript usando passport

Vamos a crear un backend el cual tendrá tres rutas, signup: esta ruta nos servirá para registrarnos, signin: para loguearnos y autorizado, esta última solo podremos entrar si estamos logueados y poseemos un token.
Utilizaremos jwt para crear el token, bcript para encriptarlo y Passport para manejar el token como contraseña.
rutas:
POST api/signin para loguearnos
POST api/signup para registrarnos
GET api/autorizado entramos en la pagina logueado perfectamente

documentacion 
https://es.scribd.com/document/563328232/Login-Con-Passport
