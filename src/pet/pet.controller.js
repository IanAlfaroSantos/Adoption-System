import User from '../users/user.model.js';
import Pet from './pet.model.js';

export const savePet = async (req, res) => {
    try {
        
        const data = req.body;
        const user = await User.findOne({ email: data.email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Propietario no encontrado'
            })
        }

        const pet = new Pet({
            ...data,
            keeper: user._id
        })

        await pet.save();

        res.status(200).json({
            success: true,
            message: 'Mascota guardada correctamente',
            pet
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al guardar mascota',
            error
        })
    }
}

export const getPets = async (req, res) => {

    const { limite = 10, desde = 0 } = req.query;
    const query = { status: true };

    try {
        const pets = await Pet.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

        const petsWithOwnerNames = await Promise.all(pets.map(async (pet) => {
            const owner = await User.findById(pet.keeper);
            return { 
                ...pet.toObject(),
                keeper: owner ? owner.nombre : "Propietario no encontrado"
            }
        }));

        const total = await Pet.countDocuments(query);
        
        res.status(200).json({
            success: true,
            total,
            pets: petsWithOwnerNames
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener mascotas',
            error
        })
    }
}

export const searchPet = async (req, res) => {
    
    const { id } = req.params;

    try {

        const pet = await Pet.findById(id);

        if (!pet) {
            return res.status(404).json({
                success: false,
                message: 'Mascota no encontrada'
            })
        }

        const owner = await User.findById(pet.keeper);

        res.status(200).json({
            success: true,
            pet: { 
               ...pet.toObject(),
                keeper: owner ? owner.nombre : "Propietario no encontrado"
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar mascota',
            error
        })
    }
}

export const updatePet = async (req, res = response) => {

    try {

        const { id } = req.params;
        const { _id, ...data } = req.body;

        const pet = await Pet.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Mascota Actualizada',
            pet
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar mascota',
            error
        })   
    }
}

export const deletePet = async (req, res) => {

    const { id } = req.params;

    try {
        
        await Pet.findByIdAndUpdate(id, { status: false }, { new: true });

        res.status(200).json({
            success: true,
            message: 'Mascota desactivada exitosamente',
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al desactivar mascota',
            error
        })
    }
}

export const truePet = async (req, res) => {

    const { id } = req.params;

    try {
        
        await Pet.findByIdAndUpdate(id, { status: true }, { new: true });

        res.status(200).json({
            success: true,
            message: 'Mascota activada exitosamente',
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al activar mascota',
            error
        })
    }
}