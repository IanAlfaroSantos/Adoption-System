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