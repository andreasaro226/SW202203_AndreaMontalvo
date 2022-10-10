import { getConnection } from "@models/sqlite/SqliteConn";

import { UsuariosDao } from "@models/sqlite/UsuariosDao";

import { IUsuarios } from "@models/entities/Usuarios";

export class Usuarios {
    private dao: UsuariosDao;
    public constructor(){
        getConnection().then(conn=>{
            this.dao = new UsuariosDao(conn);
        })
        .catch(ex => console.error(ex));
    }

public getAllUsuarios() {
    return this.dao.getUsuarios();
} 

public getUsuarioById(id : number) {
    return this.dao.getUsuarioById({_id:id});
}

public addUsuario(usuarioData: IUsuarios){
    return this.dao.insertUsuario(usuarioData);
}

public updateUsuario(usuarioDataUpd: IUsuarios){
    return this.dao.updateUsuario(usuarioDataUpd);
}

public deleteUsuario(index : number){
    return this.dao.deleteUsuario({_id:index});
}


}
