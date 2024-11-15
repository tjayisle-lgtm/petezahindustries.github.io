document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');

    function moveToTop(event) {
        const clickedImage = event.currentTarget.querySelector('.image-item');
        const label = clickedImage.dataset.label;

        let recentClicks = JSON.parse(localStorage.getItem('recentClicks')) || [];
        recentClicks = recentClicks.filter(item => item !== label);
        recentClicks.unshift(label);
        if (recentClicks.length > 10) recentClicks.pop();

        localStorage.setItem('recentClicks', JSON.stringify(recentClicks));
    }

    function loadOrder() {
        const recentClicks = JSON.parse(localStorage.getItem('recentClicks')) || [];
        recentClicks.forEach(label => {
            const item = document.querySelector(`.image-item[data-label="${label}"]`)?.parentNode;
            if (item) container.prepend(item);
        });
    }

    document.querySelectorAll('.image-item').forEach(item => {
        item.parentNode.addEventListener('click', moveToTop);
    });

    loadOrder();
});

