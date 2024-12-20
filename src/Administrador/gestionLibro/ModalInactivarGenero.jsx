import {useState} from 'react';

function ModalInactivarGenero({ isOpen, onClose, generoId, obtenerGenerosLiterarios }) {

  const [loading, setLoading] = useState(false); // Estado para mostrar el loading
  const [error, setError] = useState(null); // Estado para manejar errores

    if (!isOpen) return null;

    const handleInactivate = async () => {
      setLoading(true);
      setError(null); // Limpiar errores previos

      try {
        const response = await fetch(`/api/geneLiter/generos/desactivar/${generoId}`, {
          method: 'PUT', // Cambia el método según sea necesario (PUT/POST)
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer token`, // Si es necesario agregar un token de autorización
          }
        });

        if (!response.ok) {
          throw new Error('Error al inactivar el genero literario');
        }

        // Si la inactivación es exitosa, actualiza la lista de usuarios
        await obtenerGenerosLiterarios();
        onClose(); // Cerrar el modal después de la actualización

      } catch (error) {
        setError('Hubo un problema al inactivar el genero literario.');
        console.error('Error al inactivar el genero literario:', error);
      } finally {
        setLoading(false); // Deja de mostrar loading
      }
    }
  
    return (
      <div  
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50" 
        onClick={onClose}
      >
        <div 
          className="bg-white p-5 rounded-lg max-w-md w-full shadow-lg relative z-50 text-center" 
          onClick={(e) => e.stopPropagation()}
        >
          
          <h2 className="mb-4 text-2xl text-gray-800">Inactivar Genero</h2>
          <p className="mb-5 text-gray-600 text-base">¿Estás seguro de que deseas inactivar este genero?</p>

          {error && <p className="text-red-500">{error}</p>} {/* Mostrar error si existe */}
          
          <div className="flex justify-end gap-4 mt-4">

          <button className="px-4 py-2 border rounded bg-primary text-white hover:bg-blue-950"
            onClick={handleInactivate}
            disabled={loading}
            >
            {loading ? 'Inactivando...' : 'Inactivar'}
            </button>
            
            <button 
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md  hover:bg-gray-400"
              onClick={onClose}
            >
              Cancelar
            </button>
            
          </div>
        </div>
      </div>
    );
  }
  
  export default ModalInactivarGenero;
  