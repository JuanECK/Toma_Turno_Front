import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { PuenteDataService } from "./puente-data.service";
import { environment } from "../../../environments/environments.prod";


interface perfilCajero {
  nombreCajero: string,
  email: string,
  password: string,
  idCajero: number,
  perfil: number,
  caja:number,
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private puenteData: PuenteDataService,
    private router: Router
  ) {

  }

   private _http: string = `${environment.apiUrl}`;

  // perfil:1 = Administrador
  // perfil:2 = Cajero
  // perfil:3 = Pantalla
  // perfil:4 = Ticketero

  perfiles: perfilCajero[] = [
    { nombreCajero: 'Juan Soto', email: 'juan@tornillo', password: '123', idCajero: 1, perfil: 1, caja:0 },
    { nombreCajero: 'Jorge Alvarez', email: 'jorge@tornillo', password: '123', idCajero: 2, perfil: 2, caja:1 },
    { nombreCajero: 'Pedro Paramo', email: 'pedro@tornillo', password: '123', idCajero: 3, perfil: 2, caja:2 },
    { nombreCajero: 'pantalla', email: 'pantalla@tornillo', password: '123', idCajero: 4, perfil: 3, caja:0 },
    { nombreCajero: 'turnero', email: 'turnero@tornillo', password: '123', idCajero: 5, perfil: 4, caja:0 },
  ]


  async login(email: string, password: string) {
    try {


        let dataCookie:boolean = true
        const response = await  fetch(this._http +"auth/login", {
          method: 'POST',
          // mode:"cors",
          credentials:"include",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              usuario: email,
              Contrasenia: password,
          })
        })
        const data = await response.json();
        // console.log(data);

        // if(response.status === 200){
        //   dataCookie = true
        // }else{
        //   dataCookie = false
        // }

        // return {
        //   log:dataCookie,
        //   data:data
        // }



      // const perfil = this.perfiles.filter(perfil => perfil.email == email)
      // if (perfil.length < 1) return { log: false, data: { user: '' } }

      // if (email == perfil[0].email && password == perfil[0].password) {
      //   return {
      //     log: true,
      //     data: { user: email, perfil: perfil[0].perfil, nombre: perfil[0].nombreCajero, caja: perfil[0].caja }
      //   }

      // }


      return {
        log: false,
        data: { user: '' }
      }


    } catch (error) {
      throw new Error()
    }


  }

  setDataLogin(data:any) {
    this.puenteData.disparadorData.emit({ perfil: data[0].perfil, nombre: data[0].nombreCajero })
    // this.formulario().patchValue({INE:'prueba 11111'}) ;
  }

  async isAuthenticado( roles: any ) {
    // let dataCookie: boolean = false
     let dataCookie: any

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

    let arr = [{id:1,r:'admin'},{id:2,r:'desk/:id'},{id:3,r:'public'},{id:4,r:'tickets'}]

    const sesion = localStorage.getItem('sesion');
    if (sesion !== null) {
      let Data = JSON.parse(sesion)
      // console.log(arr)
      let oldLink = arr.filter(old => Data.perfil == old.id)

      if(Data.perfil == roles[0]){
        // console.log( Data.perfil, '-', oldLink[0].r)
        dataCookie = { dataCookie: true, sesion: oldLink[0].r }
      }else{
        dataCookie = { dataCookie: false, sesion: oldLink[0].r }
      }
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
      // console.log('deslogueado')
      dataCookie = { dataCookie: false, sesion: sesion }
    } else {
      // console.log('logueado')
      dataCookie = { dataCookie: true, sesion: sesion }
    }
    // return dataCookie





    //    const sesion = localStorage.getItem('sesion');
    // if (sesion !== null) {
    //   // console.log('1')
    //   let Data = JSON.parse(sesion)
    //     switch (Data.perfil) {
    //         case 1:
    //           // this.router.navigateByUrl('desk/:id');
    //           dataCookie = { dataCookie: true, sesion: Data }
    //           console.log('acceso admin')
    //           break
    //           case 3:
    //           console.log('acceso pantalla')
    //           dataCookie = { dataCookie: true, sesion: Data }
              
    //           break
    //           case 4:
    //           console.log('acceso tiket')
    //           dataCookie = { dataCookie: true, sesion: Data }
              
    //           break
              
    //           default:
    //           console.log('acceso desk')
    //            dataCookie = { dataCookie: false, sesion: Data }
    //         break
    //     }
    //     // dataCookie = { dataCookie: false, sesion: sesion }
    //   }else {
    //   // console.log('2')
    //   dataCookie = { dataCookie: false, sesion: sesion }
    // }

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
              // console.log('acceso admin')
              break
              case 3:
              // console.log('acceso pantalla')
              respuestaModulo = true
              
              break
              case 4:
              // console.log('acceso tiket')
              respuestaModulo = true
              
              break
              
              default:
              // console.log('acceso fuera')
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