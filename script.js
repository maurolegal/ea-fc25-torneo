document.addEventListener('DOMContentLoaded', function() {
    // Lista de equipos de la Champions League 2025
    const equiposChampions = [
        "Real Madrid", "Barcelona", "Atlético de Madrid", "Bayern Múnich", 
        "Borussia Dortmund", "RB Leipzig", "Manchester City", "Liverpool", 
        "Chelsea", "Manchester United", "Arsenal", "Paris Saint-Germain", 
        "Olympique de Marseille", "Inter de Milán", "AC Milan", "Juventus", 
        "Napoli", "Roma", "Benfica", "Porto", "Sporting de Lisboa", 
        "Ajax", "PSV Eindhoven", "Shakhtar Donetsk", "Dinamo Kiev", 
        "Celtic", "Rangers", "Red Bull Salzburg", "Galatasaray", 
        "Fenerbahçe", "Olympiakos", "Copenhague"
    ];

    // Objeto para llevar el conteo de selecciones por equipo
    let conteoEquipos = {};
    equiposChampions.forEach(equipo => {
        conteoEquipos[equipo] = 0;
    });

    // Cargar equipos en el select
    const selectEquipo = document.getElementById('equipo');
    equiposChampions.forEach(equipo => {
        const option = document.createElement('option');
        option.value = equipo;
        option.textContent = equipo;
        selectEquipo.appendChild(option);
    });

    // Contador de equipos disponibles
    const equipoCounter = document.getElementById('equipo-counter');
    
    // Mostrar información de pago según método seleccionado
    const metodoPagoSelect = document.getElementById('metodo-pago');
    const pagoInfo = document.getElementById('pago-info');
    const paymentMethods = document.querySelectorAll('.payment-method');

    metodoPagoSelect.addEventListener('change', function() {
        const metodoSeleccionado = this.value;
        
        if (metodoSeleccionado) {
            pagoInfo.style.display = 'block';
            
            // Ocultar todos los métodos primero
            paymentMethods.forEach(method => {
                method.style.display = 'none';
            });
            
            // Mostrar solo el método seleccionado
            document.querySelector(`.payment-method[data-method="${metodoSeleccionado}"]`).style.display = 'block';
        } else {
            pagoInfo.style.display = 'none';
        }
    });

    // Contador regresivo
    const countdownTimer = document.getElementById('countdown-timer');
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + 15); // 15 días desde hoy

    function actualizarCountdown() {
        const ahora = new Date();
        const diferencia = fechaLimite - ahora;
        
        if (diferencia <= 0) {
            countdownTimer.textContent = "¡Inscripciones cerradas!";
            return;
        }
        
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        
        countdownTimer.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    }
    
    setInterval(actualizarCountdown, 1000);
    actualizarCountdown();

    // Manejar el envío del formulario
    const registrationForm = document.getElementById('registration-form');
    const successModal = document.getElementById('success-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalButton = document.querySelector('.modal-button');

    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí normalmente enviarías los datos a un servidor
        // Para este ejemplo, solo mostramos el modal de éxito
        
        // Actualizar conteo de equipos seleccionados
        const equipoSeleccionado = selectEquipo.value;
        conteoEquipos[equipoSeleccionado]++;
        
        // Verificar si el equipo ha sido seleccionado 5 veces
        if (conteoEquipos[equipoSeleccionado] >= 5) {
            // Eliminar el equipo de la lista
            const options = selectEquipo.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === equipoSeleccionado) {
                    selectEquipo.remove(i);
                    break;
                }
            }
            
            // Actualizar contador
            equipoCounter.textContent = `Equipos disponibles: ${selectEquipo.options.length - 1}`;
        }
        
        // Mostrar modal de éxito
        successModal.style.display = 'flex';
        
        // Resetear formulario
        this.reset();
        pagoInfo.style.display = 'none';
    });

    // Cerrar modal
    closeModal.addEventListener('click', function() {
        successModal.style.display = 'none';
    });
    
    modalButton.addEventListener('click', function() {
        successModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
});
