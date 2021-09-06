const router = require('express').Router();

const { 
    rutaGet, rutaPost, rutaPut, rutaDelete, deleteUser
 } = require('../controllers/user.controllers');

//  Ruta que devuelve todos los usuarios
router.get('/', rutaGet)

router.post('/', rutaPost)

// Actualizar usuarios
router.put('/', rutaPut)

router.put('/deleteuser', deleteUser)

router.delete('/', rutaDelete)

module.exports = router;
