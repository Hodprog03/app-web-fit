// Base de datos de ejercicios para cada objetivo
const exercisesDatabase = {
    loseWeight: {
        name: "Cardio y Quema de Calorías",
        exercises: [
            { name: "Saltos de tijera (Jumping Jacks)", duration: "3 series de 45 segundos", tips: "Mantén el ritmo constante y respira profundo", type: "Cardio" },
            { name: "Burpees", duration: "4 series de 12 repeticiones", tips: "Explosivo al subir, controlado al bajar", type: "HIIT" },
            { name: "Correr en el lugar", duration: "5 minutos continuos", tips: "Eleva las rodillas al frente", type: "Cardio" },
            { name: "Mountain Climbers", duration: "3 series de 30 segundos", tips: "Mantén el core activado", type: "Cardio" },
            { name: "Cuerda invisible (Saltos)", duration: "4 series de 50 saltos", tips: "Usa puntas de pies", type: "Cardio" },
            { name: "Sentadillas con salto", duration: "3 series de 15 repeticiones", tips: "Aterriza suavemente", type: "Pliometría" },
            { name: "High Knees (Rodillas arriba)", duration: "4 series de 40 segundos", tips: "Lleva rodillas a la altura de cadera", type: "Cardio" },
            { name: "Step ups en silla", duration: "3 series de 20 por pierna", tips: "Usa una silla estable", type: "Cardio" },
            { name: "Boxing shadow (Sombra)", duration: "3 rounds de 2 minutos", tips: "Mantén guardia arriba", type: "Cardio" },
            { name: "Escaladores laterales", duration: "3 series de 12 por lado", tips: "Mantén espalda recta", type: "Cardio" },
            { name: "Trotar con skipping", duration: "4 minutos", tips: "Talones hacia glúteos", type: "Cardio" },
            { name: "Zancadas alternas", duration: "4 series de 20 pasos", tips: "Rodilla trasera casi al suelo", type: "Fuerza/Cardio" }
        ]
    },
    gainMuscle: {
        name: "Hipertrofia y Fuerza",
        exercises: [
            { name: "Flexiones de pecho", duration: "4 series de 12 repeticiones", tips: "Mantén el cuerpo recto como tabla", type: "Fuerza" },
            { name: "Sentadillas con peso", duration: "4 series de 10 repeticiones", tips: "Pecho arriba, espalda recta", type: "Fuerza" },
            { name: "Dominadas (o australianas)", duration: "3 series al fallo", tips: "Activa escápulas primero", type: "Fuerza" },
            { name: "Fondos en silla (Tríceps)", duration: "3 series de 15 repeticiones", tips: "Codos hacia atrás, no abiertos", type: "Fuerza" },
            { name: "Plancha con elevación", duration: "3 series de 10 por lado", tips: "Core firme, no arquear cadera", type: "Core" },
            { name: "Peso muerto (con botellas)", duration: "4 series de 12 repeticiones", tips: "Espalda neutra, empuja caderas", type: "Fuerza" },
            { name: "Press de hombros con mancuernas", duration: "3 series de 12 repeticiones", tips: "No bloquear codos arriba", type: "Fuerza" },
            { name: "Curl de bíceps", duration: "3 series de 15 repeticiones", tips: "Controla el movimiento excéntrico", type: "Fuerza" },
            { name: "Zancadas búlgaras", duration: "3 series de 10 por pierna", tips: "Pie trasero en silla", type: "Fuerza" },
            { name: "Remo inclinado", duration: "4 series de 12 repeticiones", tips: "Jala hacia el ombligo", type: "Fuerza" },
            { name: "Elevaciones de gemelos", duration: "4 series de 20 repeticiones", tips: "Sube lento, baja controlado", type: "Fuerza" },
            { name: "Russian twists con peso", duration: "3 series de 20 repeticiones", tips: "Gira el torso, no solo brazos", type: "Core" }
        ]
    }
};

// Estado de la aplicación
let currentGoal = null; // 'loseWeight' o 'gainMuscle'
let currentExercise = null;
let favorites = JSON.parse(localStorage.getItem('exerciseFavorites')) || [];

// Elementos del DOM
const loseWeightBtn = document.getElementById('loseWeightBtn');
const gainMuscleBtn = document.getElementById('gainMuscleBtn');
const generateBtn = document.getElementById('generateBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const clearFavoritesBtn = document.getElementById('clearFavoritesBtn');
const goalBadge = document.getElementById('goalBadge');
const exerciseType = document.getElementById('exerciseType');
const exerciseName = document.getElementById('exerciseName');
const exerciseDetails = document.getElementById('exerciseDetails');
const exerciseTips = document.getElementById('exerciseTips');
const favoritesSection = document.getElementById('favoritesSection');
const favoritesList = document.getElementById('favoritesList');

// Función para obtener ejercicio aleatorio según objetivo
function getRandomExercise(goal) {
    if (!goal) return null;
    
    const exercises = exercisesDatabase[goal].exercises;
    const randomIndex = Math.floor(Math.random() * exercises.length);
    return { ...exercises[randomIndex] };
}

// Función para actualizar la UI con el ejercicio actual
function updateExerciseUI(exercise, goal) {
    if (!exercise || !goal) return;
    
    const goalName = goal === 'loseWeight' ? '🎯 Bajar de Peso' : '🎯 Ganar Músculo';
    goalBadge.textContent = goalName;
    exerciseType.textContent = exercise.type;
    exerciseName.textContent = exercise.name;
    exerciseDetails.textContent = `Duración/Series: ${exercise.duration}`;
    exerciseTips.innerHTML = `💡 Tip: ${exercise.tips}`;
    
    // Animación suave
    const exerciseCard = document.querySelector('.exercise-card');
    exerciseCard.style.animation = 'none';
    setTimeout(() => {
        exerciseCard.style.animation = 'fadeIn 0.4s ease';
    }, 10);
}

// Función para generar un nuevo ejercicio
function generateExercise() {
    if (!currentGoal) {
        alert('⚠️ Por favor, selecciona primero un objetivo (Bajar de peso o Ganar músculo)');
        return;
    }
    
    const newExercise = getRandomExercise(currentGoal);
    currentExercise = newExercise;
    updateExerciseUI(currentExercise, currentGoal);
}

// Función para guardar ejercicio favorito
function saveFavorite() {
    if (!currentExercise || !currentGoal) {
        alert('⚠️ Genera un ejercicio primero antes de guardarlo como favorito');
        return;
    }
    
    const favorite = {
        id: Date.now(),
        goal: currentGoal,
        goalName: currentGoal === 'loseWeight' ? 'Bajar de Peso' : 'Ganar Músculo',
        exercise: { ...currentExercise }
    };
    
    // Verificar si ya existe (por nombre y tipo)
    const exists = favorites.some(fav => 
        fav.exercise.name === currentExercise.name && 
        fav.goal === currentGoal
    );
    
    if (exists) {
        alert('⚠️ Este ejercicio ya está en tus favoritos');
        return;
    }
    
    favorites.push(favorite);
    localStorage.setItem('exerciseFavorites', JSON.stringify(favorites));
    updateFavoritesUI();
    showNotification('✅ Ejercicio guardado en favoritos', 'success');
}

// Función para eliminar favorito
function removeFavorite(id) {
    favorites = favorites.filter(fav => fav.id !== id);
    localStorage.setItem('exerciseFavorites', JSON.stringify(favorites));
    updateFavoritesUI();
    showNotification('🗑️ Ejercicio eliminado de favoritos', 'info');
}

// Función para limpiar todos los favoritos
function clearAllFavorites() {
    if (favorites.length === 0) return;
    
    if (confirm('¿Estás seguro de que quieres eliminar TODOS tus ejercicios favoritos?')) {
        favorites = [];
        localStorage.setItem('exerciseFavorites', JSON.stringify(favorites));
        updateFavoritesUI();
        showNotification('🧹 Todos los favoritos han sido eliminados', 'info');
    }
}

// Función para actualizar la lista de favoritos en UI
function updateFavoritesUI() {
    if (favorites.length === 0) {
        favoritesSection.style.display = 'none';
        return;
    }
    
    favoritesSection.style.display = 'block';
    favoritesList.innerHTML = '';
    
    favorites.forEach(fav => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        favoriteItem.innerHTML = `
            <div class="favorite-info">
                <div class="favorite-name">${fav.exercise.name}</div>
                <div class="favorite-details">
                    🏷️ ${fav.goalName} | ${fav.exercise.type} | ${fav.exercise.duration}
                </div>
            </div>
            <button class="remove-favorite" data-id="${fav.id}">❌ Eliminar</button>
        `;
        
        const removeBtn = favoriteItem.querySelector('.remove-favorite');
        removeBtn.addEventListener('click', () => removeFavorite(fav.id));
        
        favoritesList.appendChild(favoriteItem);
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Función para cambiar objetivo
function setGoal(goal) {
    currentGoal = goal;
    
    // Actualizar UI de botones
    if (goal === 'loseWeight') {
        loseWeightBtn.classList.add('active');
        gainMuscleBtn.classList.remove('active');
    } else {
        gainMuscleBtn.classList.add('active');
        loseWeightBtn.classList.remove('active');
    }
    
    // Generar primer ejercicio automáticamente
    const firstExercise = getRandomExercise(goal);
    currentExercise = firstExercise;
    updateExerciseUI(currentExercise, goal);
    showNotification(`🎯 Objetivo seleccionado: ${goal === 'loseWeight' ? 'Bajar de Peso' : 'Ganar Músculo'}`, 'info');
}

// Event Listeners
loseWeightBtn.addEventListener('click', () => setGoal('loseWeight'));
gainMuscleBtn.addEventListener('click', () => setGoal('gainMuscle'));
generateBtn.addEventListener('click', generateExercise);
favoriteBtn.addEventListener('click', saveFavorite);
clearFavoritesBtn.addEventListener('click', clearAllFavorites);

// Inicializar la aplicación
function init() {
    updateFavoritesUI();
    
    // Animación de entrada para CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    document.head.appendChild(style);
}

init();

// Tecla de atajo: Enter genera nuevo ejercicio
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && document.activeElement !== generateBtn) {
        generateExercise();
    }
});