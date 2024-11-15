document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');

    function filterItems() {
        const searchInput = document.getElementById('search').value.toLowerCase();
        document.querySelectorAll('.image-item').forEach(item => {
            const label = item.dataset.label.toLowerCase();
            item.style.display = label.includes(searchInput) ? '' : 'none';
        });
    }

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

    window.scrollTo(0, 0);

    document.getElementById('search').addEventListener('input', filterItems);

    document.querySelectorAll('.image-item').forEach(item => {
        item.parentNode.addEventListener('click', moveToTop);
    });

    loadOrder();
});
