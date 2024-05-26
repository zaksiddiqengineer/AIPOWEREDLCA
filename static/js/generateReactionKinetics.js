// generateReactionKinetics.js

document.addEventListener("DOMContentLoaded", function() {
    const reactionKineticsAnalysisButton = document.getElementById("reactionKineticsAnalysisButton");
    const reactionKineticsContainer = document.getElementById("reactionKineticsContainer");

    reactionKineticsAnalysisButton.addEventListener("click", function() {
        const options = `
            <h3>Reaction Kinetics Options</h3>
            <div class="kinetics-options-container">
                <button class="kinetics-option-btn">Gas Phase Reactions using NIST</button>
                <button class="kinetics-option-btn">Liquid Phase Reactions</button>
                <button class="kinetics-option-btn">Solution Phase Reactions</button>
                <button class="kinetics-option-btn">Heterogeneous Phase</button>
                <button class="kinetics-option-btn">Gas-Solid Reactions</button>
                <button class="kinetics-option-btn">Gas-Liquid Reactions</button>
                <button class="kinetics-option-btn">Liquid-Liquid Reactions</button>
                <button class="kinetics-option-btn">Multiphase Systems</button>
                <button class="kinetics-option-btn">Gas-Liquid-Solid Reactions</button>
            </div>
        `;

        reactionKineticsContainer.innerHTML = options;
    });
});


