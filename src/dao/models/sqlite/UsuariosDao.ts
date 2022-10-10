import { IUsuarios } from "../entities/Usuarios";

import { AbstractDao } from "./AbstractDao";

import sqlite from 'sqlite';

export class UsuariosDao extends AbstractDao <IUsuarios> 
{
    public constructor(db:sqlite.Database){
    super('USUARIOS', db as sqlite.Database);

    super.exec('CREATE TABLE IF NOT EXISTS USUARIOS ('
    + ' _id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'
    + ' username TEXT,'
    + ' name TEXT,'
    + ' email TEXT,'
    + ' password TEXT);').then().catch(e=>console.error(e));
} 
 public async getUsuarios(){
    return super.findAll();
 }

 public async getUsuarioById(identifier : Partial<IUsuarios>){
    try {
        
        const result = await super.findByID(identifier);
        return result;

    } catch (ex: unknown) {
        console.log("UsuariosDao sqlite: ", (ex as Error).message);
        throw ex;
    }
}

public async insertUsuario(newUsuario : IUsuarios){
    try {
    
        const result = await super.createOne(newUsuario);
        return result;

    } catch (ex: unknown) {
        console.log("UsuariosDao sqlite: ", (ex as Error).message);
        throw ex;
    }
}

public async updateUsuario(updateData : IUsuarios){
    try {
        const {_id, ...updateObject} = updateData;

        return await super.update({_id}, updateObject);   

    } catch (ex: unknown) {
        console.log("UsuariosDao sqlite: ", (ex as Error).message);
        throw ex;
    }
}

public async deleteUsuario(deleteUsuario: Partial<IUsuarios>){
    try {
      const {_id } = deleteUsuario;
      const result = await super.delete({_id});
      return result;
    } catch( ex: unknown) {
      console.log("UsuariosDao sqlite:", (ex as Error).message);
      throw ex;
    }
  }

}
