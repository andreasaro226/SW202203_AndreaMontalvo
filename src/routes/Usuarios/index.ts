import { Router } from "express";

import { Usuarios } from "@libs/Usuario";

import { IUsuarios } from "@dao/models/entities/Usuarios";

const router = Router();
const usuariosInstance = new Usuarios();

router.get('/',async (_req, res) => {
    try {
        res.json(await usuariosInstance.getAllUsuarios());
    } catch (ex) {
        console.error(ex);
        res.status(503).json({error:ex});
    }
});

router.get('/byindex/:index', async (req, res) => {
  try {
    const { index } = req.params;
    res.json(await usuariosInstance.getUsuarioById(+index));
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({'msg': 'Error al obtener Registro'});
  }
});

router.post('/new',async (req, res) => {
    try {
        const newUsuario = req.body as unknown as IUsuarios;
          const newUsuarioIndex = await usuariosInstance.addUsuario(newUsuario);
          res.status(200).json({newUsuarioIndex});
  
  
    } catch (error) {
        res.status(500).json({error: (error as Error).message});
    }
  });
  
  router.put('/update/:id', async (req, res)=>{
    try {
      const { id } = req.params;
      const usuarioFromForm = req.body as IUsuarios;
    
        if (await usuariosInstance.updateUsuario({...{_id:id},...usuarioFromForm})){
          res.status(200).json({"msg":"Usuario Actualizado"});
        } else {
          res.status(404).json({"msg":"Update not posible"});
        }

    } catch(error) {
      res.status(500).json({error: (error as Error).message});
    }
  });

  router.delete('/delete/:index', (req, res)=>{
    try {
      const { index } = req.params;
      if (usuariosInstance.deleteUsuario(+index)) {
        res.status(200).json({"msg": "Registro Eliminado"});
      } else {
        res.status(500).json({'msg': 'Error al eliminar Registro'});
      }
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({'msg': 'Error al eliminar Registro'});
    }
  });


export default router;