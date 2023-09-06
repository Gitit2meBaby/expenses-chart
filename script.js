document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
            updateGraph(data);
            addTooltipEventListeners(data);
        })
        .catch((error) => {
            console.error("Error fetching JSON data:", error);
        });
});

function updateGraph(data) {
    data.forEach((item) => {
        const day = item.day;
        const amount = item.amount;
        const dayBar = document.querySelector(`[data-day="${day}"]`);

        // Set the height of the bar based on the amount
        dayBar.style.height = `${amount * 2}px`;
    });
}

function addTooltipEventListeners(data) {
    const dayBars = document.querySelectorAll(".day-bar");

    dayBars.forEach(dayBar => {
        // Add a mouseover event listener
        dayBar.addEventListener('mouseover', event => {
            const day = event.target.getAttribute('data-day');
            const amountData = data.find(item => item.day === day);

            if (amountData) {
                const amount = amountData.amount;
                const tooltip = document.createElement('div');
                tooltip.classList.add('hover-div');
                tooltip.textContent = `$${amount.toFixed(2)}`;
                document.body.appendChild(tooltip);

                // Position the tooltip
                const rect = event.target.getBoundingClientRect();
                tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
                tooltip.style.left = rect.left + (rect.width - tooltip.offsetWidth) / 2 + 'px';
            }
        });

        // Add a mouseout event listener to remove the tooltip
        dayBar.addEventListener('mouseout', () => {
            const tooltip = document.querySelector('.hover-div');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

const currentDate = new Date();
const currentDay = currentDate.toLocaleDateString("en-US", { weekday: "short" }).toLowerCase();

const currentDayBar = document.querySelector(`[data-day="${currentDay}"]`);
currentDayBar.classList.add("current-day");
