export default function EventoAlerta({ mensaje, onConfirm, onClose}) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-80 p-6 text-center">
                <h2 className="text-xl font-semibold text-green-600 mb-4">¡Evento registrado!</h2>
                <p className="text-gray-700 mb-4">{mensaje}</p>

                <div className="mt-4">
                    <button
                        onClick={() => {
                            if (onConfirm) onConfirm();  // Llamar a onConfirm
                            if (onClose) onClose();      // Llamar a onClose
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    );
}
