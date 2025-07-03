import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

interface perfilCajero {
  nombreCajero: string,
  email: string,
  password: string,
  idCajero: number,
  perfil: number,
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private router: Router
  ) {

  }

  // perfil:1 = Administrador
  // perfil:2 = Cajero
  // perfil:3 = Pantalla
  // perfil:4 = Ticketero

  perfiles: perfilCajero[] = [
    { nombreCajero: 'Juan Soto', email: 'juan@tornillo', password: '123', idCajero: 1, perfil: 1 },
    { nombreCajero: 'Jorge Alvarez', email: 'jorge@tornillo', password: '123', idCajero: 2, perfil: 2 },
    { nombreCajero: 'Pedro Paramo', email: 'pedro@tornillo', password: '123', idCajero: 3, perfil: 2 },
    { nombreCajero: 'pantalla', email: 'pantalla@tornillo', password: '123', idCajero: 4, perfil: 3 },
    { nombreCajero: 'ticketero', email: 'ticketero@tornillo', password: '123', idCajero: 5, perfil: 4 },
  ]


  async login(email: string, password: string) {
    try {


      //   let dataCookie:boolean = true
      //   const response = await  fetch(this._http +"auth/login", {
      //     method: 'POST',
      //     // mode:"cors",
      //     credentials:"include",
      //     headers: {
      //         'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //         Usuario: email,
      //         Contrasenia: password,
      //     })
      //   })
      //   const data = await response.json();
      //   // console.log(data);

      //   if(response.status === 200){
      //     dataCookie = true
      //   }else{
      //     dataCookie = false
      //   }

      //   return {
      //     log:dataCookie,
      //     data:data
      //   }



      // console.log({email:email, password:password})
      const perfil = this.perfiles.filter(perfil => perfil.email == email)
      if (perfil.length < 1) return { log: false, data: { user: '' } }

      // console.log(perfil)
      if (email == perfil[0].email && password == perfil[0].password) {
        // if(email == 'juan@prueba' && password == '123'){
        return {
          log: true,
          data: { user: email, perfil: perfil[0].perfil, nombre: perfil[0].nombreCajero }
        }
      }

      return {
        log: false,
        data: { user: '' }
      }


    } catch (error) {
      throw new Error()
    }


  }


  async isAuthenticado() {
    let dataCookie: boolean = true

    //     const response = await fetch(this._http + 'auth/cookie', {
    //   method: 'POST',
    //   // mode:"cors",
    //   credentials:"include",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   // body: JSON.stringify({
    //   //   // Usuario: coockie,
    //   //   Token: coockie[0][1],
    //   // })
    // })
    // const data = await response.json();
    // if(data.respuesta === true){
    //   dataCookie = true
    // }else{
    //   dataCookie = false
    //   this.logOut();
    // }
    const sesion = localStorage.getItem('sesion');
    console.log(sesion)
    if (sesion !== null) {
      console.log('1')
      dataCookie = false
    } else {
      console.log('2')
      dataCookie = true
    }
    return dataCookie
  }

  async isSesionActive() {
    let dataCookie: any
    // let dataCookie:boolean = true

    //   const response = await fetch(this._http + 'auth/cookie', {
    //   method: 'POST',
    //   // mode:"cors",
    //   credentials:"include",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   // body: JSON.stringify({
    //   //   // Usuario: coockie,
    //   //   Token: coockie[0][1],
    //   // })
    // })
    // const data = await response.json();
    // if(data.respuesta === true){
    //   dataCookie = true
    // }else{
    //   dataCookie = false
    //   this.logOut();
    // }
    const sesion = localStorage.getItem('sesion');
    // console.log(sesion)
    if (sesion == null) {
      console.log('1')
      dataCookie = { dataCookie: false, sesion: sesion }
    } else {
      console.log('2')
      dataCookie = { dataCookie: true, sesion: sesion }
    }
    return dataCookie
  }

  async logOut() {
    // let id = this.getID();

    //     const response = await fetch( this._http + 'auth/logOut',{
    //       method: 'POST',
    //       mode:"cors",
    //       credentials:'include',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         id_user:id
    //       })
    //     })

    //     const data= await response.json()
    //     // console.clear()
    //     // console.log(data)
    //     if(data.logOut){
    localStorage.removeItem('sesion');
    this.router.navigate(['/login']);
    //     }
    // }


  }

  async showModul(roles: any) {
    let respuestaModulo:boolean = false;
    //   const response = await fetch( this._http + "auth/modulo", {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //        'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //       id: id
    //   }) 
    // } )   
    // const data = await response.json()
    const sesion = localStorage.getItem('sesion');
    if (sesion !== null) {
      // console.log('1')
      let Data = JSON.parse(sesion)
        switch (Data.perfil) {
            case 1:
              // this.router.navigateByUrl('desk/:id');
              respuestaModulo = true
              console.log('acceso admin')
              break
              case 3:
              console.log('acceso pantalla')
              respuestaModulo = true
              
              break
              case 4:
              console.log('acceso tiket')
              respuestaModulo = true
              
              break
              
              default:
              console.log('acceso fuera')
              respuestaModulo = false
            break
        }
        return respuestaModulo
      // dataCookie = { dataCookie: false, sesion: sesion }
    }

    return true
  }

  getID() {
    const sesion = localStorage.getItem('sesion');
    const { Datos } = JSON.parse(sesion!)
    return Datos
  }

}