import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

      async login(email:string, password:string){
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

      return {
        // log:dataCookie,
        data:{user:email}
      }


    } catch (error) {
      throw new Error()
    }


  }

}