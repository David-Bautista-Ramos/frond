import { useState } from "react";

function ModalEliminarDenuncia({ isOpen, onClose, denunciasId, obtenerDenuncias }) {
  const [loading, setLoading] = useState(false);

    if (!isOpen) return null;
  
    const handleDelete = async () => {
      setLoading(true);
    try {
      const response = await fetch(`/api/denuncias/denuncia/${denunciasId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Error al Eliminar la denuncia");
      }

      const data = await response.json();
      console.log(data.message); // Mensaje de éxito o error
      obtenerDenuncias(); // Vuelve a obtener los usuarios actualizados
      onClose(); // Cierra el modal después de la activación
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }

    };


    return (
      <div 
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50" 
        onClick={onClose}
      >
        <div 
          className="bg-white p-5 rounded-lg max-w-md w-full shadow-lg relative z-50 text-center" 
          onClick={(e) => e.stopPropagation()}
        >
          
          <h2 className="mb-4 text-2xl text-gray-800">Eliminar Denuncia</h2>
          <p className="mb-5 text-gray-600 text-base">¿Estás seguro de que deseas eliminar esta Denuncia?</p>
          <div className="flex justify-end gap-4 mt-4">
          <button
            className={`px-4 py-2 border rounded bg-primary text-white hover:bg-blue-950 ${loading ? 'opacity-50' : ''}`}
            onClick={handleDelete}
            disabled={loading}
            >
              {loading ? "Eliminando..." : "Eliminar"}
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
  
  export default ModalEliminarDenuncia;
