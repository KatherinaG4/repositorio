const ctrlHome = {};
const { findById, findByIdAndUpdate, findByIdAndDelete } = require('../models/User');
const User = require('../models/User');

// Devuelve todos los usuarios de la colección
ctrlHome.rutaGet = async (req, res) => {
    const users = await User.find({ activo: true }) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(users);
}

// Controlador que almacena un nuevo usuario
ctrlHome.rutaPost = async (req, res) => {
    const { username, password } = req.body;
    const user = new User({username, password});
    await user.save() 

    res.json({msg: 'Usuario creado correctamente'});
}

// Controlador que actualiza información de los usuarios
ctrlHome.rutaPut = async (req, res) => {
    const { username, password, id } = req.body

    const user = await User.findByIdAndUpdate(id, {username, password}, { new: true })

    res.json({
        msg: 'Usuario actualizado correctamente',
        user
    })
}
// Controlador para eliminar un usuario de la BD físicamente
ctrlHome.rutaDelete = async (req, res) => {
    const { id } = req.body;
    
    try {
        // Ejecución normal del programa
        await User.findByIdAndDelete(id)

        res.json({
            msg: 'Usuario eliminado correctamente'
        })
    } catch (error) {
        // Si ocurre un error 
        console.log('Error al eliminar usuario: ', error)
    }
};

// Cambiar el estado activo de un usuario (Eliminación lógica)
ctrlHome.deleteUser = async (req, res) => {
    const { id }  = req.body
    const user = await User.findByIdAndUpdate(id, { activo: false }, { new: true });

    // Respuesta del servidor
    res.json({
        msg: 'Usuario eliminado correctamente',
        user
    });
}




module.exports = ctrlHome;