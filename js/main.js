// --- Fix: Enhanced Reveal Function ---
function revealPhoto(wrapper) {
    const img = wrapper.querySelector('img');
    const hint = wrapper.querySelector('.tap-hint');
    
    if (img && hint) {
        img.classList.remove('hickey-blur'); // Removes the blur
        img.style.filter = "blur(0)"; // Forced clarity
        hint.style.opacity = "0"; // Hides "Tap to Reveal" text
        
        // Dramatic effect on reveal
        wrapper.style.boxShadow = "0 0 40px rgba(255, 175, 189, 0.8)";
    }
    
    // Slight phone vibration for premium feel (Android only)
    if (navigator.vibrate) navigator.vibrate(80);
}

// --- Fix: Ensure typewriter styles are updated for S6 ---
// (The previous typewriter logic stays same, just ensuring S6 centering via CSS)
